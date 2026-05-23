import { useEffect, useState, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  fetchBorrowedBooks,
  requestReturnBook,
} from "../../features/borrowSlice";

import formatAuthors from "../../utils/formatAuthors";

import DataTable from "../../components/DataTable";
import { Link } from "react-router-dom";

function MyBooks() {
  const dispatch = useDispatch();

  const { borrowedBooks } = useSelector((state) => state.borrow);

  const { darkMode } = useSelector((state) => state.theme);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchBorrowedBooks());
  }, [dispatch]);

  const handleRequestReturn = async (borrowId) => {
    await dispatch(requestReturnBook(borrowId));

    dispatch(fetchBorrowedBooks());
  };

  const filteredBooks = useMemo(() => {
    return borrowedBooks.filter((item) => {
      const title = item.book?.title?.toLowerCase() || "";

      const authors =
        item.book?.authors?.join(" ")?.toLowerCase() ||
        item.book?.author?.toLowerCase() ||
        "";

      const category = item.book?.category?.toLowerCase() || "";

      const query = search.toLowerCase();

      return (
        title.includes(query) ||
        authors.includes(query) ||
        category.includes(query)
      );
    });
  }, [borrowedBooks, search]);

  const columns = [
    {
      header: "Book",

      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          {row.original.book?.isDeleted ? (
            <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 opacity-50">
              {row.original.book?.coverImage ? (
                <img
                  src={row.original.book?.coverImage}
                  alt={row.original.book?.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xl font-bold">
                  {row.original.book?.title?.charAt(0)}
                </div>
              )}
            </div>
          ) : (
            <Link
              to={`/books/${row.original.book?._id}`}
              className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 block"
            >
              {row.original.book?.coverImage ? (
                <img
                  src={row.original.book?.coverImage}
                  alt={row.original.book?.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xl font-bold">
                  {row.original.book?.title?.charAt(0)}
                </div>
              )}
            </Link>
          )}

          <div>
            {row.original.book?.isDeleted ? (
              <p className="font-semibold text-red-400">Book Removed</p>
            ) : (
              <Link
                to={`/books/${row.original.book?._id}`}
                className="font-semibold hover:text-blue-400 transition"
              >
                {row.original.book?.title || "Book Removed"}
              </Link>
            )}

            <p
              className={
                darkMode
                  ? "text-zinc-500 text-sm mt-1"
                  : "text-gray-500 text-sm mt-1"
              }
            >
              {row.original.book?.category || "-"}
            </p>
          </div>
        </div>
      ),
    },

    {
      header: "Author",

      cell: ({ row }) => (
        <span className={darkMode ? "text-zinc-400" : "text-gray-600"}>
          {formatAuthors(
            row.original.book?.authors,

            row.original.book?.author,
          )}
        </span>
      ),
    },

    {
      header: "Borrow Date",

      cell: ({ row }) => new Date(row.original.borrowDate).toLocaleDateString(),
    },

    {
      header: "Due Date",

      cell: ({ row }) => (
        <div>
          <p>{new Date(row.original.dueDate).toLocaleDateString()}</p>

          {row.original.isOverdue && (
            <p className="text-red-400 text-xs mt-1">
              {row.original.lateDays} days late
            </p>
          )}
        </div>
      ),
    },

    {
      header: "Fine",

      cell: ({ row }) =>
        row.original.isOverdue ? (
          <div>
            <p className="text-red-500 font-semibold">₹{row.original.fine}</p>

            <p className="text-xs text-red-400 mt-1">Late Fine</p>
          </div>
        ) : (
          <span className="text-green-500">No Fine</span>
        ),
    },

    {
      header: "Status",

      cell: ({ row }) => (
        <span
          className={
            row.original.returned
              ? "bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm"
              : row.original.isOverdue
                ? "bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm"
                : "bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm"
          }
        >
          {row.original.returned
            ? "Returned"
            : row.original.isOverdue
              ? "Overdue"
              : "Borrowed"}
        </span>
      ),
    },

    {
      header: "Action",

      cell: ({ row }) =>
        !row.original.returned &&
        (row.original.returnRequested ? (
          <span className="bg-yellow-500/20 text-yellow-400 px-3 py-2 rounded-xl text-sm">
            Return Pending
          </span>
        ) : (
          <button
            onClick={() => handleRequestReturn(row.original._id)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 transition px-4 py-2 rounded-xl"
          >
            Request Return
          </button>
        )),
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-8xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">My Borrowed Books</h1>

          <p className={darkMode ? "text-zinc-400 mt-2" : "text-gray-600 mt-2"}>
            Track borrowed books, overdue status and fines
          </p>
        </div>

        <div
          className={
            darkMode
              ? "bg-zinc-900 border border-zinc-800 rounded-3xl p-5 mb-8"
              : "bg-white border border-gray-200 rounded-3xl p-5 shadow-lg mb-8"
          }
        >
          <input
            type="text"
            placeholder="Search borrowed books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={
              darkMode
                ? "w-full p-4 rounded-2xl bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500"
                : "w-full p-4 rounded-2xl bg-gray-100 border border-gray-300 outline-none focus:border-blue-500"
            }
          />
        </div>

        <DataTable columns={columns} data={filteredBooks} darkMode={darkMode} />
      </div>
    </DashboardLayout>
  );
}

export default MyBooks;
