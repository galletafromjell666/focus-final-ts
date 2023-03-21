import { useEffect, useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, ColumnDef, FilterFn, flexRender } from '@tanstack/react-table';
import { ApplicationFirestore } from '../../../../interfaces';
import { rankItem } from '@tanstack/match-sorter-utils';
import { commonCols as defaultCols } from '../../../../util/tableConfig';
import './Table.css';
import { MDBContainer, MDBTable } from 'mdb-react-ui-kit';
import { useDeleteApplicationByID } from '../../../../hooks/useDeleteApplication';
import { toast } from 'react-toastify';
import toastStyles from '../../../../util/toastifyStyles';
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

const TableUsers: React.FC<TableUserProps> = ({ data, isHrEsp: showExtraCols, searchString }) => {
    const { mutate: deleteApp } = useDeleteApplicationByID();
    const [globalFilter, setGlobalFilter] = useState('');
    const columns = useMemo<ColumnDef<ApplicationFirestore>[]>(() => {
        function handleAction(rowData: ApplicationFirestore) {
            deleteApp(rowData.id, {
                onSuccess: () => {
                    toast.info('Deleted successfully', toastStyles.delete);
                }
            });
        }

        const commonCols = defaultCols;
        const actionCol = {
            header: '',
            accessorKey: 'action',
            cell: (info: { row: { original: ApplicationFirestore } }) => <button onClick={() => handleAction(info.row.original)}>Action</button>,
            footer: (props: { column: { id: any } }) => props.column.id
        };
        return showExtraCols
            ? [
                  {
                      header: () => 'Employee',
                      accessorKey: 'employee.fullName',
                      cell: (info: { getValue: () => any }) => info.getValue(),
                      footer: (props: { column: { id: any } }) => props.column.id
                  },
                  ...commonCols,
                  actionCol
              ]
            : [...commonCols, actionCol];
    }, [deleteApp, showExtraCols]);

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
    useEffect(() => {
        setGlobalFilter(searchString);
    }, [searchString]);

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
