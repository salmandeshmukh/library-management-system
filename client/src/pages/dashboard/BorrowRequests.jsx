import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import DataTable from "../../components/DataTable";

import {
  fetchRequests,
  approveRequest,
  rejectRequest,
} from "../../features/borrowRequestSlice";


import toast from 'react-hot-toast'

function BorrowRequests() {
  const dispatch = useDispatch();

  const { requests } = useSelector((state) => state.borrowRequest);

  const { darkMode } = useSelector((state) => state.theme);  

  useEffect(() => {
    dispatch(fetchRequests());
    
  }, [dispatch]);

  const handleApprove =
  async (id) => {

    try {

      await dispatch(
        approveRequest(id)
      ).unwrap()

      toast.success(
        'Request approved'
      )

      dispatch(fetchRequests())

    } catch (error) {

      toast.error(error)
    }
}

  const handleReject = async (id) => {
    await dispatch(rejectRequest(id));

    dispatch(fetchRequests());
  };

  const columns = [
    {
      header: "Student",

      cell: ({ row }) => (

  row.original.user?.name
  || "Unknown User"
),
    },

    {
      header: "Book",

      cell: ({ row }) => (

  row.original.book?.title
  || "Book Removed"
),
    },

    {
      header: "Status",

      cell: ({ row }) => (
        <span
          className={
            row.original.status === "approved"
              ? "bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm"
              : row.original.status === "rejected"
                ? "bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm"
                : "bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm"
          }
        >
          {row.original.status}
        </span>
      ),
    },

    {
      header: "Action",

      cell: ({ row }) => (
        <div className="flex gap-3 flex-wrap">
          {row.original.status === "pending" &&
            (row.original.book?.availableCopies < 1 ? (
              <span className="bg-red-500/20 text-red-400 px-3 py-2 rounded-xl text-sm">
                Out of Stock
              </span>
            ) : (
              <>
                <button
                  onClick={() => handleApprove(row.original._id)}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(row.original._id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
                >
                  Reject
                </button>
              </>
            ))}

        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-8xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Borrow Requests</h1>
        </div>

        <DataTable columns={columns} data={requests} darkMode={darkMode} />
      </div>
    </DashboardLayout>
  );
}

export default BorrowRequests;
