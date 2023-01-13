import axios from 'axios';
import { BASE_URL } from './constants';
import { IUser } from './models';
import _ from 'lodash';

export const signIn = async (email: string) => {
  return await axios.get<IUser>(BASE_URL + `users/?email=${email}`);
};

export const signUp = async (user: IUser) => {
  const users = await getUsers();

  const hasUser = _.findIndex(users, { email: user.email });

  if (hasUser === -1) {
    const response = await axios.post<IUser>(BASE_URL + 'users', user, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } else {
    throw new Error('user alredy exist!');
  }
};

export const getUsers = async () => {
  return (await axios.get<IUser[]>(BASE_URL + 'users')).data;
};
