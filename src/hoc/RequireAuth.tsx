import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type Props = {
  children: JSX.Element;
};

const RequireAuth: FC<Props> = ({ children }) => {
  const location = useLocation();
  const user = localStorage.getItem('user') || '';

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export { RequireAuth };
