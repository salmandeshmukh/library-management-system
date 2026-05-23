import {
  LayoutDashboard,
  BookOpen,
  PlusSquare,
  Library,
  LogOut,
  Sun,
  Moon,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../features/authSlice";

import { toggleTheme } from "../features/themeSlice";
import { useState } from "react";

function Sidebar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { darkMode } = useSelector((state) => state.theme);

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    dispatch(logout());

    navigate("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },

    {
      name: "Books",
      icon: BookOpen,
      path: "/books",
    },

    ...(role === "admin"
      ? [
          {
            name: "Add Book",
            icon: PlusSquare,
            path: "/add-book",
          },
        ]
      : []),

    ...(user?.role === "student"
      ? [
          {
            name: "My Books",

            icon: Library,

            path: "/my-books",
          },
        ]
      : []),
  ];

  const [openRequests, setOpenRequests] = useState(false);

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={
        darkMode
          ? `${
              collapsed ? "w-24" : "w-72"
            } min-h-screen bg-zinc-900 border-r border-zinc-800 p-5 flex flex-col transition-all duration-300`
          : `${
              collapsed ? "w-24" : "w-72"
            } min-h-screen bg-white border-r border-gray-300 p-5 shadow-sm flex flex-col transition-all duration-300`
      }
    >
      <div className="relative mb-10">
        <div
          className={
            collapsed
              ? "flex flex-col items-center pt-14"
              : "flex items-center gap-4"
          }
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-xl font-bold">
            {user?.name?.charAt(0)}
          </div>

          {!collapsed && (
            <div>
              <h2 className="font-semibold text-lg">{user?.name}</h2>

              <p
                className={
                  darkMode ? "text-zinc-400 text-sm" : "text-gray-500 text-sm"
                }
              >
                {user?.role === "admin" ? "Administrator" : "Student"}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={
            darkMode
              ? `absolute top-0 ${
                  collapsed ? "right-2.5" : "right-0"
                } bg-zinc-800 hover:bg-zinc-700 p-2 rounded-xl transition`
              : `absolute top-0 ${
                  collapsed ? "right-0" : "right-0"
                } bg-gray-100 hover:bg-gray-200 p-2 rounded-xl transition`
          }
        >
          {collapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>
      </div>

      <div className="space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? `flex items-center ${
                      collapsed ? "justify-center" : "gap-3"
                    } bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl`
                  : darkMode
                    ? `flex items-center ${
                        collapsed ? "justify-center" : "gap-3"
                      } hover:bg-zinc-800 p-4 rounded-xl transition`
                    : `flex items-center ${
                        collapsed ? "justify-center" : "gap-3"
                      } hover:bg-gray-100 p-4 rounded-xl transition`
              }
            >
              <Icon size={20} />

              <span>{!collapsed && <span>{item.name}</span>}</span>
            </NavLink>
          );
        })}
      </div>

      {user?.role === "admin" && (
        <div>
          <button
            onClick={() => setOpenRequests(!openRequests)}
            className={
              openRequests
                ? "w-full flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl transition-all duration-300 mt-3"
                : darkMode
                  ? "w-full flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white p-4 rounded-xl transition-all duration-300 mt-3"
                  : "w-full flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white p-4 rounded-xl transition-all duration-300 mt-3"
            }
          >
            <div className="flex items-center gap-3">
              <Library size={20} />

              {!collapsed && <span>Requests</span>}
            </div>

            <ChevronDown
              size={18}
              className={
                openRequests
                  ? "rotate-180 transition-transform duration-300"
                  : "transition-transform duration-300"
              }
            />
          </button>

          <div
            className={
              openRequests
                ? "max-h-40 opacity-100 overflow-hidden transition-all duration-300 ease-in-out"
                : "max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out"
            }
          >
            <div className="ml-4 mt-3 space-y-2">
              <NavLink
                to="/borrow-requests"
                className={({ isActive }) =>
                  isActive
                    ? `flex items-center ${
                        collapsed ? "justify-center" : "gap-3"
                      } bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl`
                    : darkMode
                      ? `flex items-center ${
                          collapsed ? "justify-center" : "gap-3"
                        } hover:bg-zinc-800 p-4 rounded-xl transition`
                      : `flex items-center ${
                          collapsed ? "justify-center" : "gap-3"
                        } hover:bg-gray-100 p-4 rounded-xl transition`
                }
              >
                Borrow Requests
              </NavLink>

              <NavLink
                to="/return-requests"
                className={({ isActive }) =>
                  isActive
                    ? `flex items-center ${
                        collapsed ? "justify-center" : "gap-3"
                      } bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl`
                    : darkMode
                      ? `flex items-center ${
                          collapsed ? "justify-center" : "gap-3"
                        } hover:bg-zinc-800 p-4 rounded-xl transition`
                      : `flex items-center ${
                          collapsed ? "justify-center" : "gap-3"
                        } hover:bg-gray-100 p-4 rounded-xl transition`
                }
              >
                Return Requests
              </NavLink>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 space-y-3">
        <button
          onClick={() => dispatch(toggleTheme())}
          className={
            darkMode
              ? "w-full flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 p-4 rounded-xl transition"
              : "w-full flex items-center gap-3 bg-gray-100 hover:bg-gray-200 p-4 rounded-xl transition"
          }
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}

          {!collapsed && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 bg-red-500 hover:bg-red-600 p-4 rounded-xl transition text-white"
        >
          <LogOut size={20} />

          {!collapsed && <span>Logout</span>}
        </button>
      </div>
      {!collapsed && (
        <div className="mt-10 text-center">
          <p
            className={
              darkMode ? "text-zinc-500 text-xs" : "text-gray-400 text-xs"
            }
          >
            Developed by
          </p>

          <h3 className="font-semibold mt-1 text-sm">Salman Deshmukh</h3>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
