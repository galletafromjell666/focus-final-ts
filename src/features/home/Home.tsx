import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useFetchApplications } from '../../hooks/useFetchCollection';
import useUserStore from '../../hooks/useUserStore';
import { FilterForm, Header, Loader, TableUsers } from './components/index';
import { ApplicationFirestore } from '../../interfaces';
import 'react-toastify/dist/ReactToastify.css';
const Home: React.FC = () => {
    const navigate = useNavigate();
    const { data = [], isLoading } = useFetchApplications();
    const [usersTableData, setUsersTableData] = useState<ApplicationFirestore[]>([]);
    const [searchString, setSearchString] = useState('');
    const { user, removeUser } = useUserStore();
    const logOutHandler = () => {
        removeUser();
        navigate('/login');
    };
    const isHrEspecialist = user?.role === 'hr_specialist';
    useEffect(() => {
        setUsersTableData(isHrEspecialist ? data : data.filter((app) => app.employeeId === user?.employeeId));
    }, [data, isHrEspecialist, user?.employeeId]);

    let content = null;
    if (isLoading) {
        content = <Loader />;
    } else if (usersTableData?.length > 0) {
        content = <TableUsers isHrEsp={isHrEspecialist} searchString={searchString} data={usersTableData} />;
    } else {
        content = <h1 className="text-center fw-bold text-muted py-4">No data yet</h1>;
    }
    return (
        <div>
            <Header user={user} logOutHandler={logOutHandler} />
            <FilterForm handleSearchChange={setSearchString} />
            {content}
            <ToastContainer />
        </div>
    );
};

export default Home;
