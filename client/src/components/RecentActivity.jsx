import { useEffect, useState } from "react";

import API from "../services/api";

function RecentActivity({ darkMode }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const response = await API.get("/borrow/recent-activities");

    setActivities(response.data);
  };

  return (
    <div
      className={
        darkMode
          ? "relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mt-10 shadow-xl"
          : "relative overflow-hidden bg-white border border-gray-200 rounded-3xl p-6 shadow-lg mt-10"
      }
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold">Recent Activity</h2>

          <p
            className={
              darkMode
                ? "text-zinc-400 mt-1 text-sm"
                : "text-gray-500 mt-1 text-sm"
            }
          >
            Latest library transactions
          </p>
        </div>

        <div className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-xl text-sm">
          Live
        </div>
      </div>

      <div className="space-y-5">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={
              darkMode
                ? "flex items-center justify-between bg-zinc-800/40 hover:bg-zinc-800/70 transition border border-zinc-800 rounded-2xl p-5"
                : "flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition border border-gray-200 rounded-2xl p-5"
            }
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl ${activity.color} flex items-center justify-center text-lg font-bold shadow-lg`}
              >
                {activity.user?.name.charAt(0)}
              </div>

              <div>
                <p className="text-lg font-semibold">{activity.user?.name}</p>

                <p
                  className={
                    darkMode
                      ? "text-zinc-400 text-sm mt-1"
                      : "text-gray-500 text-sm mt-1"
                  }
                >
                  {activity.returned ? "Returned" : "Borrowed"} :{" "}
                  {activity.book?.title}
                </p>

                <p className="text-xs text-blue-400 mt-2">
                  {activity.book?.category}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p
                className={
                  darkMode ? "text-zinc-500 text-sm" : "text-gray-400 text-sm"
                }
              >
                {activity.date}
              </p>

              <div className="mt-2 bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full">
                Success
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
    </div>
  );
}

export default RecentActivity;
