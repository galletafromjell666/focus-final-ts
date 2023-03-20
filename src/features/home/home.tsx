import { ToastContainer } from 'react-toastify';
import { useFetchApplications } from '../../hooks/useFetchCollection';
import { FilterForm, Header, TablePagination, TableUsers } from './components/index';
import 'react-toastify/dist/ReactToastify.css';
import useUserStore from '../../hooks/useUserStore';
import { useState, useEffect } from 'react';

const Home: React.FC = () => {
    //const { data, isLoading } = useFetchApplications();
    const { data } = useFetchApplications();
    useEffect(() => {
        setFilteredData(data ?? []);
    }, [data]);

    //moving the data from React Query to useState, so it's easier to make changes
    const [filteredData, setFilteredData] = useState(data ?? []);
    const { user } = useUserStore();
    const isHrEspecialist = user?.role === 'hr_specialist';
    console.log(`length of data arr = ${filteredData.length}`);
    return (
        <div>
            <Header />
            <FilterForm />
            <ToastContainer />
            {/**FIX THIS, AND SHOW A MESSAGE WHEN EMPTY */}
            {filteredData?.length && <TableUsers isHrEsp={isHrEspecialist} data={filteredData} />}
            <TablePagination data={filteredData} setFilteredData={setFilteredData} />
        </div>
    );
};

export default Home;
