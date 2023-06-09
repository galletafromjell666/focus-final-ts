import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './util/ProtectedRoute';
import Login from './features/Login/Login';
import Home from './features/Home/Home';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
