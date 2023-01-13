import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Layout from './pages/Layout';
import LoginPage, { loginLoader } from './pages/LoginPage';
import SignUp from './pages/SignUp';
import StartPage from './pages/StartPage';

const AppRouter: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<StartPage />} />
          <Route path="login" element={<LoginPage />} loader={loginLoader} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
