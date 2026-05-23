const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const { adminOnly } = require("../middleware/adminMiddleware");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/", protect, adminOnly, upload.single("coverImage"), addBook);

router.put("/:id", protect, adminOnly, upload.single("coverImage"), updateBook);

router.get("/", getBooks);

router.get("/:id", protect, getBookById);

router.delete("/:id", protect, adminOnly, deleteBook);

module.exports = router;
