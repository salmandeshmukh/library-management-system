import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/dashboard/Dashboard";

import AddBook from "./pages/books/AddBook";

import PrivateRoute from "./routes/PrivateRoute";

import Books from "./pages/books/Books";
import MyBooks from "./pages/borrow/MyBooks";

import BorrowRequests from "./pages/dashboard/BorrowRequests";

import ReturnRequests from "./pages/dashboard/ReturnRequests";

import AdminRoute from "./components/AdminRoute";

import BookDetails from "./pages/books/BookDetails";
import EditBook from "./pages/dashboard/EditBook";

function App() {
  const { darkMode } = useSelector((state) => state.theme);

  return (
    <BrowserRouter>
      <div
        className={
          darkMode
            ? "bg-[#0f0f11] text-white min-h-screen"
            : "bg-gray-100 text-black min-h-screen"
        }
      >
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/add-book"
            element={
              <AdminRoute>
                <AddBook />
              </AdminRoute>
            }
          />

          <Route
            path="/books"
            element={
              <PrivateRoute>
                <Books />
              </PrivateRoute>
            }
          />

          <Route
            path="/books/:id"
            element={
              <PrivateRoute>
                <BookDetails />
              </PrivateRoute>
            }
          />

          <Route path="/edit-book/:id" element={<AdminRoute><EditBook /></AdminRoute>} />

          <Route
            path="/my-books"
            element={
              <PrivateRoute>
                <MyBooks />
              </PrivateRoute>
            }
          />

          <Route
            path="/borrow-requests"
            element={
              <AdminRoute>
                <BorrowRequests />
              </AdminRoute>
            }
          />

          <Route
            path="/return-requests"
            element={
              <AdminRoute>
                <ReturnRequests />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
