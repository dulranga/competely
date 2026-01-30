import "server-only";

import { eq, lt } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import db from "~/db/client";
import { rateLimits } from "~/db/schema";

interface RateLimitOptions {
    requests: number;
    perSeconds: number;
    keyPrefix?: string;
}

export async function checkRateLimit(key: string, limit: number, windowMs: number) {
    const now = new Date();

    return await db.transaction(async (tx) => {
        const [record] = await tx.select().from(rateLimits).where(eq(rateLimits.key, key)).limit(1);

        if (!record || record.expiresAt < now) {
            // New window or expired
            const expiresAt = new Date(now.getTime() + windowMs);
            await tx
                .insert(rateLimits)
                .values({
                    key,
                    count: 1,
                    expiresAt,
                })
                .onConflictDoUpdate({
                    target: rateLimits.key,
                    set: {
                        count: 1,
                        expiresAt,
                    },
                });
            return {
                success: true,
                count: 1,
                limit,
                remaining: limit - 1,
                reset: expiresAt,
            };
        }

        if (record.count >= limit) {
            return {
                success: false,
                count: record.count,
                limit,
                remaining: 0,
                reset: record.expiresAt,
            };
        }

        const newCount = record.count + 1;
        await tx.update(rateLimits).set({ count: newCount }).where(eq(rateLimits.key, key));

        return {
            success: true,
            count: newCount,
            limit,
            remaining: limit - newCount,
            reset: record.expiresAt,
        };
    });
}

/**
 * Lightweight rate limiter using PostgreSQL and Drizzle.
 * Based on IP address and User ID (if logged in).
 *
 * @param options Rate limit configuration
 * @returns Rate limit result
 */
export async function rateLimit(options: RateLimitOptions) {
    const { requests, perSeconds: seconds, keyPrefix = "rl" } = options;

    const windowMs = seconds * 1000;

    const headerList = await headers();

    // Get IP address
    const forwardedFor = headerList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1";

    // Get User ID if logged in
    const session = await auth.api.getSession({ headers: headerList });
    const userId = session?.user?.id;

    // Use user ID if logged in, otherwise use IP
    const identifier = userId ? `user:${userId}` : `ip:${ip}`;
    const key = `${keyPrefix}:${identifier}`;

    return await checkRateLimit(key, requests, windowMs);
}

/**
 * Higher order function to wrap server actions with rate limiting.
 *
 * @param action The server action to wrap
 * @param options Rate limit options
 * @returns Wrapped server action
 */
export function withRateLimit<T extends (...args: any[]) => Promise<any>>(action: T, options: RateLimitOptions) {
    return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
        const result = await rateLimit(options);

        if (!result.success) {
            return {
                success: false,
                message: "Too many requests. Please try again later.",
            } as any;
        }

        return action(...args);
    };
}

export async function cleanupRateLimits() {
    const now = new Date();
    await db.delete(rateLimits).where(lt(rateLimits.expiresAt, now));
}
