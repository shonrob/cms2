var express = require("express");
var router = express.Router();

// Bringing in the route sequenceGenerator
const sequenceGenerator = require("./sequenceGenerator");
// Bringing in the model Message
const Message = require("../models/message");

// METHODS
// GET
router.get("/", async (req, res, next) => {
  try {
    const messages = await Message.find();
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST
router.post("/", (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender,
  });

  message
    .save()
    .then((createdMessage) => {
      res.status(201).json({
        message: "Message added successfully",
        message: createdMessage,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

// PUT
router.put("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      message.id = maxMessageId;
      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;
      Message.updateOne({ id: req.params.id }, message)
        .then((result) => {
          res.status(204).json({
            message: "Message updated successfully",
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
        message: "Message not found.",
        error: { message: "Message not found" },
      });
    });
});

// DELETE

router.delete("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      Message.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Message deleted successfully",
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
        message: "Message not found.",
        error: { message: "Message not found" },
      });
    });
});

module.exports = router;
