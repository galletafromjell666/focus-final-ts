import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, ColumnDef, flexRender } from '@tanstack/react-table';
import { commonCols as defaultCols, actionCol, employeeCol, globalSearchFn, dateRangeFilter } from '../../../../util/tableConfig';
import { useDeleteApplicationByID } from '../../../../hooks/useDeleteApplication';
import useFilterStore, { RangeFilter } from '../../../../hooks/useFilterStore';
import { useMemo } from 'react';
import { ApplicationFirestore } from '../../../../interfaces';
import { MDBContainer, MDBTable } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import toastStyles from '../../../../util/toastifyStyles';
import './TableApp.css';

interface TableAppProps {
    isHrEsp: boolean;
    data: ApplicationFirestore[];
}

const useDateRangeFilter = (data: any[], dateFilter?: RangeFilter) => {
    return useMemo(() => {
        if (dateFilter) {
            return dateRangeFilter(data, dateFilter.startInterval, dateFilter.endInterval);
        }
        return data;
    }, [data, dateFilter]);
};

const TableApp: React.FC<TableAppProps> = ({ data, isHrEsp: showExtraCol }) => {
    const { globalFilter, rangeFilter } = useFilterStore();
    const { mutate: deleteApp } = useDeleteApplicationByID();
    const columns = useMemo<ColumnDef<ApplicationFirestore>[]>(() => {
        function handleDeleteApp(rowData: ApplicationFirestore) {
            deleteApp(rowData.id, {
                onSuccess: () => {
                    toast.warning('Deleted successfully', toastStyles.delete);
                }
            });
        }

        const deleteCol = actionCol(handleDeleteApp);
        const commonCols = defaultCols;
        return showExtraCol ? [employeeCol, ...commonCols, deleteCol] : [...commonCols, deleteCol];
    }, [deleteApp, showExtraCol]);
    const filteredData = useDateRangeFilter(data, rangeFilter);
    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn: globalSearchFn,
        //debugTable: true,
        state: {
            globalFilter
        }
    });

    const paginationButtons = [];
    for (let i = 0; i < table.getPageCount(); i++) {
        paginationButtons.push(
            <button key={i} onClick={() => table.setPageIndex(i)}>
                {i + 1}
            </button>
        );
    }

    return (
        <MDBContainer fluid className="my-4 mx-auto">
            <div className="table-responsive-lg">
                <MDBTable>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th key={header.id} colSpan={header.colSpan}>
                                            {<div>{flexRender(header.column.columnDef.header, header.getContext())}</div>}
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
                </MDBTable>
            </div>
            <MDBContainer fluid>
                <div className="pagination-container">
                    <div>
                        Items per page
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => {
                                table.setPageSize(Number(e.target.value));
                            }}
                        >
                            {[5, 10, 15, 20].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="button-container">{paginationButtons.map((u) => u)}</div>
                </div>
            </MDBContainer>
        </MDBContainer>
    );
};

export default TableApp;
