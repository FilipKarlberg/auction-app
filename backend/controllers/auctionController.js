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
  const { title, body, min_bid, buyout_price } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!body) {
    emptyFields.push("body");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the empty fields ", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;

    const auctionData = { title, body, user_id };

    // check if not required fields exist
    if (min_bid) {
      auctionData.min_bid = min_bid;
    }
    if (buyout_price) {
      auctionData.buyout_price = buyout_price;
    }

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
