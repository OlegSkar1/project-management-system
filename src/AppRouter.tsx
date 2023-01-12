import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import StartPage from './pages/StartPage';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<StartPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
