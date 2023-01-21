import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  isAuth: boolean;
  redirectPath?: string;
  children: JSX.Element;
};

const RequireAuth: FC<Props> = ({
  isAuth,
  redirectPath = '/login',
  children,
}) => {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export { RequireAuth };
