import Login from './features/login/Login';
import Home from './features/home/Home';
import TableUsers from './features/home/components/Table';
import { useFetchApplications } from './hooks/useFetchCollection';
function App() {
    const { data, isLoading } = useFetchApplications();
    if (data) {
        console.log(data);
    }
    return (
        <div>
            <Login />
            <br />
            <br />
            <Home />
            <br />
            <br />
            {data?.length && <TableUsers data={data ?? []} />}
        </div>
    );
}
export default App;
