"use client";
import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/atoms/button";

export function AdminTable({ TableHeads, TableRows, headClass, tableClass, children, headers }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);

  // Transform TableHeads into TanStack columns
  const columns = React.useMemo(
    () =>
      (TableHeads || []).map((head) => ({
        accessorKey: head.key,
        header: head.Title,
        cell: (info) => {
          if (head.render) return head.render(info.row.original, info.row.index);
          const value = info.getValue();
          if (value instanceof Date) return value.toLocaleDateString();
          return value;
        },
        size: typeof head.width === 'number' ? head.width : 150,
        enableSorting: head.sortable !== false,
      })),
    [TableHeads]
  );

  const table = useReactTable({
    data: TableRows || [],
    columns,
    state: { sorting, globalFilter, columnFilters },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-border bg-background shadow-sm">
        <table className={`w-full min-w-[800px] border-collapse ${tableClass}`}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`text-left bg-zinc-950 font-semibold text-white py-4 px-4 text-xs uppercase tracking-wider ${headClass} select-none`}
                    style={{ width: header.column.columnDef.size }}
                  >
                    <div 
                      className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className="text-zinc-500">
                          {{
                            asc: <ArrowUp size={14} className="text-primary" />,
                            desc: <ArrowDown size={14} className="text-primary" />,
                          }[header.column.getIsSorted()] ?? <ArrowUpDown size={14} />}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-border">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-muted/50 transition-all group">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-4 text-left px-4 text-sm font-normal text-muted-foreground group-hover:text-foreground transition-colors">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-muted-foreground italic">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-6 py-4 bg-background border border-border rounded-xl shadow-sm">
        <div className="text-sm text-muted-foreground font-medium">
          Page <span className="font-bold text-foreground">{table.getState().pagination.pageIndex + 1}</span> of{" "}
          <span className="font-bold text-foreground">{table.getPageCount() || 1}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronLeft size={16} />
          </Button>
          <Button variant="outline" size="icon" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
