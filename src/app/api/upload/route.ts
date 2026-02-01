// app/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { FileCategory } from "~/consts/files";
import { getUser, getUserSession } from "~/data-access/getCurrentUser";
import { withRateLimit } from "~/data-access/rate-limit";
import { hasPermissionServer } from "~/lib/access-control/permissions.server";
import { fileCategorySchema, getFile, storeFile } from "~/lib/storage";
import { toNodeFile } from "~/lib/toNodeFile";

const specialAccessCategories: {
    category: FileCategory;
    canAccess: (fileId: string, userId: string) => boolean | Promise<boolean>;
}[] = [{ category: "profile_pic", canAccess: () => true }];

export const POST = withRateLimit(
    async function (req: NextRequest) {
        await getUserSession();

        const formData = await req.formData();
        const file = formData.get("file") as File;

        const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

        if (file && file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: "File size exceeds 50MB limit" }, { status: 413 });
        }

        const rawType = req.nextUrl.searchParams.get("type");

        const type = fileCategorySchema.parse(rawType ?? "uploads");

        if (!file || !file.name) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }
        const canCreateFile = await hasPermissionServer("files:create");

        if (!canCreateFile) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const nodeFile = await toNodeFile(file, file.name);
        const id = await storeFile(nodeFile, type);

        return NextResponse.json({ success: true, id });
    },
    {
        perSeconds: 60,
        requests: 20,
        keyPrefix: "api-upload",
    },
);

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const fileId = searchParams.get("file_id");

        if (!fileId) {
            return NextResponse.json({ error: "File not found" }, { status: 400 });
        }

        const { file, authorId, category } = await getFile(fileId);

        const user = await getUser();

        const inSpecialAccess = specialAccessCategories.find((c) => c.category === category);

        if (inSpecialAccess) {
            const canAccess = await inSpecialAccess.canAccess(fileId, user.id);
            if (canAccess) {
                return new NextResponse(new Uint8Array(file));
            }
        }

        const [canReadAll, canReadOwn] = await Promise.all([
            hasPermissionServer("files:read_all"),
            hasPermissionServer("files:read_own"),
        ]);

        if (canReadOwn && authorId === user.id) {
            return new NextResponse(new Uint8Array(file));
        }

        if (canReadAll && authorId !== user.id) {
            // no one else can see files unless have permission
            return new NextResponse(new Uint8Array(file));
        }

        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } catch {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
}
