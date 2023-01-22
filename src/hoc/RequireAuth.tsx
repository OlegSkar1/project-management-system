import { FC } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';

type Props = {
  isAuth: boolean;
  id?: string;
  redirectPath?: string;
  children: JSX.Element;
};

const RequireAuth: FC<Props> = ({ isAuth, id, redirectPath = '/login', children }) => {
  const params = useParams();

  if (!isAuth && id !== params.id) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export { RequireAuth };
