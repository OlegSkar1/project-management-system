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
import { setBoard } from './boardSlice';

type UserState = {
  isAuth: boolean;
  user: IUser;
  isLoading: boolean;
  error: string | null;
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
      dispatch(setBoard([resBoard]));
      dispatch(setIsAuth(true));
      localStorage.setItem('user', JSON.stringify(resUser));
      localStorage.setItem('boards', JSON.stringify([resBoard]));
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
  void,
  IUser,
  { rejectValue: string; dispatch: AppDispatch }
>('user/login', async (user, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setError(null));
    const dbUser = await signIn(user);
    if (dbUser.name) {
      localStorage.setItem('user', JSON.stringify(dbUser));
      localStorage.setItem('auth', 'true');
      dispatch(setUser(dbUser));
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
  localStorage.removeItem('boards');
  dispatch(setUser({} as IUser));
  dispatch(setBoard([] as IBoards[]));
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

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const { setIsAuth, setIsLoading, setError, setUser } = userSlice.actions;

export default userSlice.reducer;
