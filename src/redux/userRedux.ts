import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  username: string;
  role: string;
}

interface UserTokenPair {
  user: User;
  accessToken: string;
}

interface UserState {
  currentUser: User | null;
  isFetching: boolean;
  error: boolean;
  accessToken: string;
}

const initialState: UserState = {
  currentUser: null,
  isFetching: false,
  error: false,
  accessToken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      console.log("loginStart before", state.isFetching)
      state.isFetching = true;
      console.log("loginStart after", state.isFetching)
    },
    loginSuccess: (state, action: PayloadAction<UserTokenPair>) => {
      console.log("loginSuccess before", state.isFetching)
      state.isFetching = false;
      console.log("loginSuccess after", state.isFetching)
      console.log("KOMAL payload : ", action.payload);
      state.currentUser = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
