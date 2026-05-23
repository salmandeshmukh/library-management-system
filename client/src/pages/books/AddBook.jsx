import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import { addBook } from "../../features/bookSlice";

import { useNavigate } from "react-router-dom";

function AddBook() {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.books);

  const { darkMode } = useSelector((state) => state.theme);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",

    subtitle: "",

    authors: "",

    category: "",

    description: "",

    isbn: "",

    publisher: "",

    language: "",

    publishedYear: "",

    pages: "",

    totalCopies: "",

    availableCopies: "",

    shelfNumber: "",

    rackNumber: "",

    accessionNumber: "",

    finePerDay: "",

    borrowDurationDays: 7,

    featured: false,

    coverImage: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "coverImage") {
      setFormData({
        ...formData,

        coverImage: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,

        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookFormData = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "authors") {
        bookFormData.append(
          key,

          JSON.stringify(
            formData.authors

              .split(",")

              .map((author) => author.trim()),
          ),
        );
      } else {
        bookFormData.append(key, formData[key]);
      }
    });

    await dispatch(addBook(bookFormData));

    navigate("/books");
  };

  return (
    <DashboardLayout>
      <div className="max-w-8xl mx-auto">
        <div className="mb-10">
          <h1
            className={
              darkMode
                ? "text-4xl font-bold text-white"
                : "text-4xl font-bold text-black"
            }
          >
            Add New Book
          </h1>

          <p className={darkMode ? "text-zinc-400 mt-2" : "text-gray-600 mt-2"}>
            Manage your library inventory efficiently
          </p>
        </div>

        <div
          className={
            darkMode
              ? "bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 shadow-xl"
              : "bg-white border border-gray-300 rounded-2xl p-8 shadow-md"
          }
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* BASIC INFORMATION */}

              <div
                className={
                  darkMode
                    ? "bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
                    : "bg-white border border-gray-200 rounded-3xl p-6 shadow-lg"
                }
              >
                <h2 className="text-2xl font-semibold mb-6">
                  Basic Information
                </h2>

                <div className="space-y-5">
                  <div>
                    <label
                      className={
                        darkMode
                          ? "text-sm text-zinc-400"
                          : "text-sm text-gray-700"
                      }
                    >
                      Book Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      placeholder="Enter book title"
                      value={formData.title}
                      onChange={handleChange}
                      className={
                        darkMode
                          ? "w-full mt-2 p-4 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none transition"
                          : "w-full mt-2 p-4 rounded-xl bg-gray-100 border border-gray-300 focus:border-blue-500 outline-none transition"
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        darkMode
                          ? "text-sm text-zinc-400"
                          : "text-sm text-gray-700"
                      }
                    >
                      Subtitle
                    </label>

                    <input
                      type="text"
                      name="subtitle"
                      placeholder="Enter subtitle"
                      value={formData.subtitle}
                      onChange={handleChange}
                      className={
                        darkMode
                          ? "w-full mt-2 p-4 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none transition"
                          : "w-full mt-2 p-4 rounded-xl bg-gray-100 border border-gray-300 focus:border-blue-500 outline-none transition"
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        darkMode
                          ? "text-sm text-zinc-400"
                          : "text-sm text-gray-700"
                      }
                    >
                      Author Name
                    </label>

                    <input
                      type="text"
                      name="authors"
                      placeholder="Enter author name"
                      value={formData.authors}
                      onChange={handleChange}
                      className={
                        darkMode
                          ? "w-full mt-2 p-4 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none transition"
                          : "w-full mt-2 p-4 rounded-xl bg-gray-100 border border-gray-300 focus:border-blue-500 outline-none transition"
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        darkMode
                          ? "text-sm text-zinc-400"
                          : "text-sm text-gray-700"
                      }
                    >
                      Category
                    </label>

                    <input
                      type="text"
                      name="category"
                      placeholder="Enter category"
                      value={formData.category}
                      onChange={handleChange}
                      className={
                        darkMode
                          ? "w-full mt-2 p-4 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none transition"
                          : "w-full mt-2 p-4 rounded-xl bg-gray-100 border border-gray-300 focus:border-blue-500 outline-none transition"
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        darkMode
                          ? "text-sm text-zinc-400"
                          : "text-sm text-gray-700"
                      }
                    >
                      Description
                    </label>

                    <textarea
                      name="description"
                      rows={5}
                      placeholder="Enter book description"
                      value={formData.description}
                      onChange={handleChange}
                      className={
                        darkMode
                          ? "w-full mt-2 p-4 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-blue-500 outline-none transition"
                          : "w-full mt-2 p-4 rounded-xl bg-gray-100 border border-gray-300 focus:border-blue-500 outline-none transition"
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        darkMode
                          ? "text-sm text-zinc-400"
                          : "text-sm text-gray-700"
                      }
                    >
                      Book Cover
                    </label>

                    <input
                      type="file"
                      name="coverImage"
                      accept="image/*"
                      onChange={handleChange}
                      className={
                        darkMode
                          ? "w-full mt-2 p-4 rounded-xl bg-zinc-800 border border-zinc-700"
                          : "w-full mt-2 p-4 rounded-xl bg-gray-100 border border-gray-300"
                      }
                    />
                  </div>
                </div>
              </div>

              {/* PUBLISHING + INVENTORY */}

              <div
                className={
                  darkMode
                    ? "bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
                    : "bg-white border border-gray-200 rounded-3xl p-6 shadow-lg"
                }
              >
                <h2 className="text-2xl font-semibold mb-6">
                  Publishing & Inventory
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      className={
                        darkMode
                          ? "text-sm text-zinc-400"
                          : "text-sm text-gray-700"
                      }
                    >
                      ISBN
                    </label>

                    <input
                      type="text"
                      name="isbn"
                      placeholder="ISBN Number"
                      value={formData.isbn}
                      onChange={handleChange}
                      className={
                        darkMode
                          ? "w-full mt-2 p-4 rounded-xl bg-zinc-800 border border-zinc-700"
                          : "w-full mt-2 p-4 rounded-xl bg-gray-100 border border-gray-300"
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        darkMode
                          ? "text-sm text-zinc-400"
                          : "text-sm text-gray-700"
                      }
                    >
                      Publisher
                    </label>

                    <input
                      type="text"
                      name="publisher"
                      placeholder="Publisher"
                      value={formData.publisher}
                      onChange={handleChange}
                      className={
                        darkMode
                          ? "w-full mt-2 p-4 rounded-xl bg-zinc-800 border border-zinc-700"
                          : "w-full mt-2 p-4 rounded-xl bg-gray-100 border border-gray-300"
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        darkMode
                          ? "text-sm text-zinc-400"
                          : "text-sm text-gray-700"
                      }
                    >
                      Language
                    </label>

                    <input
                      type="text"
                      name="language"
                      placeholder="Language"
                      value={formData.language}
                      onChange={handleChange}
                      className={
                        darkMode
                          ? "w-full mt-2 p-4 rounded-xl bg-zinc-800 border border-zinc-700"
                          : "w-full mt-2 p-4 rounded-xl bg-gray-100 border border-gray-300"
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        darkMode
                          ? "text-sm text-zinc-400"
                          : "text-sm text-gray-700"
                      }
                    >
                      Published Year
                    </label>

                    <input
                      type="number"
                      name="publishedYear"
                      placeholder="2025"
                      value={formData.publishedYear}
                      onChange={handleChange}
                      className={
                        darkMode
                          ? "w-full mt-2 p-4 rounded-xl bg-zinc-800 border border-zinc-700"
                          : "w-full mt-2 p-4 rounded-xl bg-gray-100 border border-gray-300"
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        darkMode
                          ? "text-sm text-zinc-400"
                          : "text-sm text-gray-700"
                      }
                    >
                      Pages
                    </label>

                    <input
                      type="number"
                      name="pages"
                      placeholder="Pages"
                      value={formData.pages}
                      onChange={handleChange}
                      className={
                        darkMode
                          ? "w-full mt-2 p-4 rounded-xl bg-zinc-800 border border-zinc-700"
                          : "w-full mt-2 p-4 rounded-xl bg-gray-100 border border-gray-300"
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        darkMode
                          ? "text-sm text-zinc-400"
                          : "text-sm text-gray-700"
                      }
                    >
                      Total Copies
                    </label>

                    <input
                      type="number"
                      name="totalCopies"
                      placeholder="Total copies"
                      value={formData.totalCopies}
                      onChange={handleChange}
                      className={
                        darkMode
                          ? "w-full mt-2 p-4 rounded-xl bg-zinc-800 border border-zinc-700"
                          : "w-full mt-2 p-4 rounded-xl bg-gray-100 border border-gray-300"
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        darkMode
                          ? "text-sm text-zinc-400"
                          : "text-sm text-gray-700"
                      }
                    >
                      Borrow Duration (Days)
                    </label>

                    <input
                      type="number"
                      name="borrowDurationDays"
                      placeholder="7 Days"
                      value={formData.borrowDurationDays}
                      onChange={handleChange}
                      className={
                        darkMode
                          ? "w-full mt-2 p-4 rounded-xl bg-zinc-800 border border-zinc-700"
                          : "w-full mt-2 p-4 rounded-xl bg-gray-100 border border-gray-300"
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        darkMode
                          ? "text-sm text-zinc-400"
                          : "text-sm text-gray-700"
                      }
                    >
                      Shelf Number
                    </label>

                    <input
                      type="text"
                      name="shelfNumber"
                      placeholder="Shelf Number"
                      value={formData.shelfNumber}
                      onChange={handleChange}
                      className={
                        darkMode
                          ? "w-full mt-2 p-4 rounded-xl bg-zinc-800 border border-zinc-700"
                          : "w-full mt-2 p-4 rounded-xl bg-gray-100 border border-gray-300"
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        darkMode
                          ? "text-sm text-zinc-400"
                          : "text-sm text-gray-700"
                      }
                    >
                      Rack Number
                    </label>

                    <input
                      type="text"
                      name="rackNumber"
                      placeholder="Rack Number"
                      value={formData.rackNumber}
                      onChange={handleChange}
                      className={
                        darkMode
                          ? "w-full mt-2 p-4 rounded-xl bg-zinc-800 border border-zinc-700"
                          : "w-full mt-2 p-4 rounded-xl bg-gray-100 border border-gray-300"
                      }
                    />
                  </div>

                  <div>
                    <label
                      className={
                        darkMode
                          ? "text-sm text-zinc-400"
                          : "text-sm text-gray-700"
                      }
                    >
                      Accession Number
                    </label>

                    <input
                      type="text"
                      name="accessionNumber"
                      placeholder="Accession Number"
                      value={formData.accessionNumber}
                      onChange={handleChange}
                      className={
                        darkMode
                          ? "w-full mt-2 p-4 rounded-xl bg-zinc-800 border border-zinc-700"
                          : "w-full mt-2 p-4 rounded-xl bg-gray-100 border border-gray-300"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              {error && <p className="text-red-500 mb-4">{error}</p>}

              {success && (
                <p className="text-green-500 mb-4">Book added successfully</p>
              )}

              <button
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition p-4 rounded-xl font-semibold text-lg cursor-pointer"
              >
                {loading ? "Adding Book..." : "Add Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddBook;
