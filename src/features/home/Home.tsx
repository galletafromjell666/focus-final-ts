import FilterForm from './components/FilterForm';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    return (
        <div>
            <Header />
            <FilterForm />
            <ToastContainer />
        </div>
    );
};

export default Home;
