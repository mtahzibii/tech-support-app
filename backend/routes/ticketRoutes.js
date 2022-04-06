const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware.js");
const {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
} = require("../controller/ticketController");

router.route("/").get(protect, getTickets).post(protect, createTicket);
router.route("/:id").get(protect, getTicket);
router.route("/:id").delete(protect, deleteTicket);
router.route("/:id").put(protect, updateTicket);

module.exports = router;
