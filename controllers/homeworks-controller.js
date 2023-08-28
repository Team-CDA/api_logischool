const db = require("../models/index");
const { ValidationError } = require("sequelize");
const homeworksTable = db["homeworks"];
const classTable = db["classes"];
const homeworksClassesTable = db["homeworks_classes"];
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { log } = require("console");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "application/pdf": "pdf",
};

const getAll = (req, res) => {
  homeworksTable
    .findAll({
      include: [
        {
          model: classTable,
          as: "class",
        },
      ],
    })
    .then((result) => {
      if (result.length === 0) {
        res.send([]);
      } else {
        res.json(result, 200);
      }
    })
    .catch((error) => {
      const message = "Une erreur a eu lieu.";
      res.status(500).json({
        message,
        data: error,
      });
    });
};

const getOneById = (req, res) => {
  homeworksTable
    .findByPk(req.params.id)
    .then((homework) => {
      if (!homework) {
        return res
          .status(404)
          .json({ message: "Aucune homework n'a été trouvé" });
      }
      res.status(200).json(homework);
    })
    .catch((error) => {
      const message =
        "Une erreur a eu lieu lors de la récupération du homework.";
      res.status(500).json({
        message,
        data: error.message,
      });
    });
};

const getAllByIdClassAndIdSubject = (req, res) => {
  homeworksTable
    .findAll({
      where: {
        id_class: req.params.idClass,
        id_subject: req.params.idSubject,
      },
    })
    .then((homework) => {
      if (!homework) {
        return res
          .status(404)
          .json({ message: "Aucune homework n'a été trouvé" });
      }
      res.status(200).json(homework);
    })
    .catch((error) => {
      const message =
        "Une erreur a eu lieu lors de la récupération du homework.";
      res.status(500).json({
        message,
        data: error.message,
      });
    });
};


const getWithFilter = (req, res) => {
  const teacherId = req.query.id_teacher;
  const subjectId = req.query.id_subject;
  let whereClause = "";
  if (teacherId && subjectId) {
    whereClause = {
      id_user: teacherId,
      id_subject: subjectId,
    };
  } else if (teacherId) {
    whereClause = {
      id_user: teacherId,
    };
  } else if (subjectId) {
    whereClause = {
      id_subject: subjectId,
    };
  }

  homeworksTable
    .findAll({
      where: whereClause,
    })
    .then((homework) => {
      if (!homework) {
        return res
          .status(404)
          .json({ message: "Aucune homework n'a été trouvé" });
      }
      res.status(200).json(homework);
    })
    .catch((error) => {
      const message =
        "Une erreur a eu lieu lors de la récupération du homework.";
      res.status(500).json({
        message,
        data: error.message,
      });
    });
};

