import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  username: string;
  role: string;
  email: string;


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
  users: User[];
}

const initialState: UserState = {
  currentUser: null,
  isFetching: false,
  error: false,
  accessToken: '',
  users: [],
 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
   
      state.isFetching = true;

    },
    loginSuccess: (state, action: PayloadAction<UserTokenPair>) => {

      state.isFetching = false;

      state.currentUser = action.payload.user;
      state.accessToken = action.payload.accessToken;
      // state.users.push(action.payload.user);

    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    },
    getUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUserSuccess: (state, action: PayloadAction<User[]>) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserSuccess: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      const index = state.users.findIndex(user => JSON.stringify(user.id) === action.payload);
      if (index !== -1) {
        state.users.splice(index, 1);
      }
    },
    deleteUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action: PayloadAction<{id: string, user: User}>) => {
      state.isFetching = false;
      const index = state.users.findIndex(user => JSON.stringify(user.id) === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload.user;
      }
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUserSuccess: (state, action: PayloadAction<User>) => {
      state.isFetching = false;
      state.users.push(action.payload);
    },
    addUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logoutSuccess, 
  getUserStart,getUserSuccess ,getUserFailure,
  deleteUserStart,deleteUserSuccess,deleteUserFailure
  ,updateUserStart,updateUserSuccess,updateUserFailure,
  addUserStart,addUserSuccess,addUserFailure
} = userSlice.actions;
export default userSlice.reducer;
