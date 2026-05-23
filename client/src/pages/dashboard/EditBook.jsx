import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import API from "../../services/api";

function EditBook() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { darkMode } = useSelector((state) => state.theme);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",

    authors: "",

    category: "",

    subtitle: "",

    description: "",

    isbn: "",

    publisher: "",

    language: "",

    publishedYear: "",

    pages: "",

    shelfNumber: "",

    rackNumber: "",

    accessionNumber: "",

    borrowDurationDays: 7,

    totalCopies: "",

    finePerDay: "",

    coverImage: null,
  });

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await API.get(`/books/${id}`);

      const book = response.data;

      setFormData({
        ...book,

        authors:
          Array.isArray(book.authors) &&
          book.authors.length > 0 &&
          book.authors[0] !== '[""]' &&
          book.authors[0] !== ""
            ? book.authors[0]?.startsWith("[")
              ? JSON.parse(book.authors[0]).join(", ")
              : book.authors.join(", ")
            : book.author || "",

        publishedYear: book.publishedYear || "",

        pages: book.pages || "",

        finePerDay: book.finePerDay || "",

        totalCopies: book.totalCopies || "",

        borrowDurationDays: book.borrowDurationDays || 7,
      });
    } catch (error) {
      toast.error("Failed to fetch book");
    }
  };

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

    try {
      setLoading(true);

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

      await API.put(
        `/books/${id}`,

        bookFormData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Book updated successfully");

      navigate("/books");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Edit Book</h1>

          <p className={darkMode ? "text-zinc-400 mt-2" : "text-gray-600 mt-2"}>
            Update book details
          </p>
        </div>

        {formData.coverImage && typeof formData.coverImage === "string" && (
          <div className="mb-8">
            <p
              className={darkMode ? "text-zinc-400 mb-3" : "text-gray-600 mb-3"}
            >
              Current Cover
            </p>

            <img
              src={formData.coverImage}
              alt="Book Cover"
              className="w-52 h-72 object-cover rounded-3xl border border-zinc-700"
            />
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={formData.title}
            onChange={handleChange}
            className="p-4 rounded-xl border"
          />

          <input
            type="text"
            name="authors"
            placeholder="Authors"
            value={formData.authors}
            onChange={handleChange}
            className="p-4 rounded-xl border"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="p-4 rounded-xl border"
          />

          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            value={formData.isbn}
            onChange={handleChange}
            className="p-4 rounded-xl border"
          />

          <input
            type="number"
            name="totalCopies"
            placeholder="Total Copies"
            value={formData.totalCopies}
            onChange={handleChange}
            className="p-4 rounded-xl border"
          />

          <input
            type="text"
            name="shelfNumber"
            placeholder="Shelf Number"
            value={formData.shelfNumber}
            onChange={handleChange}
            className="p-4 rounded-xl border"
          />

          <input
            type="text"
            name="rackNumber"
            placeholder="Rack Number"
            value={formData.rackNumber}
            onChange={handleChange}
            className="p-4 rounded-xl border"
          />

          <input
            type="text"
            name="accessionNumber"
            placeholder="Accession Number"
            value={formData.accessionNumber}
            onChange={handleChange}
            className="p-4 rounded-xl border"
          />

          <input
            type="number"
            name="borrowDurationDays"
            placeholder="Borrow Duration (Days)"
            value={formData.borrowDurationDays}
            onChange={handleChange}
            className="p-4 rounded-xl border"
          />

          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleChange}
            className="p-4 rounded-xl border"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="p-4 rounded-xl border md:col-span-2"
            rows={5}
          />

          <button
            disabled={loading}
            className="md:col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-xl font-semibold"
          >
            {loading ? "Updating..." : "Update Book"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default EditBook;
