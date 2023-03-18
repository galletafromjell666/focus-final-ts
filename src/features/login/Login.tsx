import React from 'react';
import LoginForm from './components/LoginForm';
import { app } from '../../firebase';
import { firebaseHandleLogin } from './handleLoginFirebase';

const Login: React.FC = () => {
    const handleLoginSubmit = async (username: string, password: string) => {
        const resp = await firebaseHandleLogin(app, username, password);
    };
    return (
        <div>
            <LoginForm onSubmit={handleLoginSubmit} />
        </div>
    );
};

export default Login;
