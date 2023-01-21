import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { useEffect } from 'react';
import { RequireAuth } from '../hoc/RequireAuth';
import { DashboardPage } from '../pages/Dashboard';
import { ErrorPage } from '../pages/ErrorPage';
import { LayoutPage } from '../pages/Layout';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUpPage';
import { StartPage } from '../pages/StartPage';
import { DASHBOARD, LOGIN, SIGNUP } from './constants';
import { useAppDispatch, useAppSelector } from '../hooks/rtkHooks';
import { setIsAuth, setUser } from '../store/userSlice';
import { IUser } from '../server/models';

export const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      dispatch(
        setUser({ name: localStorage.getItem('username' || '') } as IUser)
      );
      dispatch(setIsAuth(true));
    }
  }, [dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<LayoutPage />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<StartPage />} />
          <Route path={LOGIN} element={<LoginPage />} />
          <Route path={SIGNUP} element={<SignUpPage />} />
          <Route
            path={DASHBOARD}
            element={
              <RequireAuth isAuth={isAuth}>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<div>error-page</div>} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
