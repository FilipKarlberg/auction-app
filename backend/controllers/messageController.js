const Message = require("../models/messageModel");
const mongoose = require("mongoose");

// get all messages
const getMessages = async (req, res) => {
  const messages = await Message.find({}).sort({ createdAt: -1 });

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
  const { author, title, body } = req.body;

  let emptyFields = [];

  if (!author) {
    emptyFields.push("author");
  }
  if (!title) {
    emptyFields.push("title");
  }
  if (!body) {
    emptyFields.push("body");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the empty fields", emptyFields });
  }

  // add doc to db
  try {
    const message = await Message.create({ author, title, body });
    res.status(200).json(message);
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

module.exports = {
  getMessages,
  getMessage,
  createMessage,
  deleteMessage,
  updateMessage,
};
