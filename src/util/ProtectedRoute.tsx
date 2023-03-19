import { Navigate, useLocation } from 'react-router-dom';
import useUserStore from '../hooks/useUserStore';

const ProtectedRoute = ({ children }: any) => {
    const { user } = useUserStore();
    const isUserLogged = user ? user : false;
    let location = useLocation();
    if (!isUserLogged) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default ProtectedRoute;
