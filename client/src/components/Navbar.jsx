import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { logout } from "../features/authSlice";

import { toggleTheme } from "../features/themeSlice";

function Navbar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { darkMode } = useSelector((state) => state.theme);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/");
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        LMS
      </h1>

      <div className="flex items-center gap-4">
        <p className="text-zinc-300">{user?.name}</p>

        <button
          onClick={handleThemeToggle}
          className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
