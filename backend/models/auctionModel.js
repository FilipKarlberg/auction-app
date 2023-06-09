const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const auctionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    ending_date: {
      type: String,
      required: true,
    },
    min_bid: {
      type: Number,
      default: 1,
    },
    buyout_price: {
      type: Number,
    },
    current_bid: {
      type: Number,
    },
    bidder: {
      type: String,
    },
    bidder_username: {
      type: String,
    },
    image: {
      type: String,
    },
    is_sold: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auction", auctionSchema);
