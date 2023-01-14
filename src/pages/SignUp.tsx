import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { IUser } from '../server/models';

const SignUp: React.FC = () => {
  const user = useLoaderData() as IUser;
  console.log(user);
  return <div>{user.email}</div>;
};

export default SignUp;
