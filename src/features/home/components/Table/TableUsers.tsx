import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, ColumnDef, FilterFn, flexRender } from '@tanstack/react-table';
import { commonCols as defaultCols, actionCol, employeeCol } from '../../../../util/tableConfig';
import { rankItem } from '@tanstack/match-sorter-utils';
import { useDeleteApplicationByID } from '../../../../hooks/useDeleteApplication';
import { useEffect, useMemo, useState } from 'react';
import { ApplicationFirestore } from '../../../../interfaces';
import { MDBContainer, MDBTable } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import toastStyles from '../../../../util/toastifyStyles';
import './Table.css';
interface TableUserProps {
    isHrEsp: boolean;
    data: ApplicationFirestore[];
    searchString: string;
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
        itemRank
    });
    return itemRank.passed;
};

const TableUsers: React.FC<TableUserProps> = ({ data, isHrEsp: showExtraCol, searchString }) => {
    const { mutate: deleteApp } = useDeleteApplicationByID();
    const [globalFilter, setGlobalFilter] = useState('');
    useEffect(() => {
        setGlobalFilter(searchString);
    }, [searchString]);

    const columns = useMemo<ColumnDef<ApplicationFirestore>[]>(() => {
        function handleDeleteApp(rowData: ApplicationFirestore) {
            deleteApp(rowData.id, {
                onSuccess: () => {
                    toast.info('Deleted successfully', toastStyles.delete);
                }
            });
        }

        const deleteCol = actionCol(handleDeleteApp);
        const commonCols = defaultCols;
        return showExtraCol ? [employeeCol, ...commonCols, deleteCol] : [...commonCols, deleteCol];
    }, [deleteApp, showExtraCol]);

    const table = useReactTable({
        data,
        columns,
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

export default TableUsers;
