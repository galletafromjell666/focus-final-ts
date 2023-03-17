import React from 'react';
import { useForm } from 'react-hook-form';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';

type LoginFormProps = {
    onSubmit: (username: string, password: string) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmitHandler = handleSubmit(() => {
        const { username, password } = getValues();
        onSubmit(username, password);
    });

    return (
        <MDBContainer fluid>
            <MDBRow className="d-flex justify-content-center align-items-center h-100">
                <MDBCol col="10">
                    <MDBCard className="bg-white my-5 mx-auto" style={{ maxWidth: '500px' }}>
                        <form onSubmit={onSubmitHandler}>
                            <MDBCardBody className="p-5 w-100 d-flex flex-column">
                                <img className="img p-5" src="./ITO_LOGO.png" />
                                <h5 className="fw-bold text-center mb-5">Login</h5>
                                <MDBInput wrapperClass="mb-4 w-60" label="Email address" size="lg" type="text" {...register('username', { required: 'Please enter a username' })} />
                                {errors.username && <p>{errors.username.message}</p>}

                                <MDBInput wrapperClass="mb-1 w-60" label="Password" type="password" size="lg" {...register('password', { required: 'Please enter a password' })} />
                                {errors.password && <p>{errors.password.message}</p>}
                                <label className="password-forget my-2">Forgot password?</label>
                                <MDBBtn type="submit" className="mb-5" size="lg">
                                    Login
                                </MDBBtn>
                                <label className="mt-5 text-center">
                                    Don't have an account?
                                    <label className="sign-up">Sign up</label>
                                </label>
                            </MDBCardBody>
                        </form>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default LoginForm;
