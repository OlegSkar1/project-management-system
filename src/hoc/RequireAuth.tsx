import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  isAuth: boolean;
  id?: number;
  redirectPath?: string;
  children: JSX.Element;
};

const RequireAuth: FC<Props> = ({
  isAuth,
  id,
  redirectPath = '/login',
  children,
}) => {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export { RequireAuth };
