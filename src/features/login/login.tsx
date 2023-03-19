import React from 'react';
import LoginForm from './components/LoginForm';

import { firebaseHandleLogin } from './useFirebaseLogin';

const Login: React.FC = () => {
    const handleLoginSubmit = async (username: string, password: string) => {
        const resp = await firebaseHandleLogin( username, password);
    };
    return (
        <div>
            <LoginForm onSubmit={handleLoginSubmit} />
        </div>
    );
};

export default Login;
