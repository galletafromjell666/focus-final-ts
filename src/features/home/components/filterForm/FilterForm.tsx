import { MDBBtn, MDBRow, MDBCol, MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import './FilterForm.css';

interface FilterFormProps {
    handleSearchChange: React.Dispatch<React.SetStateAction<string>>;
}

const FilterForm: React.FC<FilterFormProps> = ({ handleSearchChange }) => {
    return (
        <MDBContainer fluid>
            <MDBRow center className="my-4 mx-2">
                <MDBCol lg="6" md="8" sm="10" xs="12" className="py-2">
                    <div className="input-container">
                        <MDBInput
                            size="lg"
                            onChange={(e) => {
                                handleSearchChange(String(e.target.value));
                            }}
                            type="text"
                            wrapperClass="form-outline"
                            label="Search"
                        />
                    </div>
                </MDBCol>
                <MDBCol lg="2" md="4" sm="5" xs="12" className="py-2">
                    <label className="label-date" htmlFor="date-from">
                        From
                    </label>
                    <input id="date-from" name="date-from" type="date" className="search-date" />
                </MDBCol>
                <MDBCol lg="2" md="4" sm="5" xs="12" className="py-2">
                    <label className="label-date" htmlFor="date-to">
                        To
                    </label>
                    <input id="date-to" name="date-to" type="date" className="search-date" />
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
};

export default FilterForm;
