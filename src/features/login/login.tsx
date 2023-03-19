import LoginForm from './components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { firebaseHandleLogin } from './useFirebaseLogin';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const handleLoginSubmit = async (username: string, password: string) => {
        const { status, message } = await firebaseHandleLogin(username, password);
        if (status === 'sucess') {
            console.log('SUCESS');
            navigate('/');
        }
    };
    return (
        <>
            <LoginForm onSubmit={handleLoginSubmit} />
        </>
    );
};

export default Login;
