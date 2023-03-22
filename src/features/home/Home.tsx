import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useFetchApplications } from '../../hooks/useFetchCollection';
import useUserStore from '../../hooks/useUserStore';
import { FilterForm, Header, Loader, TableApp } from './components/index';
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

    const updateUsersTableData = useCallback((data: ApplicationFirestore[], isHrEspecialist: boolean, employeeId?: string) => {
        setUsersTableData(isHrEspecialist ? data : data.filter((app) => app.employeeId === employeeId));
    }, []);

    useEffect(() => {
        updateUsersTableData(data, isHrEspecialist, user?.employeeId);
    }, [data, isHrEspecialist, user?.employeeId, updateUsersTableData]);

    let content = null;
    if (isLoading) {
        content = <Loader />;
    } else if (usersTableData?.length > 0) {
        console.log(usersTableData);
        content = <TableApp isHrEsp={isHrEspecialist} searchString={searchString} data={usersTableData} />;
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
