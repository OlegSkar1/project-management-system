import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import LayoutPage from '../pages/Layout';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUp from '../pages/SignUp';
import StartPage from '../pages/StartPage';
import { LOGIN, SIGNUP } from './constants';

const AppRouter: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<LayoutPage />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<StartPage />} />
          <Route path={LOGIN} element={<LoginPage />} />
          <Route path={SIGNUP} element={<SignUp />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
