import { MDBContainer, MDBIcon } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { useDeleteApplicationByID } from '../../../../hooks/useDeleteApplication';
import { ApplicationFirestore } from '../../../../interfaces';
import toastStyles from '../../../../util/toastifyStyles';
import './Table.css';

interface TableUserProps {
    isHrEsp: boolean;
    data: ApplicationFirestore[];
}

const TableUsers: React.FC<TableUserProps> = ({ data: items, isHrEsp: showExtraCols }) => {
    const { mutate } = useDeleteApplicationByID();
    const handleDelete = (index: string) => {
        mutate(index, {
            onSuccess: () => {
                toast.info('Deleted sucesfully', toastStyles.delete);
            }
        });
    };

    return (
        <MDBContainer fluid className="px-4">
            {items.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            {showExtraCols && <th>Employee</th>}
                            <th>Medical diagnostic</th>
                            <th>Application date</th>
                            <th>Medical Unit</th>
                            <th>Doctor</th>
                            <th>Days of coverage</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                {showExtraCols && <td>{item.employee?.fullName}</td>}
                                <td>{item.medicalDiagnostic}</td>
                                <td>{item.applicationDate}</td>
                                <td>{item.medicalUnit}</td>
                                <td>{item.doctor}</td>
                                <td>{item.daysOfCoverage}</td>
                                <td>{item.sickLeaveStartDate}</td>
                                <td>{item.sickLeaveEndDate}</td>
                                <td>
                                    <button onClick={() => handleDelete(item.id)}>
                                        <MDBIcon icon="trash" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h1>Error</h1>
            )}
        </MDBContainer>
    );
};

export default TableUsers;
