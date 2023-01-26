import axios from 'axios';
import { BASE_URL } from './constants';
import { IAuthUser, IBoards, IUser } from './models';

export const signIn = async ({
  email,
  password,
}: IUser): Promise<[IUser, IBoards]> => {
  const dbUser = await getUser(email);
  const dbBoard = await getBoard(email);

  let resultBoards: IBoards[] = [];

  if (dbUser.length > 0 && dbUser[0].password === password) {
    return [dbUser[0], dbBoard[0].boards[0]];
  }
  throw new Response('', {
    status: 404,
    statusText: 'User not found!',
  });
};

export const signUp = async (user: IUser): Promise<[IUser, IBoards]> => {
  const currUser = await getUser(user.email);

  if (currUser.length === 0) {
    const resUser = await addUser(user);

    const board = await addBoard(resUser.id);

    return [resUser, board];
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

export const getUser = async (email: string) => {
  return (await axios.get<IUser[]>(`${BASE_URL}users?email=${email}`)).data;
};

export const addUser = async (user: IUser) => {
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
  return res.data;
};

export const getBoard = async (email: string) => {
  return (
    await axios.get<IAuthUser[]>(
      `${BASE_URL}users?email=${email}&_embed=boards`
    )
  ).data;
};

export const addBoard = async (id?: number) => {
  const board = await axios.post<IBoards>(
    BASE_URL + 'boards',
    {
      title: 'Your first board',
      userId: id,
      users: [],
    },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  return board.data;
};
