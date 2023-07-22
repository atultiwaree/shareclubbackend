//!Making multer Error.

const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "productImages") {
        cb(null, "public/productImages");
      } else cb(null, "public");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

module.exports = upload;
