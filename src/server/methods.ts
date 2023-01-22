import axios from 'axios';
import { BASE_URL } from './constants';
import { IUser } from './models';
import _ from 'lodash';

export const signIn = async ({ email, password }: IUser): Promise<IUser> => {
  const res = await axios.get<IUser[]>(BASE_URL + `users/?email=${email}&_embed=dashboard`);

  if (res.data.length > 0 && res.data[0].password === password) {
    return res.data[0];
  }
  throw new Response('', {
    status: 404,
    statusText: 'user not found',
  });
};

export const signUp = async (user: IUser) => {
  const users = await getUsers();

  const hasUser = _.findIndex(users, { email: user.email });

  if (hasUser === -1) {
    await axios.post<IUser>(BASE_URL + 'users', user, {
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    throw new Response('', {
      status: 404,
      statusText: 'user alredy exist!',
    });
  }
};

export const getUsers = async () => {
  return (await axios.get<IUser[]>(BASE_URL + 'users')).data;
};
