import "server-only";

// import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { mkdir, readFile, writeFile } from "fs/promises";
import { File } from "node:buffer";
import path from "path";
import z from "zod";
import { FILE_CATEGORY, FileCategory } from "~/consts/files";
import { getUser } from "~/data-access/getCurrentUser";
import db from "~/db/client";
import { files } from "~/db/schema";
import logger from "./logger";
import { isDev } from "./isDev";
import { getSupabaseAdminClient, getSupabaseBucketName } from "./supabase";

export const fileCategorySchema = z.enum(FILE_CATEGORY);

// const s3 = new S3Client({ region: process.env.AWS_REGION || "eu-north-1" });

// async function saveFileToS3(file: File, category: FileCategory = "uploads") {
//     const user = await getUser();

//     const fileId = randomUUID();
//     const ext = path.extname(file.name) || ""; // .pdf, .jpg etc
//     const sanitizedName = path.basename(file.name, ext).replace(/\s+/g, "_");
//     const fileKey = `users/${user.id}/${category}/${sanitizedName}-${fileId}${ext}`;

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const uploadParams = {
//         Bucket: process.env.S3_BUCKET_NAME!,
//         Key: fileKey,
//         Body: buffer,
//         ContentType: file.type,
//     };

//     logger.info(`📤 Uploading file to S3: ${fileKey}`);
//     await s3.send(new PutObjectCommand(uploadParams));

//     return fileKey;
// }
async function saveFileLocally(file: File, fileKey: string) {
    const buffer = await fileToBuffer(file);
    const uploadPath = path.join(process.cwd(), "user-uploads", fileKey);

    await mkdir(path.dirname(uploadPath), { recursive: true });
    await writeFile(uploadPath, buffer);
}

async function saveFileToSupabase(file: File, fileKey: string) {
    const supabase = getSupabaseAdminClient();
    const bucket = getSupabaseBucketName();
    const buffer = await fileToBuffer(file);

    logger.info(`Uploading file to Supabase bucket ${bucket}: ${fileKey}`);
    const { error } = await supabase.storage.from(bucket).upload(fileKey, buffer, {
        contentType: file.type,
        upsert: false,
    });

    if (error) {
        logger.error(`Failed to upload file to Supabase: ${error.message}`);
        throw new Error("Unable to upload file to storage");
    }
}

export async function storeFile(file: File, category: FileCategory = "uploads") {
    const user = await getUser();
    const fileKey = generateFileKey(user.id, file, category);

    // if (isDev()) {
    //     await saveFileLocally(file, fileKey);
    // } else {
    //     await saveFileToSupabase(file, fileKey);
    // }

    await saveFileToSupabase(file, fileKey);

    const [savedFile] = await db
        .insert(files)
        .values({
            user_id: user.id,
            fileKey,
            fileName: file.name,
            size: file.size,
            mimeType: file.type,
            fileCategory: category,
        })
        .returning({ id: files.id });

    return savedFile.id;
}

// async function getFileFromS3(fileKey: string) {
//     const getObjectParams = {
//         Bucket: process.env.S3_BUCKET_NAME!,
//         Key: fileKey,
//     };
//     logger.info(`Getting file from S3 with key ${fileKey}`);
//     const { Body } = await s3.send(new GetObjectCommand(getObjectParams));
//     if (!Body) throw new Error("File not found");
//     const fileBuffer = await Body.transformToByteArray();
//     return Buffer.from(fileBuffer);
// }

export async function getFile(fileId: string) {
    const fileRecord = await db.query.files.findFirst({
        where: eq(files.id, fileId),
        columns: {
            fileKey: true,
            user_id: true,
            fileCategory: true,
            fileName: true,
            mimeType: true,
        },
    });
    if (!fileRecord) {
        throw new Error("File not found");
    }

    // const file = isDev() ? await getFileLocally(fileRecord.fileKey) : await getFileFromSupabase(fileRecord.fileKey);
    const file = await getFileFromSupabase(fileRecord.fileKey);

    return {
        file,
        authorId: fileRecord.user_id,
        category: fileRecord.fileCategory,
        fileName: fileRecord.fileName,
        mimeType: fileRecord.mimeType,
    };
}

async function getFileLocally(fileKey: string) {
    const uploadPath = path.join(process.cwd(), "user-uploads/", fileKey);
    logger.info(`Getting file from ${uploadPath}`);
    const file = await readFile(uploadPath);

    return file;
}

async function getFileFromSupabase(fileKey: string) {
    const supabase = getSupabaseAdminClient();
    const bucket = getSupabaseBucketName();

    logger.info(`Getting file from Supabase bucket ${bucket}: ${fileKey}`);
    const { data, error } = await supabase.storage.from(bucket).download(fileKey);
    if (error || !data) {
        logger.error(`Failed to download file from Supabase: ${error?.message ?? "Unknown error"}`);
        throw new Error("Unable to download file from storage");
    }

    const arrayBuffer = await data.arrayBuffer();
    return Buffer.from(arrayBuffer);
}

function generateFileKey(userId: string, file: File, category: FileCategory) {
    const fileId = randomUUID();
    const ext = path.extname(file.name) || "";
    const sanitizedName = path.basename(file.name, ext).replace(/\s+/g, "_");

    return `users/${userId}/${category}/${sanitizedName}-${fileId}${ext}`;
}

async function fileToBuffer(file: File) {
    const bytes = await file.arrayBuffer();
    return Buffer.from(bytes);
}
