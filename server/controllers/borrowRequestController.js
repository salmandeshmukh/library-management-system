const BorrowRequest = require("../models/BorrowRequest");

const Book = require("../models/Book");

const Borrow = require("../models/Borrow");

const createBorrowRequest = async (req, res) => {
  try {
    const { bookId } = req.body;

    const pendingRequests = await BorrowRequest.countDocuments({
      user: req.user.id,

      status: "pending",
    });

    const borrowedBooks = await Borrow.countDocuments({
      user: req.user.id,

      returned: {
        $ne: true,
      },
    });

    const totalBooks = pendingRequests + borrowedBooks;

    if (totalBooks >= 3) {
      return res.status(400).json({
        message: "Borrow limit exceeded (Max 3 books)",
      });
    }

    const existingRequest = await BorrowRequest.findOne({
      user: req.user.id,
      book: bookId,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Request already pending",
      });
    }

    const request = await BorrowRequest.create({
      user: req.user.id,
      book: bookId,
    });

    res.status(201).json({
      message: "Borrow request sent",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await BorrowRequest.find()

      .populate("user", "name email")

      .populate("book", "title author");

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const approveRequest = async (req, res) => {
  try {
    const request = await BorrowRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    const book = await Book.findById(request.book);

    if (book.availableCopies < 1) {
      return res.status(400).json({
        message: "No copies available",
      });
    }

    request.status = "approved";

    await request.save();

    await Borrow.create({
      user: request.user,
      book: request.book,
      dueDate: new Date(
        Date.now() + book.borrowDurationDays * 24 * 60 * 60 * 1000,
      ),
    });

    if (book.availableCopies < 1) {
      return res.status(400).json({
        message: "Book is out of stock",
      });
    }

    book.availableCopies -= 1;

    await book.save();

    res.status(200).json({
      message: "Request approved",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const rejectRequest = async (req, res) => {
  try {
    const request = await BorrowRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.status = "rejected";

    await request.save();

    res.status(200).json({
      message: "Request rejected",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyRequests = async (req, res) => {
  try {
    const requests = await BorrowRequest.find({
      user: req.user.id,

      status: "pending",
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBorrowRequest,
  getAllRequests,
  approveRequest,
  rejectRequest,
  getMyRequests,
};
