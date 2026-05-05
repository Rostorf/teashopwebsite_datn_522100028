import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    
    // 2. Attach it to the filename
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = path.extname(file.originalname).toLowerCase()
    const mimetype = file.mimetype

    if(filetypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Chỉ được dùng ảnh dưới dạng jpg/png/webp"), false)
    }
};

const upload = multer({ storage });

// Use upload.array('images', 4) to accept up to 4 files
router.post("/", upload.array("images", 4), (req, res) => {
  if (req.files && req.files.length > 0) {
    // Map through the uploaded files to extract their paths
    const filePaths = req.files.map((file) => {
      let normalizedPath = file.path.replace(/\\/g, "/"); 
      return `/${normalizedPath}`;
    });
    res.status(200).send({
      message: "Tải ảnh thành công", // Upload successful
      images: filePaths,
    });
  } else {
    res.status(400).send({ message: "Không có tệp ảnh nào được cung cấp" }); // No image provided
  }
});

export default router