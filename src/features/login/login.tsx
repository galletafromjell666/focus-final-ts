import LoginForm from './components/LoginForm';
import { firebaseHandleLogin } from './useFirebaseLogin';

const Login: React.FC = () => {
    const handleLoginSubmit = async (username: string, password: string) => {
        const { status, message } = await firebaseHandleLogin(username, password);
    };
    return (
        <>
            <LoginForm onSubmit={handleLoginSubmit} />
        </>
    );
};

export default Login;
