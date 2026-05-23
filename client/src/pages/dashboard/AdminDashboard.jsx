import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import { fetchDashboardStats } from "../../features/dashboardSlice";

import DashboardCharts from "../../components/DashboardCharts";

import RecentActivity from "../../components/RecentActivity";

import { BookOpen, Library, BookCopy, RotateCcw } from "lucide-react";

function Dashboard() {
  const dispatch = useDispatch();

  const { stats } = useSelector((state) => state.dashboard);

  const { darkMode } = useSelector((state) => state.theme);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const cards = [
    {
      title: "Total Books",
      value: stats.totalBooks || 0,
      subtitle: "All books in library",
      growth: "+12%",
      icon: BookOpen,
      gradient: "from-purple-500 to-blue-500",
    },

    {
      title: "Borrowed Books",
      value: stats.totalBorrowedBooks || 0,
      subtitle: "Currently borrowed",
      growth: "+8%",
      icon: Library,
      gradient: "from-green-400 to-emerald-500",
    },

    {
      title: "Available Copies",
      value: stats.availableBooks || 0,
      subtitle: "Books available",
      growth: "+15%",
      icon: BookCopy,
      gradient: "from-cyan-400 to-blue-500",
    },

    {
      title: "Returned Books",
      value: stats.returnedBooks || 0,
      subtitle: "Books returned",
      growth: "+10%",
      icon: RotateCcw,
      gradient: "from-orange-400 to-red-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-8xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Dashboard</h1>

          <p className={darkMode ? "text-zinc-400 mt-2" : "text-gray-600 mt-2"}>
            Library system overview
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className={
                  darkMode
                    ? "relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl hover:border-zinc-700 transition"
                    : "relative overflow-hidden bg-white border border-gray-200 rounded-3xl p-6 shadow-lg"
                }
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <Icon size={30} />
                    </div>

                    <p
                      className={
                        darkMode ? "text-zinc-400 mt-5" : "text-gray-500 mt-5"
                      }
                    >
                      {card.title}
                    </p>

                    <h2 className="text-5xl font-bold mt-3">{card.value}</h2>

                    <p
                      className={
                        darkMode
                          ? "text-zinc-500 mt-2 text-sm"
                          : "text-gray-400 mt-2 text-sm"
                      }
                    >
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <div className="bg-green-500/20 text-green-400 text-sm px-3 py-1 rounded-full">
                    {card.growth}
                  </div>

                  <p
                    className={
                      darkMode
                        ? "text-zinc-500 text-sm"
                        : "text-gray-400 text-sm"
                    }
                  >
                    from last month
                  </p>
                </div>

                <div
                  className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-r ${card.gradient} opacity-10 rounded-full blur-3xl`}
                />
              </div>
            );
          })}
        </div>

        <DashboardCharts stats={stats} darkMode={darkMode} />

        <RecentActivity darkMode={darkMode} />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
