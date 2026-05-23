const Borrow = require("../models/Borrow");

const Book = require("../models/Book");

const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    if (book.availableCopies < 1) {
      return res.status(400).json({
        message: "No copies available",
      });
    }

    const dueDate = new Date();

    dueDate.setDate(dueDate.getDate() + 7);

    const borrow = await Borrow.create({
      user: req.user._id,
      book: bookId,
      dueDate,
    });

    book.availableCopies -= 1;

    await book.save();

    res.status(201).json({
      message: "Book borrowed successfully",
      borrow,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBorrowedBooks = async (req, res) => {
  try {
    const borrowedBooks = await Borrow.find({
      user: req.user._id,
    })

      .populate("book")

      .sort({ createdAt: -1 });

    const updatedBooks = borrowedBooks.map((item) => {
      const today = new Date();

      let lateDays = 0;

      let isOverdue = false;

      let fine = 0;

      if (item.dueDate && !item.returned) {
        const dueDate = new Date(item.dueDate);

        lateDays = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));

        isOverdue = lateDays > 0;

        fine = isOverdue ? lateDays * (item.book?.finePerDay || 0) : 0;
      }

      return {
        ...item.toObject(),

        isOverdue,

        lateDays: isOverdue ? lateDays : 0,

        fine,
      };
    });

    res.status(200).json(updatedBooks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.body;

    const borrow = await Borrow.findById(borrowId);

    if (!borrow) {
      return res.status(404).json({
        message: "Borrow record not found",
      });
    }

    if (borrow.returned) {
      return res.status(400).json({
        message: "Book already returned",
      });
    }

    borrow.returned = true;

    const borrowDate = new Date();

    const dueDate = new Date();

    dueDate.setDate(borrowDate.getDate() + book.borrowDurationDays);

    borrow.borrowDate = borrowDate;

    borrow.dueDate = dueDate;

    await borrow.save();

    const book = await Book.findById(borrow.book);

    book.availableCopies += 1;

    await book.save();

    res.status(200).json({
      message: "Book returned successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const requestReturnBook = async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id);

    if (!borrow) {
      return res.status(404).json({
        message: "Borrow record not found",
      });
    }

    borrow.returnRequested = true;

    await borrow.save();

    res.status(200).json({
      message: "Return request sent",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const approveReturnBook = async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id).populate("book");

    if (!borrow) {
      return res.status(404).json({
        message: "Borrow record not found",
      });
    }

    borrow.returned = true;

    borrow.returnRequested = false;

    await borrow.save();

    borrow.book.availableCopies += 1;

    await borrow.book.save();

    res.status(200).json({
      message: "Return approved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getReturnRequests = async (req, res) => {
  try {
    const borrows = await Borrow.find({
      returnRequested: true,
    })

      .populate("user", "name email")

      .populate("book", "title author");

    res.status(200).json(borrows);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRecentActivities = async (req, res) => {
  try {
    const activities = await Borrow.find()

      .populate("user", "name")

      .populate("book", "title category")

      .sort({
        createdAt: -1,
      })

      .limit(5);

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMonthlyBorrowStats = async (req, res) => {
  try {
    const stats = await Borrow.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },

          books: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedStats = stats.map((item) => ({
      month: monthNames[item._id.month - 1],

      books: item.books,
    }));

    res.status(200).json(formattedStats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getBorrowedBooks,
  requestReturnBook,
  approveReturnBook,
  getReturnRequests,
  getRecentActivities,
  getMonthlyBorrowStats,
};
