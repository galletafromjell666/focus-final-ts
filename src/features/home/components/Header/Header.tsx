import { useState } from 'react';
import { MDBRow, MDBContainer, MDBCol, MDBIcon, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import FormModal from '../../../FormModal/FormModal';
import './Header.css';
import { User } from '../../../../interfaces';

interface HeaderProps {
    logOutHandler: () => void;
    user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user, logOutHandler }) => {
    const [basicModal, setBasicModal] = useState(false);
    const btnModalHandler = (setModalFn: React.Dispatch<React.SetStateAction<boolean>>) => {
        setModalFn(true);
    };
    return (
        <>
            <MDBContainer fluid>
                <MDBRow center className="header-row">
                    <MDBCol className="d-flex">
                        <MDBIcon fas icon="user-tie" size="4x" />
                        <div className="ps-4 d-flex flex-column justify-content-center">
                            <MDBTypography variant="h5" className="fw-bold">
                                {user?.employee.fullName}
                            </MDBTypography>
                            <div onClick={logOutHandler} className="text-danger pe-auto custom-pointer">
                                <MDBIcon icon="fas fa-sign-out-alt" className="pe-2" />
                                Log Out
                            </div>
                        </div>
                    </MDBCol>
                    <MDBCol size="sm-3" className="btn-container">
                        <MDBBtn
                            onClick={() => {
                                btnModalHandler(setBasicModal);
                            }}
                            className="new-app-btn"
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
