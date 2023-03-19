import { ToastContainer } from 'react-toastify';
import { useFetchApplications } from '../../hooks/useFetchCollection';
import { FilterForm, Header, TableUsers } from './components/index';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
    const { data, isLoading } = useFetchApplications();

    return (
        <div>
            <Header />
            <FilterForm />
            <ToastContainer />
            {data?.length && <TableUsers data={data ?? []} />}
        </div>
    );
};

export default Home;
