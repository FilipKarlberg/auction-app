const express = require("express");
const {
  getAuctions,
  getAuction,
  createAuction,
  deleteAuction,
  updateAuction,
  getAuctionsByUserId,
} = require("../controllers/auctionController");
const requireAuth = require("../middleware/requireAuth");
const uploadMiddleware = require("../middleware/uploadMiddleware");

const router = express.Router();

// GET all Auctions
router.get("/", getAuctions);

// GET a single Auction
router.get("/:id", getAuction);

// GET a single Auction with user_id
router.get("/:id", getAuctionsByUserId);

// POST a new Auction
router.post("/", requireAuth, uploadMiddleware.single("image"), createAuction);

// DELETE a new Auction
router.delete("/:id", requireAuth, deleteAuction);

// UPDATE a new Auction
router.patch("/:id", requireAuth, updateAuction);

module.exports = router;
