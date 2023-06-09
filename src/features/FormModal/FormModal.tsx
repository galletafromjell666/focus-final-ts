import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody } from 'mdb-react-ui-kit';
import AppForm from './components/Form';
interface FormModalProps {
    basicModal: boolean;
    setBasicModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const FormModal: React.FC<FormModalProps> = ({ basicModal, setBasicModal }) => {
    const toggleShow = () => setBasicModal(!basicModal);
    return (
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
            <MDBModalDialog size="xl">
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Sick leave application</MDBModalTitle>
                        <MDBBtn className="btn-close" color="none" onClick={toggleShow}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <AppForm show={basicModal} setShow={setBasicModal} />
                    </MDBModalBody>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
};

export default FormModal;
