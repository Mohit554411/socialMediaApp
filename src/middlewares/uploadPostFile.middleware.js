import multer from 'multer';

const storageConfig = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images/postUploadFile');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname);
    }
});

export const postUploadFile = multer({
    storage:storageConfig,
})