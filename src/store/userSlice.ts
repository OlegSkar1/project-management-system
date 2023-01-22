import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { AppDispatch } from '.';
import { signIn } from '../server/methods';
import { IUser } from '../server/models';

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

export const setAsyncUser = createAsyncThunk<IUser, IUser, { rejectValue: string; dispatch: AppDispatch }>(
  'user/setAsyncUser',
  async (user, { rejectWithValue, dispatch }) => {
    dispatch(setIsLoading(true));

    try {
      const res = await signIn(user);
      if (res.name) {
        localStorage.setItem('user', JSON.stringify(res));
        localStorage.setItem('auth', 'true');
        dispatch(setUser(res));
        dispatch(setIsAuth(true));
      }

      dispatch(setIsLoading(false));
      return res;
    } catch (error) {
      const e = error as AxiosResponse;
      return rejectWithValue(e.statusText);
    }
  }
);

export const logout = createAsyncThunk<void, undefined, { dispatch: AppDispatch }>(
  'user/logout',
  async (_, { dispatch }) => {
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
    dispatch(setUser({} as IUser));
    dispatch(setIsAuth(false));
    dispatch(setError(null));
  }
);

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

export const { setIsAuth, setIsLoading, setError, setUser } = userSlice.actions;
export default userSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
