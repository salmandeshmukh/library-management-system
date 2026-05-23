const express = require("express");

const {
  borrowBook,
  returnBook,
  getBorrowedBooks,
  requestReturnBook,
  approveReturnBook,
  getReturnRequests,
  getRecentActivities,
  getMonthlyBorrowStats,
} = require("../controllers/borrowController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", protect, borrowBook);

router.get("/my-books", protect, getBorrowedBooks);

router.put("/return", protect, returnBook);

router.put("/request-return/:id", protect, requestReturnBook);

router.put("/approve-return/:id", protect, adminOnly, approveReturnBook);

router.get("/return-requests", protect, adminOnly, getReturnRequests);

router.get("/recent-activities", protect, adminOnly, getRecentActivities);

router.get("/monthly-stats", protect, adminOnly, getMonthlyBorrowStats);

module.exports = router;
