import React, { useMemo } from 'react';
import { Column, Table as ReactTable, PaginationState, useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, ColumnDef, OnChangeFn, flexRender } from '@tanstack/react-table';
import { ApplicationFirestore } from '../../../../interfaces';
interface TableUserProps {
    isHrEsp: boolean;
    data: ApplicationFirestore[];
}
const TableUsersV2: React.FC<TableUserProps> = ({ data, isHrEsp: showExtraCols }) => {
    console.log(data.length);
    const columns = React.useMemo<ColumnDef<ApplicationFirestore>[]>(() => {
        const commonCols = [
            {
                header: () => 'Medical diagnostic',
                accessorKey: 'medicalDiagnostic',
                cell: (info: { getValue: () => any }) => info.getValue(),
                footer: (props: { column: { id: any } }) => props.column.id
            },
            {
                header: () => 'Application date',
                accessorKey: 'applicationDate',
                cell: (info: { getValue: () => any }) => info.getValue(),
                footer: (props: { column: { id: any } }) => props.column.id
            },
            {
                header: () => 'Medical Unit',
                accessorKey: 'medicalUnit',
                cell: (info: { getValue: () => any }) => info.getValue(),
                footer: (props: { column: { id: any } }) => props.column.id
            },
            {
                header: () => 'Doctor',
                accessorKey: 'doctor',
                cell: (info: { getValue: () => any }) => info.getValue(),
                footer: (props: { column: { id: any } }) => props.column.id
            },
            {
                header: () => 'Days of coverage',
                accessorKey: 'daysOfCoverage',
                cell: (info: { getValue: () => any }) => info.getValue(),
                footer: (props: { column: { id: any } }) => props.column.id
            },
            {
                header: () => 'Start date',
                accessorKey: 'sickLeaveStartDate',
                cell: (info: { getValue: () => any }) => info.getValue(),
                footer: (props: { column: { id: any } }) => props.column.id
            },
            {
                header: () => 'End date',
                accessorKey: 'sickLeaveEndDate',
                cell: (info: { getValue: () => any }) => info.getValue(),
                footer: (props: { column: { id: any } }) => props.column.id
            }
        ];

        return showExtraCols
            ? [
                  {
                      header: () => 'Employee',
                      accessorKey: 'employee.fullName',
                      cell: (info: { getValue: () => any }) => info.getValue(),
                      footer: (props: { column: { id: any } }) => props.column.id
                  },
                  ...commonCols
              ]
            : commonCols;
    }, []);

    const table = useReactTable({
        data,
        columns,
        // Pipeline
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        //
        debugTable: true
    });
    return (
        <div>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="h-2" />
            <div className="flex items-center gap-2">
                <button className="border rounded p-1" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                    {'<<'}
                </button>
                <button className="border rounded p-1" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    {'<'}
                </button>
                <button className="border rounded p-1" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    {'>'}
                </button>
                <button className="border rounded p-1" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                    {'>>'}
                </button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page);
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[5, 10, 15, 20, 25].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div>{table.getRowModel().rows.length} Rows</div>
            <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
        </div>
    );
};

export default TableUsersV2;