const deleteOneCorrectionById = async (req, res) => {
  const homeworkId = req.params.id;
  console.log(req.params.id);
  try {
    const homework = await homeworksTable.findOne({
      where: { id: homeworkId },
    });

    if (!homework) {
      res.status(404).json({ message: "Homework not found." });
      return;
    } else {
      const filePath = path.join(
        __dirname,
        "..",
        "images",
        homework["correction_image"]
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      homework.correction_image = null;
      homework.date_correction = null;
      await homework.save();
      res.status(200).json({ message: "Homework successfully updated." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occurred while deleting the homework.", error });
  }
};

const deleteOneById = async (req, res) => {
  const homeworkId = req.params.id;

  try {
    const homework = await homeworksTable.findOne({
      where: { id: homeworkId },
    });

    if (!homework) {
      res.status(404).json({ message: "Homework not found." });
      return;
    }

    // On supprime les fichiers du serveur si nécessaire
    const fileCategories = [
      "course_image",
      "homework_image",
      "correction_image",
    ];

    fileCategories.forEach((category) => {
      if (homework[category]) {
        // Assurez-vous que le répertoire des images est correctement défini ici
        const filePath = path.join(
          __dirname,
          "..",
          "images",
          homework[category]
        );
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    });

    // On supprime l'entrée de la base de données
    await homeworksTable.destroy({ where: { id: homeworkId } });
    res.status(200).json({ message: "Homework successfully deleted." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occurred while deleting the homework.", error });
  }
};

// const deleteOneById = (req, res) => {
//     homeworksTable.findByPk(req.params.id)
//     .then(homework => {
//         if(!homework) {
//             return res.status(404).json({message: "Aucune homework n'a été trouvé"})
//         }

//         const exoPath = 'images/' + homework.dataValues.homework_image
//         const correctionName = 'images/' + homework.dataValues.correction_image

//         homeworksTable.destroy({
//             where: {
//                 id: req.params.id
//             }
//         })

//         .then(r => {

//             if (fs.existsSync(exoPath)) {
//                 fs.unlinkSync(exoPath)
//             }

//             if (fs.existsSync(correctionName)) {
//                 fs.unlinkSync(correctionName)
//             }

//             const message = "L'élément a bien été supprimé."
//             res.status(200).send(message)
//         })
//         .catch(error => {
//             const message = "Une erreur a eu lieu."
//             if (error instanceof ValidationError) {
//                 res.status(400).send(error.errors[0].message)
//             } else {
//                 res.status(500).json({
//                     message,
//                     error
//                 })
//             }
//         })
//     })
// }

// const create = (req, res) => {

//         let body = JSON.parse(req.body.body)
//         homeworksTable.create({name: body.name, id_user: body.id_user, id_subject: body.id_subject})
//         .then(homework => {

//             let exerciceName = ''
//             let correctionName = ''
//             if (req.files.exercice.length != 0){
//                 const img = req.files.exercice[0].path
//                 exerciceName = 'exercice-' + homework.id + '.'+MIME_TYPES[req.files.exercice[0].mimetype]
//                 fs.renameSync(img, 'images/' + exerciceName);
//             }

//             if (req.files.correction.length != 0){
//                 const img = req.files.correction[0].path
//                 correctionName = 'correction-' + homework.id + '.'+MIME_TYPES[req.files.correction[0].mimetype]
//                 fs.renameSync(img, 'images/' + correctionName);
//             }

//             homeworksTable.update(
//                 {
//                     homework_image: exerciceName,
//                     correction_image: correctionName
//                 }, {
//                     where : {id: homework.id}
//                 }
//             )
//             const message = "Un homework est ajouté à la base de données."

//             res.status(201).json({
//                 message,
//                 data: homework
//             })
//         })

//         .catch(error => {
//             const message = "Une erreur a eu lieu lors de l'insertion du homework en base de donnée."
//             if (error instanceof ValidationError) {
//                 if (req.files.exercice) {
//                     fs.unlinkSync(req.files.exercice[0].path)
//                 }
//                 if (req.files.correction){
//                     fs.unlinkSync(req.files.correction[0].path)
//                 }
//                 res.status(400).send(error.errors[0].message)
//             } else {
//                 if (req.files.exercice) {
//                     fs.unlinkSync(req.files.exercice[0].path)
//                 }
//                 if (req.files.correction){
//                     fs.unlinkSync(req.files.correction[0].path)
//                 }
//                 res.status(500).json({
//                     message,
//                     error
//                 })
//             }
//         })
//     }

const create = (req, res) => {
  const body = req.body;

  console.log("req/body", req.body);
  if (!body.category) {
    res.status(400).json({ message: "Category is missing." });
    return;
  }

  const category = body.category;
  console.log(category);
  console.log("Received files:", req.files);

  const uploadedFile = req.files[category] && req.files[category][0];
  const fileName = uploadedFile ? uploadedFile.filename : null;

  if (!fileName) {
    res.status(400).json({ message: "File is missing." });
    return;
  }

  const metadata = JSON.parse(body.metadata);

  console.log(metadata);
  let fileData = {
    id_user: metadata.id_user,
    id_subject: metadata.id_subject,
    id_class: metadata.id_class,
    name: metadata.name,
    date_devoir: req.body.date_devoir ? req.body.date_devoir : null,
    date_correction: req.body.date_correction ? req.body.date_correction : null,
  };

  if (category === "homework_image") {
    fileData.homework_image = fileName;
  } else if (category === "correction_image") {
    fileData.correction_image = fileName;
  } else {
    fileData.course_image = fileName;
  }

  homeworksTable
    .create(fileData)
    .then((homework) => {
      const message = "Un homework est ajouté à la base de données.";

      res.status(201).json({
        message,
        data: homework,
        id: homework.id,
      });
    })
    .catch((error) => {
      const message =
        "Une erreur a eu lieu lors de l'insertion du homework en base de donnée.";
      if (error instanceof ValidationError) {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        res.status(400).send(error.errors[0].message);
      } else {
        console.log("error", error);
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
          message,
          error,
        });
      }
    });
};

// const update = (req, res ) => {

//     homeworksTable.findOne({
//         where: {
//             id: {[Op.eq]: req.params.id}
//         }
//     })

//     .then (r => {

//         let result = r.dataValues
//         let exoName = ''
//         let correctionName = ''
//         if (req.files.exercice){
//             exoName = 'exercice-' + result.id + '.'+MIME_TYPES[req.files.exercice[0].mimetype]
//         }
//         if (req.files.correction){
//             correctionName = 'correction-' + result.id + '.'+MIME_TYPES[req.files.correction[0].mimetype]
//         }

//         if (req.body.body && r.length != 0){

//             let body = JSON.parse(req.body.body)

//                 homeworksTable.update({
//                     ...body
//                 },
//                 {
//                     where : {id: req.params.id}
//                 })

//                 .then(resultBool => {

//                     if (resultBool == 0 ){
//                         const message = "Une erreur a eu lieu"
//                         if (req.files.exercice) {
//                             fs.unlinkSync(req.files.exercice[0].path)
//                         }
//                         if (req.files.correction){
//                             fs.unlinkSync(req.files.correction[0].path)
//                         }
//                         res.status(202).send(message)
//                     } else {

//                         if (req.files.exercice){
//                             const img = req.files.exercice[0].path
//                             if (fs.existsSync('images/'+result.homework_image) && result.homework_image) {
//                                 fs.unlinkSync('images/'+result.homework_image)
//                             }
//                             fs.renameSync(img, 'images/' + exoName);
//                             exoUpdated = true
//                             body.homework_image = exoName
//                         }

//                         if (req.files.correction){
//                             const img = req.files.correction[0].path
//                             if (fs.existsSync('images/'+result.correction_image) && result.correction_image) {
//                                 fs.unlinkSync('images/'+result.correction_image)
//                             }
//                             fs.renameSync(img, 'images/' + correctionName);
//                             correctionUpdated = true
//                             body.correction_image = correctionName
//                         }

//                         const message = "Mise à jour réussie."
//                         res.status(201).json({
//                             message,
//                             data: resultBool
//                         })
//                     }
//                 })

//                 .catch(error => {
//                     const message = "Une erreur a eu lieu lors de la mise à jour."
//                     if (error instanceof ValidationError) {
//                         if (req.files.exercice) {
//                             fs.unlinkSync(req.files.exercice[0].path)
//                         }
//                         if (req.files.correction){
//                             fs.unlinkSync(req.files.correction[0].path)
//                         }
//                         res.status(400).send(error.errors[0].message)
//                     } else {
//                         if (req.files.exercice) {
//                             fs.unlinkSync(req.files.exercice[0].path)
//                         }
//                         if (req.files.correction){
//                             fs.unlinkSync(req.files.correction[0].path)
//                         }
//                         res.status(500).json({
//                             message,
//                             error
//                         })
//                     }
//                 })
//         } else {

//             let body = {}
//             if (req.files.exercice){
//                 const img = req.files.exercice[0].path
//                 if (fs.existsSync('images/'+result.homework_image) && result.homework_image) {
//                     fs.unlinkSync('images/'+result.homework_image)
//                 }
//                 fs.renameSync(img, 'images/' + exoName);
//                 exoUpdated = true
//                 body.homework_image = exoName
//             }

//             if (req.files.correction){
//                 const img = req.files.correction[0].path
//                 if (fs.existsSync('images/'+result.correction_image) && result.correction_image) {
//                     fs.unlinkSync('images/'+result.correction_image)
//                 }
//                 fs.renameSync(img, 'images/' + correctionName);
//                 correctionUpdated = true
//                 body.correction_image = correctionName
//             }
//             homeworksTable.update({
//                 ...body
//             },
//             {
//                 where : {id: req.params.id}
//             })

//             .then (r=>{
//                 const message = "Mise à jour réussie."
//                         res.status(201).json({
//                             message
//                         })
//             })
//             .catch(error =>{
//                 const message = "Une erreur a eu lieu lors de la mise à jour."
//                 res.status(500).json({
//                     message,
//                     error
//                 })
//             })
//         }
//     })
// }

const linkTwoFiles = async (req, res) => {
  const homeworkId = req.body.id;

  try {
    let homework = await homeworksTable.findOne({
      where: { id: homeworkId },
    });

    if (!homework) {
      res.status(404).json({ message: "Homework not found." });
      return;
    } else {
      homework.correction_image = req.files.correction_image[0].originalname;
      homework.date_correction = req.body.date_correction;
      await homework.save();
      res.status(200).json({
        message: "Homework file successfully updated.",
        data: homework,
      });
    }
  } catch (error) {
    const message =
      "Une erreur a eu lieu lors de la mise à jour du homework en base de donnée.";
    if (error instanceof ValidationError) {
      if (req.files.correction_image[0]) {
        fs.unlinkSync(req.files.correction_image[0].path);
      }
      res.status(400).send(error.errors[0].message);
    } else {
      console.log("error", error);
      if (req.files.correction_image[0]) {
        fs.unlinkSync(req.files.correction_image[0].path);
      }
      res.status(500).json({
        message,
        error,
      });
    }
  }
};

const update = async (req, res) => {
  const homeworkId = req.params.id;
  const newName = req.body.name;

  try {
    const homework = await homeworksTable.findOne({
      where: { id: homeworkId },
    });

    if (!homework) {
      res.status(404).json({ message: "Homework not found." });
      return;
    }

    let updated = false;

    homework.name = newName;
    updated = true;
    // const fileCategories = [
    //   "course_image",
    //   "homework_image",
    //   "correction_image",
    // ];

    // for (const category of fileCategories) {
    //   if (homework[category]) {
    //     const oldFilePath = path.join(
    //       __dirname,
    //       "..",
    //       "images",
    //       homework[category]
    //     );
    //     const fileExt = path.extname(homework[category]);
    //     const newFileName = newName + fileExt;
    //     const newFilePath = path.join(__dirname, "..", "images", newFileName);

    //     if (fs.existsSync(oldFilePath)) {
    //       fs.renameSync(oldFilePath, newFilePath);
    //       homework[category] = newFileName;
    //       updated = true;
    //     }
    //   }
    // }

    if (updated) {
      await homework.save();
      res.status(200).json({
        message: "Homework file name successfully updated.",
        data: homework,
      });
    } else {
      res.status(500).json({ message: "Failed to update homework file name." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while updating the homework file name.",
      error,
    });
  }
};

const getOneFileById = (req, res) => {
  homeworksTable
    .findByPk(req.params.id)
    .then((homework) => {
      const file = req.params.file;
      if (!homework) {
        return res
          .status(404)
          .json({ message: "Aucun homework n'a été trouvé" });
      }

      if (file == "exercice") {
        if (
          fs.existsSync("images/" + homework.homework_image) &&
          homework.homework_image
        ) {
          res.setHeader(
            "Content-Disposition",
            'attachment: filename="' + homework.homework_image + '"'
          );
          res.download("images/" + homework.homework_image);
        } else {
          return res.status(404).json({ message: "Aucun fichier à récuperer" });
        }
      } else if (file == "correction") {
        if (
          fs.existsSync("images/" + homework.correction_image) &&
          homework.correction_image
        ) {
          res.setHeader(
            "Content-Disposition",
            'attachment: filename="' + homework.correction_image + '"'
          );
          res.download("images/" + homework.correction_image);
        } else {
          return res.status(404).json({ message: "Aucun fichier à récuperer" });
        }
      } else {
        return res.status(404).json({ message: "Aucun fichier à récuperer" });
      }
    })
    .catch((error) => {
      const message =
        "Une erreur a eu lieu lors de la récupération du homework.";
      res.status(500).json({
        message,
        data: error.message,
      });
    });
};

// **************************************************
// *************Partie homeworks_classes*************
// **************************************************

// Par soucis de simplicité je vais nommer toutes les méthodes qui touchent à homewokrs_classes avec HC à la fin

const createHC = (req, res) => {
  homeworksClassesTable
    .create({ ...req.body })
    .then((homeworkClasses) => {
      if (!homeworkClasses) {
        return res
          .status(404)
          .json({ message: "Une erreur a eu lieu lors de a création." });
      }
      res.status(200).json(homeworkClasses);
    })
    .catch((error) => {
      const message = "Une erreur a eu lieu lors de a création.";
      res.status(500).json({
        message,
        data: error.message,
      });
    });
};

const updateHC = (req, res) => {
  homeworksClassesTable
    .update(
      {
        ...req.body,
      },
      {
        where: { id: req.params.id },
      }
    )

    .then((result) => {
      const message = "mise à jour réussie";
      res.status(201).json({
        message,
        data: result,
      });
    })

    .catch((error) => {
      const message = "une erreur a eu lieu lors de la mise à jour";
      if (error instanceof ValidationError) {
        res.status(400).send(error.errors[0].message);
      } else {
        res.statuss(500).json({
          message,
          error,
        });
      }
    });
};

const getOneByIdHC = (req, res) => {
  homeworksClassesTable
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        return res
          .status(404)
          .json({ message: "Aucune association n'a été trouvé" });
      }
      res.status(200).json(result);
    })
    .catch((error) => {
      const message = "Une erreur a eu lieu lors de la récupération.";
      res.status(500).json({
        message,
        data: error.message,
      });
    });
};

const deleteOneByIdHC = (req, res) => {
  homeworksClassesTable.findByPk(req.params.id).then((result) => {
    if (!result) {
      return res.status(404).json({ message: "Aucune donnée n'a été trouvé" });
    }

    homeworksClassesTable
      .destroy({
        where: {
          id: req.params.id,
        },
      })

      .then((r) => {
        const message = "L'élément a bien été supprimé.";
        res.status(200).send(message);
      })
      .catch((error) => {
        const message = "Une erreur a eu lieu.";
        if (error instanceof ValidationError) {
          res.status(400).send(error.errors[0].message);
        } else {
          res.status(500).json({
            message,
            error,
          });
        }
      });
  });
};

const getByDateRangeHC = (req, res) => {
  const startingDate = req.query.startingDate;
  const endingDate = req.query.endingDate;

  console.log(startingDate);
  console.log(endingDate);
  if (!startingDate || !endingDate) {
    res.status(400).send("Veuillez renseigner les deux dates");
  } else {
    homeworksClassesTable
      .findAll({
        where: {
          plannified_date: { [Op.between]: [startingDate, endingDate] },
        },
      })

      .then((result) => {
        res.status(200).send(result);
      })

      .catch((error) => {
        const message =
          "Une erreur a eu lieu lors de la récupération des données.";
        res.status(500).json({
          message,
          data: error.message,
        });
      });
  }
};

// *************************************************
// ******************Partie export******************
// *************************************************

const homeworksController = {
  getAll,
  getOneById,
  create,
  update,
  deleteOneById,
  getOneFileById,
  getWithFilter,
  createHC,
  updateHC,
  getOneByIdHC,
  deleteOneByIdHC,
  deleteOneCorrectionById,
  getByDateRangeHC,
  linkTwoFiles,
  getAllByIdClassAndIdSubject
};

module.exports = homeworksController;
