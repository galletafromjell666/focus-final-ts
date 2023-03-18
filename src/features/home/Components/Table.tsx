import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
export default function TableUsers() {
    return (
        <MDBTable>
            <MDBTableHead className="table-secondary">
                <tr>
                    <th scope="col">Medical diagnostic</th>
                    <th scope="col">Application date</th>
                    <th scope="col">Medical Unit</th>
                    <th scope="col">Doctor</th>
                    <th scope="col">Days of coverage</th>
                    <th scope="col">Start date</th>
                    <th scope="col">End date</th>
                    <th scope="col"></th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                <tr>
                    <th scope="row">lorem ipsum....</th>
                    <td>03/04/2023</td>
                    <td>ISSS</td>
                    <td>Francisco Menjivar</td>
                    <td>5</td>
                    <td>03/04/2023</td>
                    <td>03/04/2023</td>
                    <td>x</td>
                </tr>
                <tr>
                    <th scope="row">lorem ipsum....</th>
                    <td>03/04/2023</td>
                    <td>ISSS</td>
                    <td>Francisco Menjivar</td>
                    <td>5</td>
                    <td>03/04/2023</td>
                    <td>03/04/2023</td>
                    <td>x</td>
                </tr>
                <tr>
                    <th scope="row">lorem ipsum....</th>
                    <td>03/04/2023</td>
                    <td>ISSS</td>
                    <td>Francisco Menjivar</td>
                    <td>5</td>
                    <td>03/04/2023</td>
                    <td>03/04/2023</td>
                    <td>x</td>
                </tr>
            </MDBTableBody>
            <tfoot>
                <tr>
                    <th scope="row">lorem ipsum....</th>
                    <td>03/04/2023</td>
                    <td>ISSS</td>
                    <td>Francisco Menjivar</td>
                    <td>5</td>
                    <td>03/04/2023</td>
                    <td>03/04/2023</td>
                    <td>x</td>
                </tr>
            </tfoot>
        </MDBTable>
    );
}
