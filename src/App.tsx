import { Route, Routes } from 'react-router';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import PrivateRoute from './components/PrivateRoute';
import LoginRoute from './components/LoginRoute';
import Logout from './components/Logout';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginRoute />} index />
      <Route path='/cadastrar' element={<SignupPage />} />
      <Route path='/logout' element={<Logout />} />
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default App;
