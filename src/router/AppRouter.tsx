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
import { setBoard, setIsAuth, setUser } from '../store/userSlice';
import { IBoards, IUser } from '../server/models';
import { getUsers } from '../server/methods';

export const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.user);

  // getUsers(); тестовый код для проверки нормализации

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      const storageUser = localStorage.getItem('user');
      const storageBoard = localStorage.getItem('board');

      if (storageUser) {
        dispatch(setUser(JSON.parse(storageUser) as IUser));
      }
      if (storageBoard) {
        dispatch(setBoard(JSON.parse(storageBoard[0]) as IBoards));
      }

      dispatch(setIsAuth(true));
    }
  }, [dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<LayoutPage />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<StartPage />} />
          <Route path={SIGNUP} element={<SignUpPage />} />
          <Route path={LOGIN} element={<LoginPage />} />
          <Route
            path={`:id/${DASHBOARD}`}
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
