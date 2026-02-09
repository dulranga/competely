import "server-only";
import { count, desc, eq } from "drizzle-orm";
import db from "~/db/client";
import { formResponses } from "~/db/schema";

export async function getFormResponsesByFormId(formId: string, page = 1, limit = 20) {
    const offset = (page - 1) * limit;

    const [data, totalResult] = await Promise.all([
        db.query.formResponses.findMany({
            where: eq(formResponses.formId, formId),
            orderBy: [desc(formResponses.submittedAt)],
            limit,
            offset,
            with: {
                user: {
                    columns: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                answers: {
                    with: {
                        field: true,
                    },
                },
            },
        }),
        db.select({ count: count() }).from(formResponses).where(eq(formResponses.formId, formId)),
    ]);

    return {
        data,
        total: totalResult[0]?.count ?? 0,
    };
}

export async function getAllFormResponsesByFormId(formId: string) {
    const data = await db.query.formResponses.findMany({
        where: eq(formResponses.formId, formId),
        orderBy: [desc(formResponses.submittedAt)],
        with: {
            user: {
                columns: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            },
            answers: {
                with: {
                    field: true,
                },
            },
        },
    });

    return {
        data,
    };
}
