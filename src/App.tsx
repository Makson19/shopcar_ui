import { Route, Routes } from 'react-router';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} index />
      <Route path='/cadastrar' element={<SignupPage />} />
    </Routes>
  );
};

export default App;
