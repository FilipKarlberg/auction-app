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
const {
  uploadMiddleware,
  handleMulterErrors,
} = require("../middleware/uploadMiddleware");

const router = express.Router();

// GET all Auctions
router.get("/", getAuctions);

// GET a single Auction
router.get("/:id", getAuction);

// GET auctions with user_id
router.get("/user/:userId", requireAuth, getAuctionsByUserId);

// POST a new Auction
router.post(
  "/",
  requireAuth,
  uploadMiddleware.single("image"),
  handleMulterErrors, // check if filesize is too big etc
  createAuction
);

// DELETE a new Auction
router.delete("/:id", requireAuth, deleteAuction);

// UPDATE a new Auction
router.patch("/:id", requireAuth, updateAuction);

module.exports = router;
