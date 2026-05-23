const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    authors: [
      {
        type: String,
      },
    ],

    category: {
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
    },

    description: {
      type: String,
    },

    coverImage: {
      type: String,
    },

    isbn: {
      type: String,
    },

    publisher: {
      type: String,
    },

    language: {
      type: String,
    },

    publishedYear: {
      type: Number,
    },

    pages: {
      type: Number,
    },

    shelfNumber: {
      type: String,
    },

    rackNumber: {
      type: String,
    },

    accessionNumber: {
      type: String,
    },

    finePerDay: {
      type: Number,

      default: 10,
    },

    borrowDurationDays: {
      type: Number,

      default: 7,
    },

    featured: {
      type: Boolean,

      default: false,
    },

    totalCopies: {
      type: Number,
      required: true,
    },

    availableCopies: {
      type: Number,
      required: true,
    },

    isDeleted: {
      type: Boolean,

      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Book", bookSchema);
