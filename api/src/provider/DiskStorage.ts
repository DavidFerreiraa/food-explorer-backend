import { promises } from "fs";
import { TMP_FOLDER, UPLOADS_FOLDER } from "../config/upload.js";
import path from "path";

export class DiskStorage {
    async saveFile(file: string){
        await promises.rename(
            path.resolve(TMP_FOLDER, file),
            path.resolve(UPLOADS_FOLDER, file)
        );

        return file;
    }

    async deleteFile(file: any){
        const filePath = path.resolve(UPLOADS_FOLDER, file)

        try {
            await promises.stat(filePath);
        } catch (error) {
            return;
        }

        await promises.unlink(filePath);
    }
}