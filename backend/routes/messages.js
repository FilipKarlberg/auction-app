const express = require("express");
const {
  getMessages,
  getMessage,
  createMessage,
  deleteMessage,
  updateMessage,
  getMessagesByAuctionId,
} = require("../controllers/messageController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// use middleware on all routes in this file
// require authentication for all message routes
//router.use(requireAuth);

// GET all messages
router.get("/", getMessages);

// GET a single message
router.get("/:id", getMessage);

// GET messages by auction id
router.get("/auction/:id", getMessagesByAuctionId);

// POST a new message
router.post("/", requireAuth, createMessage);

// DELETE a message
router.delete("/:id", deleteMessage);

// UPDATE a message
router.patch("/:id", updateMessage);

module.exports = router;
