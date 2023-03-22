import { useState, useEffect, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import { useFetchApplications } from '../../hooks/useFetchCollection';
import useUserStore from '../../hooks/useUserStore';
import { FilterForm, Header, Loader, TableApp } from './components/index';
import { ApplicationFirestore } from '../../interfaces';
import 'react-toastify/dist/ReactToastify.css';

const Home: React.FC = () => {
    const { data = [], isLoading } = useFetchApplications();
    const [tableAppData, setTableAppData] = useState<ApplicationFirestore[]>([]);

    const { user, removeUser } = useUserStore();
    const isHrEspecialist = user?.role === 'hr_specialist';

    const updateUsersTableData = useCallback((data: ApplicationFirestore[], employeeId: string | undefined, isHrEspecialist: boolean, setTableAppData: (data: ApplicationFirestore[]) => void) => {
        setTableAppData(isHrEspecialist ? data : data.filter((app) => app.employeeId === employeeId));
    }, []);

    useEffect(() => {
        updateUsersTableData(data, user?.employeeId, isHrEspecialist, setTableAppData);
    }, [data, isHrEspecialist, user?.employeeId, updateUsersTableData]);

    let content = null;
    if (isLoading) {
        content = <Loader />;
    } else if (tableAppData?.length > 0) {
        content = <TableApp isHrEsp={isHrEspecialist} data={tableAppData} />;
    } else {
        content = <h1 className="text-center fw-bold text-muted py-4">No data yet</h1>;
    }
    return (
        <div>
            <Header user={user} logOutUser={removeUser} />
            <FilterForm />
            {content}
            <ToastContainer />
        </div>
    );
};

export default Home;
