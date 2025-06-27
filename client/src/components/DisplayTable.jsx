import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const DisplayTable = ({ data = [], column = [] }) => {
  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[600px] w-full border-collapse">
        <thead className="bg-gray-800 text-white text-sm">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th className="border px-3 py-2 text-left">Sr. No</th>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border px-3 py-2 text-left whitespace-nowrap"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={column.length + 1}
                className="text-center py-4 text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition-colors text-sm"
              >
                <td className="border px-3 py-2">{index + 1}</td>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border px-3 py-2 whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;
