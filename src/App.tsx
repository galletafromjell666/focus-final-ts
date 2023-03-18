import Login from './features/login/Login';
import Home from './features/home/Home';
import TableUsers from './features/home/components/Table';
function App() {
    const mockData = [
        {
          diagnostic: 'Diabetes',
          date: '2022-03-01',
          medicalUnit: 'Hospital ABC',
          doctor: 'Dr. John Smith',
          days: 30,
          startDate: '2022-03-05',
          endDate: '2022-04-04'
        },
        {
          diagnostic: 'High blood pressure',
          date: '2022-03-15',
          medicalUnit: 'Medical Clinic XYZ',
          doctor: 'Dr. Jane Doe',
          days: 60,
          startDate: '2022-03-20',
          endDate: '2022-05-19'
        },
        {
          diagnostic: 'Asthma',
          date: '2022-03-22',
          medicalUnit: 'Urgent Care Center',
          doctor: 'Dr. William Brown',
          days: 15,
          startDate: '2022-03-25',
          endDate: '2022-04-09'
        }
      ];
      

    return (
        <div>
            <Login />
            <br />
            <br />
            <Home />
            <br />
            <br />
            <TableUsers data={mockData} />
        </div>
    );
}
export default App;
