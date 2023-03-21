import { ToastContainer } from 'react-toastify';
import { useFetchApplications } from '../../hooks/useFetchCollection';
import { FilterForm, Header, TableUsers } from './components/index';
import 'react-toastify/dist/ReactToastify.css';
import useUserStore from '../../hooks/useUserStore';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    //const { data, isLoading } = useFetchApplications();//show a loader later
    const { data } = useFetchApplications();
    const navigate = useNavigate();
    useEffect(() => {
        setFilteredData(data ?? []);
    }, [data]);
    const [filteredData, setFilteredData] = useState(data ?? []);
    const [searchString, setSearchString] = useState('');
    const { user, removeUser } = useUserStore();
    const logOutHandler = () => {
        removeUser();
        navigate('/login');
    };
    const isHrEspecialist = user?.role === 'hr_specialist';
    return (
        <div>
            <Header user={user} logOutHandler={logOutHandler} />
            <FilterForm handleSearchChange={setSearchString} />
            {/**FIX THIS, AND SHOW A MESSAGE WHEN EMPTY */}
            {filteredData?.length && <TableUsers isHrEsp={isHrEspecialist} searchString={searchString} data={filteredData} />}
            <ToastContainer />
        </div>
    );
};

export default Home;
