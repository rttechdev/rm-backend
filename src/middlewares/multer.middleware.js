import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix);
    cb(null, file.originalname); // Use original filename for simplicity
  },
});

export const upload = multer({ storage: storage });
//export const multerMiddleware = upload.single("file"); // Use 'file' as the field name for the uploaded file
