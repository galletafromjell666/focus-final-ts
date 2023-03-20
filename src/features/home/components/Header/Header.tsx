import { useState } from 'react';
import { MDBRow, MDBContainer, MDBCol, MDBIcon, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import FormModal from '../../../FormModal/FormModal';
import './Header.css';

const Header: React.FC = () => {
    const [basicModal, setBasicModal] = useState(false);
    const btnModalHandler = (setModalFn: React.Dispatch<React.SetStateAction<boolean>>) => {
        setModalFn(true);
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
