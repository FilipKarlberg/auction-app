const Message = require("../models/messageModel");
const mongoose = require("mongoose");
const User = require("../models/userModel");

// get all messages
const getMessages = async (req, res) => {
  const user_id = req.user._id;

  const messages = await Message.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(messages);
};

// get single message
const getMessage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such message with id", id });
  }

  const message = await Message.findById(id);

  if (!message) {
    return res.status(404).json({ error: "No message found with id: ", id });
  }

  res.status(200).json({ message });
};

// create new message
const createMessage = async (req, res) => {
  const { message, auction_id } = req.body;
  const user_id = req.user._id;

  if (!message) {
    return res.status(400).json({ error: "Empty message: ", message });
  }

  if (!auction_id) {
    return res.status(400).json({ error: "Empty auction_id", auction_id });
  }

  const user = await User.findById(user_id);

  if (!user) {
    return res.status(400).json({ error: "User not found, ", user_id });
  }

  const username = user.username;

  // add doc to db
  try {
    const createdMessage = await Message.create({
      message,
      user_id,
      auction_id,
      username,
    });
    res.status(200).json(createdMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

// delete a message
const deleteMessage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such id" });
  }

  const message = await Message.findOneAndDelete({ _id: id });

  if (!message) {
    return res.status(400).json({ error: "No message found with id: ", id });
  }

  res.status(200).json(message);
};

// update a message
const updateMessage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such id" });
  }

  // first param to find message in form, second is updated version of that message
  const message = await Message.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!message) {
    return res.status(400).json({ error: "No message found with id: ", id });
  }

  res.status(200).json(message);
};

const getMessagesByAuctionId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const messages = await Message.find({ auction_id: id }).sort({
    createdAt: 1,
  });

  if (!messages) {
    return res
      .status(400)
      .json({ error: "No messages found with auction_id: ", id });
  }

  res.status(200).json(messages);
};

module.exports = {
  getMessages,
  getMessage,
  createMessage,
  deleteMessage,
  updateMessage,
  getMessagesByAuctionId,
};
