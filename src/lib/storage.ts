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
async function saveFileLocally(file: File, category: FileCategory = "uploads") {
    const user = await getUser();

    const fileId = randomUUID();
    const ext = path.extname(file.name) || "";
    const sanitizedName = path.basename(file.name, ext).replace(/\s+/g, "_");
    const fileKey = `users/${user.id}/${category}/${sanitizedName}-${fileId}${ext}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadPath = path.join(process.cwd(), "user-uploads", fileKey);

    // logger.info(`Saving file locally: ${uploadPath}`);
    await mkdir(path.dirname(uploadPath), { recursive: true });
    await writeFile(uploadPath, buffer);

    return fileKey;
}

export async function storeFile(file: File, category: FileCategory = "uploads") {
    const user = await getUser();

    // let key;
    // if (isDev()) {
    //     key = await saveFileLocally(file, category);
    // } else {
    //     key = await saveFileToS3(file, category);
    // }

    // TODO: to be changed when deploying
    const key = await saveFileLocally(file, category);

    const [savedFile] = await db
        .insert(files)
        .values({
            user_id: user.id,
            fileKey: key,
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

    // let file: Buffer;
    // if (isDev()) {
    //     file = await getFileLocally(fileRecord.fileKey);
    // } else {
    //     file = await getFileFromS3(fileRecord.fileKey);
    // }

    // TODO: to be changed when deploying
    const file = await getFileLocally(fileRecord.fileKey);

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
