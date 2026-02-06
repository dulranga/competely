import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabaseClient: SupabaseClient | null = null;

function requireEnv(value: string | undefined, key: string) {
    if (!value) {
        throw new Error(`${key} is not configured`);
    }

    return value;
}

export function getSupabaseAdminClient(): SupabaseClient {
    if (supabaseClient) {
        return supabaseClient;
    }

    const supabaseUrl = requireEnv(process.env.SUPABASE_URL, "SUPABASE_URL");
    const serviceRoleKey = requireEnv(process.env.SUPABASE_SERVICE_ROLE_KEY, "SUPABASE_SERVICE_ROLE_KEY");

    supabaseClient = createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            persistSession: false,
        },
    });

    return supabaseClient;
}

export function getSupabaseBucketName() {
    return requireEnv(process.env.SUPABASE_STORAGE_BUCKET, "SUPABASE_STORAGE_BUCKET");
}
