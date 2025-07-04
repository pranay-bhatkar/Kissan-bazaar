import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";
import Papa from "papaparse";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DisplayTable = ({ data = [], column = [] }) => {
  const [sorting, setSorting] = useState([]);
  const [theme, setTheme] = useState("light");

  const table = useReactTable({
    data,
    columns: column,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  const exportToCSV = () => {
    const csvData = data.map((row) => {
      const flatRow = {};
      column.forEach((col) => {
        flatRow[col.header] = row[col.accessorKey || col.id];
      });
      return flatRow;
    });
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const headers = column.map((col) => col.header);
    const rows = data.map((row) =>
      column.map((col) => row[col.accessorKey || col.id])
    );
    doc.autoTable({
      head: [headers],
      body: rows,
    });
    doc.save("table_data.pdf");
  };

  return (
    <div
      className={`w-full ${
        theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-white text-black"
      } p-2 rounded shadow`}
    >
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
        <div className="flex gap-2">
          <button
            onClick={exportToCSV}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Export CSV
          </button>
          <button
            onClick={exportToPDF}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm"
          >
            Export PDF
          </button>
        </div>
        <button
          onClick={() =>
            setTheme((prev) => (prev === "dark" ? "light" : "dark"))
          }
          className="px-3 py-1 border rounded text-sm"
        >
          Toggle {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>

      {/* ✅ Desktop Table (hidden on mobile) */}
      <div className="hidden sm:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-200 dark:bg-gray-700">
                <th className="border px-3 py-2">#</th>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border px-3 py-2 text-left whitespace-nowrap"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc"
                      ? " 🔼"
                      : header.column.getIsSorted() === "desc"
                      ? " 🔽"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="border px-3 py-2">{index + 1}</td>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border px-3 py-2 whitespace-nowrap"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Card View */}
      <div className="sm:hidden flex flex-col gap-3">
        {table.getRowModel().rows.map((row, index) => (
          <div
            key={row.id}
            className="border p-3 rounded shadow-sm bg-white dark:bg-gray-800"
          >
            <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
              #{index + 1}
            </p>
            {row.getVisibleCells().map((cell) => (
              <div key={cell.id} className="mb-2 text-sm">
                <span className="font-semibold block text-gray-600 dark:text-gray-400">
                  {
                    cell.column.columnDef.header
                  }
                </span>
                <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayTable;
