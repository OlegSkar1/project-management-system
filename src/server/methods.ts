import axios from 'axios';
import { BASE_URL } from './constants';
import { IBoards, IUser } from './models';
import _ from 'lodash';

export const signIn = async ({ email, password }: IUser): Promise<IUser> => {
  const res = await axios.get<IUser[]>(
    BASE_URL + `users/?email=${email}&_embed=dashboards`
  );

  if (res.data.length > 0 && res.data[0].password === password) {
    return res.data[0];
  }
  throw new Response('', {
    status: 404,
    statusText: 'User not found!',
  });
};

export const signUp = async (user: IUser): Promise<IUser> => {
  const users = await getUsers();

  const hasUser = _.findIndex(users, { email: user.email });

  if (hasUser === -1) {
    const res = await axios.post<IUser>(
      BASE_URL + 'users',
      {
        name: user.name,
        email: user.email,
        password: user.password,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    await axios.post<IBoards>(
      BASE_URL + 'dashboards',
      {
        title: '',
        userId: res.data.id,
        users: [],
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const result = await axios.get<IUser>(
      BASE_URL + `users/?email=${user.email}&_embed=dashboards`
    );
    return result.data;
  } else {
    throw new Response('', {
      status: 404,
      statusText: 'User already exist!',
    });
  }
};

export const getUsers = async () => {
  return (await axios.get<IUser[]>(BASE_URL + 'users')).data;
};
