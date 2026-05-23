import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import { fetchBooks, deleteBook } from "../../features/bookSlice";

import {
  createRequest,
  fetchMyRequests,
} from "../../features/borrowRequestSlice";

import DataTable from "../../components/DataTable";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { LayoutGrid, List } from "lucide-react";

import formatAuthors from "../../utils/formatAuthors";

function Books() {
  const dispatch = useDispatch();

  const { books } = useSelector((state) => state.books);

  const { darkMode } = useSelector((state) => state.theme);

  const { loading: borrowLoading } = useSelector((state) => state.borrow);

  const { myRequests } = useSelector((state) => state.borrowRequest);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [language, setLanguage] = useState("");

  const [availability, setAvailability] = useState("");

  const [view, setView] = useState("table");

  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 6;

  useEffect(() => {
    dispatch(
      fetchBooks({
        search,
        category,
        language,
        availability,
      }),
    );

    dispatch(fetchMyRequests());
  }, [dispatch, search, category, language, availability]);

  const role = localStorage.getItem("role");

  const handleRequestBook = async (bookId) => {
    const result = await dispatch(createRequest(bookId));

    if (result.meta.requestStatus === "fulfilled") {
      dispatch(fetchMyRequests());

      toast.success("Request sent to admin");
    } else {
      toast.error(result.payload);
    }
  };

  const indexOfLastBook = currentPage * booksPerPage;

  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const handleDeleteBook = async (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?",
    );

    if (!confirmDelete) return;

    const result = await dispatch(deleteBook(bookId));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Book deleted successfully");

      dispatch(fetchBooks());
    } else {
      toast.error(result.payload);
    }
  };

  const columns = [
    {
      accessorKey: "title",

      header: "Book",

      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <Link
            to={`/books/${row.original._id}`}
            className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 block"
          >
            {row.original.coverImage ? (
              <img
                src={row.original.coverImage}
                alt={row.original.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xl font-bold">
                {row.original.title?.charAt(0)}
              </div>
            )}
          </Link>

          <div>
            <Link
              to={`/books/${row.original._id}`}
              className="font-semibold hover:text-blue-400 transition"
            >
              {row.original.title}
            </Link>

            <p
              className={
                darkMode
                  ? "text-zinc-500 text-sm mt-1"
                  : "text-gray-500 text-sm mt-1"
              }
            >
              {row.original.subtitle}
            </p>
          </div>
        </div>
      ),
    },

    {
      header: "Authors",

      cell: ({ row }) => {
        const authors = row.original.authors;

        let formattedAuthors = row.original.author || "-";

        if (Array.isArray(authors)) {
          if (
            authors.length === 1 &&
            typeof authors[0] === "string" &&
            authors[0].startsWith("[")
          ) {
            formattedAuthors = JSON.parse(authors[0]).join(", ");
          } else {
            formattedAuthors = authors.join(", ");
          }
        }

        return <div className="max-w-[220px]">{formattedAuthors}</div>;
      },
    },

    {
      accessorKey: "category",

      header: "Category",

      cell: ({ row }) => (
        <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
          {row.original.category}
        </span>
      ),
    },

    {
      header: "Language",

      cell: ({ row }) => <span>{row.original.language || "-"}</span>,
    },

    {
      accessorKey: "availableCopies",

      header: "Available",

      cell: ({ row }) => (
        <span
          className={
            row.original.availableCopies > 0
              ? "text-green-500 font-semibold"
              : "text-red-500 font-semibold"
          }
        >
          {row.original.availableCopies}
        </span>
      ),
    },

    {
      header: "Fine / Day",

      cell: ({ row }) => (
        <span className="text-orange-400 font-medium">
          ₹{row.original.finePerDay || 0}
        </span>
      ),
    },

    {
      header: "Action",

      cell: ({ row }) => {
        if (role === "admin") {
          return (
            <div className="flex items-center gap-3">
              <Link
                to={`/edit-book/${row.original._id}`}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 transition px-4 py-2 rounded-xl text-white"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDeleteBook(row.original._id)}
                className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl text-white"
              >
                Delete
              </button>
            </div>
          );
        }

        return myRequests.some(
          (request) => request.book === row.original._id,
        ) ? (
          <button
            disabled
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg"
          >
            Request Pending
          </button>
        ) : (
          <button
            onClick={() => handleRequestBook(row.original._id)}
            disabled={row.original.availableCopies < 1 || borrowLoading}
            className={
              row.original.availableCopies < 1
                ? "bg-gray-500 cursor-not-allowed px-4 py-2 rounded-lg"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition px-4 py-2 rounded-lg cursor-pointer"
            }
          >
            {row.original.availableCopies < 1
              ? "Unavailable"
              : borrowLoading
                ? "Sending..."
                : "Request Book"}
          </button>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Library Books</h1>

            <p
              className={darkMode ? "text-zinc-400 mt-2" : "text-gray-600 mt-2"}
            >
              Explore and manage books
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView("table")}
              className={
                view === "table"
                  ? "bg-blue-600 text-white p-3 rounded-xl"
                  : darkMode
                    ? "bg-zinc-800 p-3 rounded-xl"
                    : "bg-gray-100 p-3 rounded-xl"
              }
            >
              <List size={20} />
            </button>

            <button
              onClick={() => setView("grid")}
              className={
                view === "grid"
                  ? "bg-purple-600 text-white p-3 rounded-xl"
                  : darkMode
                    ? "bg-zinc-800 p-3 rounded-xl"
                    : "bg-gray-100 p-3 rounded-xl"
              }
            >
              <LayoutGrid size={20} />
            </button>
          </div>
        </div>

        <div
          className={
            darkMode
              ? "bg-zinc-900 border border-zinc-800 rounded-3xl p-5 mb-8"
              : "bg-white border border-gray-200 rounded-3xl p-5 shadow-lg mb-8"
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {/* SEARCH */}

            <input
              type="text"
              placeholder="Search by title, author or ISBN"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={
                darkMode
                  ? "w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
                  : "w-full p-4 rounded-2xl bg-gray-100 border border-gray-300 outline-none focus:border-blue-500"
              }
            />

            {/* CATEGORY */}

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={
                darkMode
                  ? "w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 outline-none"
                  : "w-full p-4 rounded-2xl bg-gray-100 border border-gray-300 outline-none"
              }
            >
              <option value="">All Categories</option>

              <option value="Self Help">Self Help</option>

              <option value="Programming">Programming</option>

              <option value="Finance">Finance</option>

              <option value="Business">Business</option>
            </select>

            {/* LANGUAGE */}

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={
                darkMode
                  ? "w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 outline-none"
                  : "w-full p-4 rounded-2xl bg-gray-100 border border-gray-300 outline-none"
              }
            >
              <option value="">All Languages</option>

              <option value="English">English</option>

              <option value="Hindi">Hindi</option>
            </select>

            {/* AVAILABILITY */}

            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className={
                darkMode
                  ? "w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 outline-none"
                  : "w-full p-4 rounded-2xl bg-gray-100 border border-gray-300 outline-none"
              }
            >
              <option value="">All Books</option>

              <option value="available">Available Only</option>
            </select>
          </div>
        </div>

        <div
          className={
            darkMode
              ? "bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden p-5"
              : "bg-white border border-gray-300 rounded-2xl overflow-hidden shadow-sm p-5"
          }
        >
          <div className="overflow-x-auto">
            {view === "table" ? (
              <div
                className={
                  darkMode
                    ? "bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden p-5"
                    : "bg-white border border-gray-300 rounded-2xl overflow-hidden shadow-sm p-5"
                }
              >
                <div className="overflow-x-auto">
                  <DataTable
                    columns={columns}
                    data={currentBooks}
                    darkMode={darkMode}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentBooks.map((book) => (
                  <div
                    key={book._id}
                    className={
                      darkMode
                        ? "bg-zinc-900 border border-zinc-800 rounded-3xl p-5"
                        : "bg-white border border-gray-200 rounded-3xl p-5 shadow-lg"
                    }
                  >
                    <Link
                      to={`/books/${book._id}`}
                      className="h-56 rounded-2xl overflow-hidden block"
                    >
                      {book.coverImage ? (
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-6xl font-bold">
                          {book.title.charAt(0)}
                        </div>
                      )}
                    </Link>
                    <div className="mt-5">
                      <Link
                        to={`/books/${book._id}`}
                        className="hover:text-blue-400 transition"
                      >
                        <h2 className="text-2xl font-semibold">{book.title}</h2>
                      </Link>
                      <p
                        className={
                          darkMode ? "text-zinc-400 mt-2" : "text-gray-500 mt-2"
                        }
                      >
                        {formatAuthors(book.authors, book.author)}
                      </p>

                      <div className="flex items-center justify-between mt-5">
                        <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                          {book.category}
                        </span>

                        <span
                          className={
                            book.availableCopies > 0
                              ? "text-green-400"
                              : "text-red-400"
                          }
                        >
                          {book.availableCopies > 0
                            ? "Available"
                            : "Unavailable"}
                        </span>
                      </div>
                      {role === "student" && (
                        <div className="mt-6">
                          {myRequests.some(
                            (request) => request.book === book._id,
                          ) ? (
                            <button
                              disabled
                              className="w-full bg-yellow-500 text-black py-3 rounded-2xl cursor-not-allowed"
                            >
                              Request Pending
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRequestBook(book._id)}
                              disabled={book.availableCopies < 1}
                              className={
                                book.availableCopies < 1
                                  ? "w-full bg-gray-500 py-3 rounded-2xl cursor-not-allowed"
                                  : "w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition py-3 rounded-2xl cursor-pointer"
                              }
                            >
                              {book.availableCopies < 1
                                ? "Unavailable"
                                : borrowLoading
                                  ? "Sending..."
                                  : "Request Book"}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-8">
            <p
              className={
                darkMode ? "text-zinc-400 text-sm" : "text-gray-500 text-sm"
              }
            >
              Page {currentPage} of {totalPages}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={
                  darkMode
                    ? "bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 px-5 py-2 rounded-xl disabled:opacity-40 transition"
                    : "bg-white border border-gray-300 hover:bg-gray-100 px-5 py-2 rounded-xl disabled:opacity-40 transition"
                }
              >
                Previous
              </button>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={
                  darkMode
                    ? "bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 px-5 py-2 rounded-xl disabled:opacity-40 transition"
                    : "bg-white border border-gray-300 hover:bg-gray-100 px-5 py-2 rounded-xl disabled:opacity-40 transition"
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Books;
