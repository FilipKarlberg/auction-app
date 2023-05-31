const Auction = require("../models/auctionModel");
const mongoose = require("mongoose");

// get all auctions
const getAuctions = async (req, res) => {
  const auctions = await Auction.find().sort({ createdAt: -1 });

  res.status(200).json(auctions);
};

// get all auctions by id
const getAuctionsByUserId = async (req, res) => {
  const user_id = req.user._id;

  const auctions = await Auction.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(auctions);
};

// get single auction
const getAuction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such auction with id", id });
  }

  const auction = await Auction.findById(id);

  if (!auction) {
    return res.status(404).json({ error: "No auction found with id: ", id });
  }

  res.status(200).json({ auction });
};

// create new auction
const createAuction = async (req, res) => {
  const { title, body, ending_date, min_bid, buyout_price } = req.body;

  // handle image file upload
  const image = req.file;
  let imageName;
  if (image) {
    imageName = image.filename;
  }

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!body) {
    emptyFields.push("body");
  }
  if (!ending_date) {
    emptyFields.push("ending date");
  }
  if (emptyFields.length > 0) {
    console.log(emptyFields);
    return res
      .status(400)
      .json({ error: "Please fill all the required fields", emptyFields });
  }
  if (min_bid < 0 || buyout_price < 0) {
    return res
      .status(400)
      .json({ error: "Minimum bid and buyout price cannot be negative" });
  }

  if (min_bid >= buyout_price) {
    return res
      .status(400)
      .json({ error: "Minimum bid must be lower than the buyout price" });
  }

  // add doc to db
  try {
    const user_id = req.user._id;

    const auctionData = { title, body, user_id, ending_date };

    // check if not required fields exist (default values)
    // min_bid
    auctionData.min_bid = min_bid ? min_bid : 0;
    // buyout_price
    auctionData.buyout_price = buyout_price ? buyout_price : null;
    // image
    auctionData.image = image ? imageName : null;

    const auction = await Auction.create(auctionData);
    res.status(200).json(auction);
  } catch (error) {
    res.status(400).json({ error: error.auction });
    console.log(error);
  }
};

// delete from db
const deleteAuction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such id" });
  }

  const auction = await Auction.findOneAndDelete({ _id: id });

  if (!auction) {
    return res.status(400).json({ error: "No auction found with id: ", id });
  }

  res.status(200).json(auction);
};

// update an auction
const updateAuction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such id" });
  }

  // first param to find auction in form, second is updated version of that auction
  const auction = await Auction.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!auction) {
    return res.status(400).json({ error: "No auction found with id: ", id });
  }

  res.status(200).json(auction);
};

module.exports = {
  getAuctions,
  getAuction,
  getAuctionsByUserId,
  createAuction,
  deleteAuction,
  updateAuction,
};
