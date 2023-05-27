import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination: 'uploads/',

    filename: function (req, file, cb) {
        console.log('fileName =>>>>>>>>>>>>>>>>>>>>>>', file);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Image uniquement!')
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        console.log('fileeee', file);
        checkFileType(file, cb)
    }
})

router.post('/', upload.single('image'), (req, res) => {
    const filePath = `/${req.file.path}`.replace(/\\/g, '/');
    res.send(filePath);
})

export default router