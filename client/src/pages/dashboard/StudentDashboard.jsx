import DashboardLayout from "../../layouts/DashboardLayout";

import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";

import { fetchBorrowedBooks } from "../../features/borrowSlice";

function StudentDashboard() {
  const { darkMode } = useSelector((state) => state.theme);

  const dispatch =
  useDispatch()

const {
  borrowedBooks,
} = useSelector(
  (state) => state.borrow
)

useEffect(() => {

  dispatch(
    fetchBorrowedBooks()
  )

}, [dispatch])

const activeBooks =
  borrowedBooks.filter(
    (book) =>
      !book.returned
  )

const pendingReturns =
  borrowedBooks.filter(
    (book) =>
      book.returnRequested
  )

const returnedBooks =
  borrowedBooks.filter(
    (book) =>
      book.returned
  )

const totalFine =
  borrowedBooks.reduce(

    (total, book) =>

      total + book.fine,

    0
  )

  return (
    <DashboardLayout>
      <div className="max-w-8xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Student Dashboard</h1>

          <p className={darkMode ? "text-zinc-400 mt-2" : "text-gray-600 mt-2"}>
            Manage your borrowed books and requests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div
            className={
              darkMode
                ? "bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
                : "bg-white border border-gray-200 rounded-3xl p-6 shadow-lg"
            }
          >
            <h2 className="text-lg font-semibold">Borrowed Books</h2>

            <p className="text-5xl font-bold mt-6 text-blue-500">{activeBooks.length}</p>
          </div>

          <div
            className={
              darkMode
                ? "bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
                : "bg-white border border-gray-200 rounded-3xl p-6 shadow-lg"
            }
          >
            <h2 className="text-lg font-semibold">Pending Requests</h2>

            <p className="text-5xl font-bold mt-6 text-yellow-500">{pendingReturns.length}</p>
                        
          </div>

          <div
            className={
              darkMode
                ? "bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
                : "bg-white border border-gray-200 rounded-3xl p-6 shadow-lg"
            }
          >
            <h2 className="text-lg font-semibold">Returned Books</h2>

            <p className="text-5xl font-bold mt-6 text-green-500">{returnedBooks.length}</p>
          </div>

          <div
            className={
              darkMode
                ? "bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
                : "bg-white border border-gray-200 rounded-3xl p-6 shadow-lg"
            }
          >
            <h2 className="text-lg font-semibold">Total Fine</h2>

            <p className="text-5xl font-bold mt-6 text-red-500">₹{totalFine}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;
