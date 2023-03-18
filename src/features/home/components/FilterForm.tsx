import { MDBBtn, MDBRow, MDBCol, MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import './FilterForm.css';

export default function FilterForm() {
    return (
        <MDBContainer fluid>
            <MDBRow center className="my-4 mx-2">
                <MDBCol lg="6" md="8" sm="10" xs="12" className="py-2">
                    <div className="input-container">
                        <MDBInput size="lg" type="text" wrapperClass="form-outline" label="Search" />
                    </div>
                </MDBCol>
                <MDBCol lg="2" md="4" sm="5" xs="12" className="py-2">
                    <label className="label-date" htmlFor="date-for">
                        From
                    </label>
                    <MDBInput size="lg" id="date-for" type="text" className="search-date" />
                </MDBCol>
                <MDBCol lg="2" md="4" sm="5" xs="12" className="py-2">
                    <label className="label-date" htmlFor="date-from">
                        To
                    </label>
                    <MDBInput size="lg" id="date-from" type="text" className="search-date" />
                </MDBCol>
                <MDBCol lg="2" md="4" sm="2" xs="12" className="py-2">
                    <div className="input-container">
                        <MDBBtn className="button-filter" color="secondary">
                            Filter
                        </MDBBtn>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}
