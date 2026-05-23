const Book = require("../models/Book");

const Borrow = require("../models/Borrow");

const getDashboardStats = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments({
      $or: [
        {
          isDeleted: false,
        },

        {
          isDeleted: {
            $exists: false,
          },
        },
      ],
    });

    const totalBorrowedBooks = await Borrow.countDocuments({
      returned: false,
    });

    const returnedBooks = await Borrow.countDocuments({
      returned: true,
    });

    const books = await Book.find();

    const availableBooks = await Book.countDocuments({
      availableCopies: {
        $gt: 0,
      },

      $or: [
        {
          isDeleted: false,
        },

        {
          isDeleted: {
            $exists: false,
          },
        },
      ],
    });

    res.status(200).json({
      totalBooks,
      totalBorrowedBooks,
      availableBooks,
      returnedBooks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
