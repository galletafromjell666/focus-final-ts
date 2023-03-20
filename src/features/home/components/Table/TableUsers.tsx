import { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, ColumnDef, FilterFn, flexRender } from '@tanstack/react-table';
import { ApplicationFirestore } from '../../../../interfaces';

import { rankItem } from '@tanstack/match-sorter-utils';

interface TableUserProps {
    isHrEsp: boolean;
    data: ApplicationFirestore[];
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
        itemRank
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
};

const TableUsers: React.FC<TableUserProps> = ({ data, isHrEsp: showExtraCols }) => {
    console.log(data.length);
    // filter stuff const rerender = React.useReducer(() => ({}), {})[1]
    //const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    //
    const columns = useMemo<ColumnDef<ApplicationFirestore>[]>(() => {
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
                enableGlobalFilter: false,
                accessorKey: 'sickLeaveStartDate',
                cell: (info: { getValue: () => any }) => info.getValue(),
                footer: (props: { column: { id: any } }) => props.column.id
            },
            {
                header: () => 'End date',
                enableGlobalFilter: false,
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
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn: fuzzyFilter,
        //
        debugTable: true,
        state: {
            globalFilter
        }
    });
    return (
        <div>
            <div>
                <input value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(String(e.target.value))} className="p-2 font-lg shadow border border-block" placeholder="Search all columns..." />
            </div>
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

export default TableUsers;
