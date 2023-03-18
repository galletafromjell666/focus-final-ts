import { MDBContainer, MDBIcon } from 'mdb-react-ui-kit';
import { useState } from 'react';
import './Table.css';

interface TableProps {
  data: any[];
}

export default function TableUsers({ data }: TableProps) {
  const [items, setItems] = useState(data);

  const handleDelete = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <MDBContainer fluid className="px-4">
      {items.length ? (
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
                <td>{item.diagnostic}</td>
                <td>{item.date}</td>
                <td>{item.medicalUnit}</td>
                <td>{item.doctor}</td>
                <td>{item.days}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>
                  <button onClick={() => handleDelete(index)}>
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
