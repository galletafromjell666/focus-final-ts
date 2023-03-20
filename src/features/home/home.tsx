import { ToastContainer } from 'react-toastify';
import { useFetchApplications } from '../../hooks/useFetchCollection';
import { FilterForm, Header, TableUsers } from './components/index';
import 'react-toastify/dist/ReactToastify.css';
import useUserStore from '../../hooks/useUserStore';

const Home: React.FC = () => {
    //const { data, isLoading } = useFetchApplications();
    const { data } = useFetchApplications();
    const { user } = useUserStore();
    const isHrEspecialist = user?.role === 'hr_specialist';
    return (
        <div>
            <Header />
            <FilterForm />
            <ToastContainer />
            {/**FIX THIS, AND SHOW A MESSAGE WHEN EMPTY */}
            {data?.length && <TableUsers isHrEsp={isHrEspecialist} data={data ?? []} />}
        </div>
    );
};

export default Home;
