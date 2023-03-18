import { MDBRow, MDBContainer, MDBCol, MDBIcon, MDBTypography } from 'mdb-react-ui-kit';

const Header = () => {
  return (
    <MDBContainer fluid>
      <MDBRow center className="my-4">
        <MDBCol className="d-flex">
          <MDBIcon fas icon="user-tie" size="4x" />
          <div className="ps-3 d-flex flex-column justify-content-center align-items-center">
            <MDBTypography variant='h5' className='fw-bold'>John Doe</MDBTypography>
            <div>Log out btn</div>
          </div>
        </MDBCol>
        <MDBCol size="md-4">x</MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Header;
