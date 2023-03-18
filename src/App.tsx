
import Login from './features/login/Login';
import ApplicationForm from './features/newAppModal/AppForm';
import { useFetchEmployees } from './hooks/useFetchCollection';
function App() {
    const { isLoading, data, error } = useFetchEmployees();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (data) {
        return JSON.stringify(data);
    }

    return (
        <div>
            <Login />
            <br />
            <br />
            <ApplicationForm />
        </div>
    );
}

export default App;
