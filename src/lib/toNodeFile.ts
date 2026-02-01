import "server-only";
import { File as NodeFile } from "node:buffer";

export async function toNodeFile(webFile: Blob, fileName: string) {
    const arrayBuffer = await webFile.arrayBuffer();
    return new NodeFile([Buffer.from(arrayBuffer)], fileName, {
        type: webFile.type,
        lastModified: Date.now(),
    });
}
