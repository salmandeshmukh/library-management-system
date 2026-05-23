import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import formatAuthors from "../../utils/formatAuthors";

import API from "../../services/api";

function BookDetails() {
  const { id } = useParams();

  const { darkMode } = useSelector((state) => state.theme);

  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    const response = await API.get(`/books/${id}`);

    setBook(response.data);
  };

  if (!book) {
    return (
      <DashboardLayout>
        <div className="p-10">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div
          className={
            darkMode
              ? "bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
              : "bg-white border border-gray-200 rounded-3xl p-8 shadow-lg"
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div>
              <div className="rounded-3xl overflow-hidden">
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-[500px] object-cover"
                  />
                ) : (
                  <div className="h-[500px] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-8xl font-bold">
                    {book.title.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h1 className="text-5xl font-bold">{book.title}</h1>

                  {book.subtitle && (
                    <p className="text-zinc-400 mt-3 text-lg">
                      {book.subtitle}
                    </p>
                  )}
                </div>

                <span className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-xl text-sm">
                  {book.category}
                </span>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-zinc-500 text-sm">Authors</p>

                  <p className="mt-2 text-lg font-medium">
                    {formatAuthors(book.authors, book.author)}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm">Publisher</p>

                  <p className="mt-2 text-lg font-medium">
                    {book.publisher || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm">ISBN</p>

                  <p className="mt-2 text-lg font-medium">{book.isbn || "-"}</p>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm">Language</p>

                  <p className="mt-2 text-lg font-medium">
                    {book.language || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm">Published Year</p>

                  <p className="mt-2 text-lg font-medium">
                    {book.publishedYear || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm">Pages</p>

                  <p className="mt-2 text-lg font-medium">
                    {book.pages || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm">Available Copies</p>

                  <p className="mt-2 text-lg font-medium text-green-400">
                    {book.availableCopies}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm">Fine Per Day</p>

                  <p className="mt-2 text-lg font-medium text-orange-400">
                    ₹{book.finePerDay}
                  </p>
                </div>
              </div>

              {book.description && (
                <div className="mt-10">
                  <h2 className="text-2xl font-semibold mb-4">Description</h2>

                  <p className="text-zinc-400 leading-8">{book.description}</p>
                </div>
              )}

              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">
                  Library Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-zinc-500 text-sm">Shelf Number</p>

                    <p className="mt-2 text-lg font-medium">
                      {book.shelfNumber || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-zinc-500 text-sm">Rack Number</p>

                    <p className="mt-2 text-lg font-medium">
                      {book.rackNumber || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-zinc-500 text-sm">Accession Number</p>

                    <p className="mt-2 text-lg font-medium">
                      {book.accessionNumber || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-zinc-500 text-sm">Borrow Duration</p>

                    <p className="mt-2 text-lg font-medium text-blue-400">
                      {book.borrowDurationDays || 7} Days
                    </p>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default BookDetails;
