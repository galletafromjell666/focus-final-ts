import { MDBContainer, MDBIcon } from 'mdb-react-ui-kit';
import { useDeleteApplicationByID } from '../../../hooks/useDeleteApplication';
import { ApplicationFirestore } from '../../../interfaces/Application';
import './Table.css';

interface TableProps {
    data: ApplicationFirestore[];
}

export default function TableUsers({ data: items }: TableProps) {
    //create the one who deletes from firebase later...
    const { mutate } = useDeleteApplicationByID();
    const handleDelete = (index: string) => {
        console.log('DELETEEE');
        mutate(index);//GET MEESAGE OF LOADING, BC IT TAKES A WHILE TO DELETE 
    };

    return (
        <MDBContainer fluid className="px-4">
            {items.length > 0 ? (
                <table>
                    <thead>
                        <tr>
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
}
