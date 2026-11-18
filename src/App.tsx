import { Route, Routes } from 'react-router';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import PrivateRoute from './components/PrivateRoute';
import LoginRoute from './components/LoginRoute';
import Logout from './components/Logout';
import Template from './components/Template';
import VehicleFormPage from './pages/VehicleFormPage';
import RentalPage from './pages/RentalPage';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginRoute />} index />
      <Route path='/cadastrar' element={<SignupPage />} />
      <Route path='/logout' element={<Logout />} />
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<Template />}>
          <Route index element={<HomePage />} />
          <Route path='veiculos/cadastrar' element={<VehicleFormPage />} />
          <Route path='locacoes' element={<RentalPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
