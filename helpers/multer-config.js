const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'application/pdf': 'pdf'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// module.exports = multer({storage: storage}).array('images', 2);
module.exports = multer({ storage: storage }).fields([
  {
    name: "course_image",
    maxCount: 1,
  },
  {
    name: "homework_image",
    maxCount: 1,
  },
  {
    name: "correction_image",
    maxCount: 1,
  },
]);
