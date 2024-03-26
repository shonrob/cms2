var express = require("express");
var router = express.Router();

// Bringing in the route sequenceGenerator
const sequenceGenerator = require("./sequenceGenerator");
// Brining in the model Document
const Document = require("../models/document");

// METHODS

// GET
router.get("/", async (req, res, next) => {
  try {
    const documents = await Document.find();
    res.status(200).json({ documents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST
router.post("/:id", async (req, res, next) => {
  try {
    const maxDocumentId = await sequenceGenerator.nextId("documents");
    const document = new Document({
      id: maxDocumentId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
    });
    console.log(document);
    document.save().then((createdDocument) => {
      return res.status(201).json({
        message: "Document added successfully.",
        document: createdDocument,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred saving the document.",
      error: error,
    });
  }
});
// router.post("/", (req, res, next) => {
//   const maxDocumentId = sequenceGenerator.nextId("documents");

//   const document = new Document({
//     id: maxDocumentId,
//     name: req.body.name,
//     description: req.body.description,
//     url: req.body.url,
//   });

//   document
//     .save()
//     .then((createdDocument) => {
//       res.status(201).json({
//         message: "Document added successfully",
//         document: createdDocument,
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         message: "An error occurred",
//         error: error,
//       });
//     });
// });

// PUT
router.put("/:id", (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then((document) => {
      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;

      Document.updateOne({ id: req.params.id }, document)
        .then((result) => {
          res.status(204).json({
            message: "Document updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred in trying to update",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Document not found.",
        error: { document: "Document not found" },
      });
    });
});

// DELETE

router.delete("/:id", (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then((document) => {
      Document.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Document deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred in trying to delete",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Document not found.",
        error: { document: "Document not found" },
      });
    });
});

module.exports = router;
