import { MDBRow, MDBContainer, MDBCol, MDBIcon, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import './Header.css';
import FormModal from '../../formModal/formModal';
import { useState } from 'react';
const Header = () => {
    const [basicModal, setBasicModal] = useState(false);
    const btnModalHandler = (setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
        setFn(true);
    };
    return (
        <>
            <MDBContainer fluid>
                <MDBRow center className="my-4 mx-2">
                    <MDBCol className="d-flex">
                        <MDBIcon fas icon="user-tie" size="4x" />
                        <div className="ps-3 d-flex flex-column justify-content-center align-items-center">
                            <MDBTypography variant="h5" className="fw-bold">
                                John Doe
                            </MDBTypography>
                            <div>Log out btn</div>
                        </div>
                    </MDBCol>
                    <MDBCol size="sm-3" className="btn-container">
                        <MDBBtn
                            onClick={() => {
                                btnModalHandler(setBasicModal);
                            }}
                            className="filter-btn"
                        >
                            New Application
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
                <FormModal basicModal={basicModal} setBasicModal={setBasicModal} />
            </MDBContainer>
        </>
    );
};

export default Header;
