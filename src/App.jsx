import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { ticketRoutes } from './routes/routes';
import { useAuthContext } from './hooks/useAuthContext';

import 'bulma/css/bulma.min.css';

const App = () => {
  const { user } = useAuthContext();
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route
            index={!user ? true : false}
            path={user ? 'login' : ''}
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          {ticketRoutes.map(({ path, component, index }) => (
            <Route
              index={user ? index : false}
              key={path}
              path={path}
              element={user ? component : <Navigate to="/login" />}
            />
          ))}
        </Route>
      </Routes>
    </main>
  );
};

export default App;
