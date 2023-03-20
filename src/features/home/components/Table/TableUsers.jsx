import { useMemo } from 'react';
import { MDBContainer, MDBIcon } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { useDeleteApplicationByID } from '../../../../hooks/useDeleteApplication';
import toastStyles from '../../../../util/toastifyStyles';
import './Table.css';
import { useTable, usePagination } from 'react-table';

const TableUsers = ({ data: items, isHrEsp: showExtraCols }) => {
    const { mutate } = useDeleteApplicationByID();

    const handleDelete = (index) => {
        mutate(index, {
            onSuccess: () => {
                toast.info('Deleted successfully', toastStyles.delete);
            }
        });
    };

    const columns = useMemo(() => {
        const commonColumns = [
            { Header: 'Medical diagnostic', accessor: (row) => row.medicalDiagnostic },
            {
                Header: 'Application date',
                accessor: (row) => row.applicationDate
            },
            { Header: 'Medical Unit', accessor: (row) => row.medicalUnit },
            { Header: 'Doctor', accessor: (row) => row.doctor },
            { Header: 'Days of coverage', accessor: (row) => row.daysOfCoverage },
            { Header: 'Start date', accessor: (row) => row.sickLeaveStartDate },
            { Header: 'End date', accessor: (row) => row.sickLeaveEndDate }
        ];
        //  return commonColumns;
        return showExtraCols ? [{ Header: 'Employee', accessor: (row) => row.employee?.fullName ?? 'N/A' }, ...commonColumns] : commonColumns;
    }, [showExtraCols]);

    const data = useMemo(() => {
        console.log('items:', items);
        return items;
    }, [items]);

    const tableInstance = useTable(
        {
            columns,
            data
        },

        usePagination
    );

    const { state, page, canPreviousPage, canNextPage, pageOptions, pageCount, gotoPage, nextPage, previousPage, setPageSize, getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;

    return (
        <MDBContainer fluid className="px-4">
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
                <span>
                    Page
                    <strong>
                        {state.pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
                <select
                    value={state.pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[5, 10, 20].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            {items.length > 0 ? (
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <h1>Error</h1>
            )}
        </MDBContainer>
    );
};

export default TableUsers;
