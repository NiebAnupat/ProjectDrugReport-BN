// import multer from 'multer';
const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/assets/temp/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-image-${file.originalname}`);
    console.log("Uploaded file: " + file.originalname);
  },
});

let uploadFile = multer({ storage: storage, fileFilter: imageFilter });

// export default uploadFile;
module.exports = uploadFile;
