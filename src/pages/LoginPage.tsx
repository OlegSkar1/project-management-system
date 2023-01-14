import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { IUser } from '../server/models';

const LoginPage: React.FC = () => {
  const user = useLoaderData() as IUser;

  return <div>{user.email}</div>;
};

export default LoginPage;
