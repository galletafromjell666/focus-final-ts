import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";

function Home() {
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="10">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <img
                className="img"
                src="https://cdn-icons-png.flaticon.com/512/1088/1088537.png"
              />
              <h5 className="fw-bold text-center mb-5">Login</h5>

              <MDBInput
                wrapperClass="mb-4 w-60"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-1 w-60"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
              />
              <label className="password-forget">Forgot password?</label>
              <MDBBtn className="mb-5" size="lg">
                Login
              </MDBBtn>

              <label className="mt-5 text-center">
                Don't have an account?{" "}
                <label className="sign-up">Sign up</label>
              </label>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Home;
