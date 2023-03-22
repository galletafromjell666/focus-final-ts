import LoginForm from './components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { firebaseHandleLogin } from '../../hooks/useFirebaseLogin';
import { toast, ToastContainer } from 'react-toastify';
import toastStyles from '../../util/toastifyStyles';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const handleLoginSubmit = async (username: string, password: string) => {
        const { status } = await firebaseHandleLogin(username, password);
        if (status === 'success') {
            navigate('/');
        } else {
            toast.error('Wrong login info', toastStyles.loginErr);
        }
    };
    return (
        <>
            <LoginForm onSubmit={handleLoginSubmit} />
            <ToastContainer />
        </>
    );
};

export default Login;
