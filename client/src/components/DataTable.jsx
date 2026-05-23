import {
  flexRender,
  getCoreRowModel,  
  getSortedRowModel,  
  useReactTable,
} from "@tanstack/react-table";

import { useState } from "react";

function DataTable({ columns, data, darkMode }) {
  const [sorting, setSorting] = useState([]);
  

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,      
    },

    onSortingChange: setSorting,    

    getCoreRowModel: getCoreRowModel(),

    getSortedRowModel: getSortedRowModel(),        
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">       
        <div
          className={
            darkMode ? "text-zinc-400 text-sm" : "text-gray-500 text-sm"
          }
        >
          Total: {data.length} records
        </div>
      </div>

      <div
        className={
          darkMode
            ? "bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
            : "bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl"
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={darkMode ? "bg-zinc-800" : "bg-gray-100"}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={
                        darkMode
                          ? "text-left px-6 py-5 cursor-pointer select-none text-zinc-300 text-sm uppercase tracking-wider"
                          : "text-left px-6 py-5 cursor-pointer select-none text-gray-600 text-sm uppercase tracking-wider"
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getCoreRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={
                    darkMode
                      ? "border-t border-zinc-800 hover:bg-zinc-800/40 transition"
                      : "border-t border-gray-200 hover:bg-blue-50/40 transition"
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default DataTable;
