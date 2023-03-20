import { useMemo } from 'react';
import { MDBContainer, MDBIcon } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { useDeleteApplicationByID } from '../../../../hooks/useDeleteApplication';
import { ApplicationFirestore } from '../../../../interfaces';
import toastStyles from '../../../../util/toastifyStyles';
import './Table.css';
import { useTable, Column } from 'react-table';

interface TableUserProps {
    isHrEsp: boolean;
    data: ApplicationFirestore[];
}

const TableUsers: React.FC<TableUserProps> = ({ data: items, isHrEsp: showExtraCols }) => {
    const { mutate } = useDeleteApplicationByID();

    const handleDelete = (index: string) => {
        mutate(index, {
            onSuccess: () => {
                toast.info('Deleted successfully', toastStyles.delete);
            }
        });
    };

    const columns: Column<ApplicationFirestore>[] = useMemo(() => {
        const commonColumns = [
            { Header: 'Medical diagnostic', accessor: (row: ApplicationFirestore) => row.medicalDiagnostic },
            {
                Header: 'Application date',
                accessor: (row: ApplicationFirestore) => row.applicationDate
            },
            { Header: 'Medical Unit', accessor: (row: ApplicationFirestore) => row.medicalUnit },
            { Header: 'Doctor', accessor: (row: ApplicationFirestore) => row.doctor },
            { Header: 'Days of coverage', accessor: (row: ApplicationFirestore) => row.daysOfCoverage },
            { Header: 'Start date', accessor: (row: ApplicationFirestore) => row.sickLeaveStartDate }
        ];
        //  return commonColumns;
        return showExtraCols ? [{ Header: 'Employee', accessor: (row: ApplicationFirestore) => row.employee?.fullName ?? 'N/A' }, ...commonColumns] : commonColumns;
    }, [showExtraCols]);

    const data = useMemo(() => {
        console.log('items:', items);
        return items;
    }, [items]);

    const tableInstance = useTable<ApplicationFirestore>({
        columns,
        data
    });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return (
        <MDBContainer fluid className="px-4">
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
                        {rows.map((row) => {
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
