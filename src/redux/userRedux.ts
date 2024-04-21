import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  username: string;
  role: string;
}

interface UserState {
  currentUser: User | null;
  isFetching: boolean;
  error: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isFetching: false,
  error: false,
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
    loginSuccess: (state, action: PayloadAction<User>) => {
      console.log("loginSuccess before", state.isFetching)
      state.isFetching = false;
      console.log("loginSuccess after", state.isFetching)
      console.log("action.payload: ", action.payload);
      state.currentUser = action.payload;
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
