import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import DashboardLayout from "../../layouts/DashboardLayout";

import DataTable from "../../components/DataTable";

import API from "../../services/api";

import toast from "react-hot-toast";

function ReturnRequests() {

  const { darkMode } = useSelector(
    (state) => state.theme
  );

  const [
    returnRequests,

    setReturnRequests,
  ] = useState([]);

  useEffect(() => {

    fetchReturnRequests();

  }, []);

  const fetchReturnRequests =
    async () => {

      const response =
        await API.get(
          "/borrow/return-requests"
        );

      setReturnRequests(
        response.data
      );
    };

  const handleApproveReturn =
    async (id) => {

      try {

        await API.put(
          `/borrow/approve-return/${id}`
        );

        toast.success(
          "Return approved successfully"
        );

        fetchReturnRequests();

      } catch (error) {

        toast.error(
          "Something went wrong"
        );
      }
    };

  return (

    <DashboardLayout>

      <div className="max-w-8xl mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">

            Return Requests

          </h1>

        </div>

        <DataTable
          columns={[
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
              header: "Action",

              cell: ({ row }) => (

                <button
                  onClick={() =>
                    handleApproveReturn(
                      row.original._id
                    )
                  }

                  className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-xl"
                >

                  Approve Return

                </button>
              ),
            },
          ]}

          data={returnRequests}

          darkMode={darkMode}
        />

      </div>

    </DashboardLayout>
  );
}

export default ReturnRequests;