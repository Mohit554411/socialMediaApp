import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Define the folder path
const uploadFolderPath = path.join(path.resolve(), 'public/images/postUploadFile');

// Check if the folder exists, if not, create it
if (!fs.existsSync(uploadFolderPath)) {
    fs.mkdirSync(uploadFolderPath, { recursive: true });
}

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolderPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

export const postUploadFile = multer({
    storage: storageConfig,
});