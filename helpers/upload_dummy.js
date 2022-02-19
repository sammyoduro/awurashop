const util = require("util");
const multer = require("multer");
const path = require("path");

// SINGLE FILE UPLOAD
// Set storage engine
const storage = multer.diskStorage({
  destination: "public/img",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("client-img");

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error : Images Only!");
  }
}
let uploadFileMiddleware = util.promisify(upload);
module.exports = uploadFileMiddleware;
