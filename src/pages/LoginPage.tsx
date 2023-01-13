import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { signIn } from '../server/methods';
import { IUser } from '../server/models';

const LoginPage: React.FC = () => {
  const user = useLoaderData() as IUser;

  return <div>{user.email}</div>;
};

export const loginLoader = async () => {
  const res = await signIn('oleg');

  if (!res.data.email) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return res;
};

export default LoginPage;
