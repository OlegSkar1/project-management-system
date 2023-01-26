import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { AppDispatch } from '.';
import { signIn, signUp } from '../server/methods';
import { IBoards, IUser } from '../server/models';

type UserState = {
  isAuth: boolean;
  user: IUser;
  isLoading: boolean;
  error: string | null;
  board: IBoards;
};

const initialState: UserState = {
  isAuth: false,
  isLoading: false,
  error: null,
  user: {
    name: '',
    email: '',
    password: '',
  },
  board: {
    title: '',
    userId: 0,
    users: [],
  },
};

export const signUpUser = createAsyncThunk<
  undefined,
  IUser,
  { rejectValue: string; dispatch: AppDispatch }
>('user/signUpUser', async (user, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setError(null));

    const [resUser, resBoard] = await signUp(user);

    if (resUser.name) {
      dispatch(setUser(resUser));
      dispatch(setBoard(resBoard));
      dispatch(setIsAuth(true));
      localStorage.setItem('user', JSON.stringify(resUser));
      localStorage.setItem('board', JSON.stringify(resBoard));
      localStorage.setItem('auth', 'true');
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    dispatch(setIsLoading(false));
    const e = error as AxiosResponse;
    return rejectWithValue(e.statusText);
  }
});

export const login = createAsyncThunk<
  undefined,
  IUser,
  { rejectValue: string; dispatch: AppDispatch }
>('user/login', async (user, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setError(null));
    const [dbUser, dbBoards] = await signIn(user);
    if (dbUser.name) {
      localStorage.setItem('user', JSON.stringify(dbUser));
      localStorage.setItem('board', JSON.stringify(dbBoards));
      localStorage.setItem('auth', 'true');
      dispatch(setUser(dbUser));
      dispatch(setBoard(dbBoards));
      dispatch(setIsAuth(true));
    }

    dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsLoading(false));
    const e = error as AxiosResponse;
    return rejectWithValue(e.statusText);
  }
});

export const logout = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch }
>('user/logout', async (_, { dispatch }) => {
  localStorage.removeItem('user');
  localStorage.removeItem('auth');
  localStorage.removeItem('board');
  dispatch(setUser({} as IUser));
  dispatch(setBoard({} as IBoards));
  dispatch(setIsAuth(false));
  dispatch(setError(null));
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setBoard: (state, action: PayloadAction<IBoards>) => {
      state.board = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
      state.isLoading = false;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const { setIsAuth, setIsLoading, setError, setUser, setBoard } =
  userSlice.actions;
export default userSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
