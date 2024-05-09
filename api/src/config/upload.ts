import multer from "fastify-multer";
import path from "path";
import crypto from "crypto";

const __dirname = path.resolve();
const TMP_FOLDER = path.resolve(__dirname, "tmp");
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const STORAGE = multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString("hex");
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        }});

export {TMP_FOLDER, UPLOADS_FOLDER, STORAGE}