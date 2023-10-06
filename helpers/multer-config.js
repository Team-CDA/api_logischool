// Ceci est un middleware qui permet de gérer les fichiers entrants dans les requêtes HTTP.
// Ces constantes seront utilisées pour indiquer à Multer où enregistrer les fichiers entrants et quels types de fichiers sont acceptés.
const multer = require('multer');
const path = require('path');

// On déclare un schéma pour le type de donnée qu'on est censé récuperer depuis ces routes.
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'application/pdf': 'pdf'
};

// Le storage permet de dire à multer où enregistrer les fichiers entrants
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = MIME_TYPES[file.mimetype];
    callback(null, uniqueSuffix + '.' + extension);
  }
});
// On exporte l'élément multer entièrement configuré, on lui passe notre constante storage et on lui indique qu'on gère 
// uniquement les téléchargements de fichiers image.
module.exports = multer({ storage: storage, limits: {fileSize: 1024 * 1024 * 5}}).fields([
  { name: "course_image", maxCount: 1},
  { name: "homework_image", maxCount: 1},
  { name: "correction_image", maxCount: 1}
]);




// const multer = require('multer');

// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png',
//   'application/pdf': 'pdf'
// };

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'images');
//   },
//   filename: (req, file, callback) => {
//     const name = file.originalname.split(' ').join('_');
//     const extension = MIME_TYPES[file.mimetype];
//     callback(null, name + Date.now() + '.' + extension);
//   }
// });

// // module.exports = multer({storage: storage}).array('images', 2);
// module.exports = multer({ storage: storage }).fields([
//   {
//     name: "course_image",
//     maxCount: 1,
//   },
//   {
//     name: "homework_image",
//     maxCount: 1,
//   },
//   {
//     name: "correction_image",
//     maxCount: 1,
//   },
// ]);
