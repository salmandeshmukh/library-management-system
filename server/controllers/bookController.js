const Book = require("../models/Book");

const Borrow = require("../models/Borrow");

const cloudinary = require("../config/cloudinary");

const addBook = async (req, res) => {
  try {
    if (req.body.authors) {
      req.body.authors = JSON.parse(req.body.authors);
    }
    const bookData = {
      ...req.body,

      availableCopies: req.body.totalCopies,
    };

    let imageUrl = "";

    if (req.file) {
      const base64 = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;

      const uploadResult = await cloudinary.uploader.upload(
        base64,

        {
          folder: "library-books",
        },
      );

      imageUrl = uploadResult.secure_url;

      bookData.coverImage = imageUrl;
    }

    const book = await Book.create(bookData);

    res.status(201).json({
      message: "Book added successfully",

      book,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBooks = async (req, res) => {
  try {
    const { search, category, language, availability } = req.query;

    let query = {
      $and: [
        {
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
        },
      ],
    };

    if (search) {
      query.$and.push({
        $or: [
          {
            title: {
              $regex: search,
              $options: "i",
            },
          },

          {
            authors: {
              $elemMatch: {
                $regex: search,
                $options: "i",
              },
            },
          },

          {
            author: {
              $regex: search,
              $options: "i",
            },
          },

          {
            isbn: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      });
    }

    if (category) {
      query.category = category;
    }

    if (language) {
      query.language = language;
    }

    if (availability === "available") {
      query.availableCopies = {
        $gt: 0,
      };
    }

    const books = await Book.find(query)

      .sort({
        createdAt: -1,
      });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,

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

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    let imageUrl = book.coverImage;

    if (req.file) {
      const base64 = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;

      const uploadResult = await cloudinary.uploader.upload(
        base64,

        {
          folder: "library-books",
        },
      );

      imageUrl = uploadResult.secure_url;
    }

    const borrowedCopies = book.totalCopies - book.availableCopies;

    const newTotalCopies = Number(req.body.totalCopies);

    const newAvailableCopies = newTotalCopies - borrowedCopies;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,

      {
        ...req.body,

        availableCopies: newAvailableCopies,

        coverImage: imageUrl,
      },

      {
        new: true,
      },
    );

    res.status(200).json({
      message: "Book updated successfully",

      book: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const activeBorrow = await Borrow.findOne({
      book: req.params.id,

      returned: false,
    });

    if (activeBorrow) {
      return res.status(400).json({
        message: "Book is currently borrowed and cannot be deleted",
      });
    }

    book.isDeleted = true;

    await book.save();

    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
