'use client'

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

export function DataTable({ columns, data }) {
    const [pageSize, setPageSize] = useState(50)
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: pageSize,
            },
        },
    })

    const totalPages = table.getPageCount()
    const currentPage = table.getState().pagination.pageIndex

    return (
        <div className="rounded-md border p-2 w-full">
            {/* Container scrollable cho body table */}
            <div className="max-h-[500px] overflow-auto">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="border px-2 py-1 text-left">
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
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="border px-2 py-1">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-4">
                                    Không có dữ liệu
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mt-3 gap-3 flex-wrap">
                <div className="flex gap-2">
                    <button
                        className="px-2 py-1 border rounded disabled:opacity-50"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<<'}
                    </button>
                    <button
                        className="px-2 py-1 border rounded disabled:opacity-50"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Trước
                    </button>
                    <button
                        className="px-2 py-1 border rounded disabled:opacity-50"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Sau
                    </button>
                    <button
                        className="px-2 py-1 border rounded disabled:opacity-50"
                        onClick={() => table.setPageIndex(totalPages - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>>'}
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <span>
                        Trang{' '}
                        <strong>
                            {currentPage + 1} / {totalPages}
                        </strong>
                    </span>
                    <select
                        value={currentPage}
                        onChange={(e) => table.setPageIndex(Number(e.target.value))}
                        className="border rounded px-2 py-1"
                    >
                        {Array.from({ length: totalPages }, (_, i) => (
                            <option key={i} value={i}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                    className="border rounded px-2 py-1"
                >
                    {[10, 20, 50, 100].map((size) => (
                        <option key={size} value={size}>
                            Hiển thị {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
