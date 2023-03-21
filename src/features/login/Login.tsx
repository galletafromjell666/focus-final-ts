import LoginForm from './components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { firebaseHandleLogin } from '../../hooks/useFirebaseLogin';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const handleLoginSubmit = async (username: string, password: string) => {
        const { status } = await firebaseHandleLogin(username, password);
        if (status === 'success') {
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
