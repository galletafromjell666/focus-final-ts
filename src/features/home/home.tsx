import { ToastContainer } from 'react-toastify';
import { useFetchApplications } from '../../hooks/useFetchCollection';
import { FilterForm, Header, TableUsers } from './components/index';
import 'react-toastify/dist/ReactToastify.css';

const Home: React.FC = () => {
    //const { data, isLoading } = useFetchApplications();
    const { data } = useFetchApplications();
    return (
        <div>
            <Header />
            <FilterForm />
            <ToastContainer />
            {/**FIX THIS, AND SHOW A MESSAGE WHEN EMPTY */}
            {data?.length && <TableUsers data={data ?? []} />}
        </div>
    );
};

export default Home;
