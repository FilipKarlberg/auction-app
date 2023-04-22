const express = require("express");
const {
  getMessages,
  getMessage,
  createMessage,
  deleteMessage,
  updateMessage,
} = require("../controllers/messageController");

const router = express.Router();

// GET all messages
router.get("/", getMessages);

// GET a single message
router.get("/:id", getMessage);

// POST a new message
router.post("/", createMessage);

// DELETE a new message
router.delete("/:id", deleteMessage);

// UPDATE a new message
router.patch("/:id", updateMessage);

module.exports = router;
