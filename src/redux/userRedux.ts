import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  profilePic: string;
  isFollowing?: boolean;
}

export interface UserTokenPair {
  user: User;
  accessToken: string;
}

interface UserState {
  currentUser: User | null;
  isFetching: boolean;
  error: boolean;
  accessToken: string;
  users: User[];
  followers: User[];
  following: User[];
  profileUser: User | null;
}

const initialState: UserState = {
  currentUser: null,
  isFetching: false,
  error: false,
  accessToken: "",
  users: [],
  followers: [],
  following: [],
  profileUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action: PayloadAction<UserTokenPair>) => {
      state.isFetching = false;
      state.currentUser = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logoutSuccess: (state) => {
      console.log("in logout");
      localStorage.clear();
      state.currentUser = null;
      state.accessToken = "";
      state.isFetching = false;
      state.error = false;
      window.location.href = "/login";
    },
    getUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUserSuccess: (state, action: PayloadAction<User[]>) => {
      state.isFetching = false;
      state.users = action.payload;
      state.error = false;
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
      const index = state.users.findIndex(
        (user) => user.id.toString() === action.payload,
      );
      if (index !== -1) {
        state.users.splice(index, 1);
      }
      state.error = false;
    },
    deleteUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (
      state,
      action: PayloadAction<{ id: number; user: User }>,
    ) => {
      state.isFetching = false;
      state.currentUser = action.payload.user;
      state.error = false;
    },
    updateOtherUserSuccess: (
      state,
      action: PayloadAction<{ id: number; user: User }>,
    ) => {
      state.isFetching = false;
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id,
      );
      console.log("index ", index);
      if (index !== -1) {
        state.users[index] = action.payload.user;
      }
      //  state.currentUser = action.payload.user;
      state.error = false;
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateFollowStatus: (state, action: PayloadAction<{ id: string }>) => {
      state.users = state.users.map((user) => {
        if (user.id === parseInt(action.payload.id)) {
          user.isFollowing = !user.isFollowing;
        }
        return user;
      });
    },
    getUserProfileSuccess: (state, action: PayloadAction<User>) => {
      state.profileUser = action.payload;
    },
    addUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUserSuccess: (state, action: PayloadAction<User>) => {
      state.isFetching = false;
      state.users.push(action.payload);
      state.error = false;
    },
    addUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    clearError: (state) => {
      state.error = false;
    },
    tokenExpired: (state) => {
      state.currentUser = null;
      state.accessToken = "";
      state.error = false;
    },
    authenticationInProgress: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    authenticationExpired: (state) => {
      state.currentUser = null;
      state.accessToken = "";
      state.isFetching = false;
      state.error = false;
    },
    rememberMeLogin: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.error = false;
    },
    setFollowers: (state, action: PayloadAction<{ users: User[] }>) => {
      state.followers = action.payload.users;
    },
    setFollowing: (state, action: PayloadAction<{ users: User[] }>) => {
      state.following = action.payload.users;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  clearError,
  tokenExpired,
  authenticationInProgress,
  authenticationExpired,
  rememberMeLogin,
  updateOtherUserSuccess,
  updateFollowStatus,
  setFollowers,
  setFollowing,
  getUserProfileSuccess,
} = userSlice.actions;
export default userSlice.reducer;
