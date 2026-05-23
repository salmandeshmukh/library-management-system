import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Label,
} from "recharts";

import { useEffect, useState } from "react";

import API from "../services/api";

function DashboardCharts({ stats, darkMode }) {
  const pieData = [
    {
      name: "Available",
      value: stats.availableBooks || 0,
    },

    {
      name: "Borrowed",
      value: stats.totalBorrowedBooks || 0,
    },
  ];

  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    fetchMonthlyStats();
  }, []);

  const fetchMonthlyStats = async () => {
    const response = await API.get("/borrow/monthly-stats");

    setActivityData(response.data);
  };

  const COLORS = ["#3b82f6", "#a855f7"];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">
      <div
        className={
          darkMode
            ? "relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl"
            : "relative overflow-hidden bg-white border border-gray-200 rounded-3xl p-6 shadow-lg"
        }
      >
        <h2 className="text-2xl font-semibold mb-6">Books Overview</h2>

        <div className="h-[320px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={105}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    stroke="transparent"
                  />
                ))}

                <Label
                  value={stats.totalBooks || 0}
                  position="center"                  
                  className={
                    darkMode
                      ? "fill-white text-3xl font-bold"
                      : "fill-black text-3xl font-bold"
                  }
                />
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="absolute -right-20 -top-20 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div
        className={
          darkMode
            ? "relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
            : "relative overflow-hidden bg-white border border-gray-200 rounded-3xl p-6 shadow-lg"
        }
      >
        <h2 className="text-2xl font-semibold mb-6">Borrow Activity</h2>

        <div className="h-[320px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData} barCategoryGap="40%">
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />

                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkMode ? "#27272a" : "#e5e7eb"}
              />

              <XAxis
                dataKey="month"
                stroke={darkMode ? "#a1a1aa" : "#6b7280"}
              />

              <YAxis stroke={darkMode ? "#a1a1aa" : "#6b7280"} />

              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? "#18181b" : "#ffffff",

                  border: darkMode ? "1px solid #27272a" : "1px solid #e5e7eb",

                  borderRadius: "16px",

                  color: darkMode ? "#ffffff" : "#000000",
                }}
              />

              <Legend />

              <Bar
                dataKey="books"
                radius={[14, 14, 0, 0]}
                fill="url(#barGradient)"
                barSize={60}
                maxBarSize={80}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="absolute -right-20 -top-20 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

export default DashboardCharts;
