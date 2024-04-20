import { configureStore, combineReducers } from "@reduxjs/toolkit"; 
import shoppingCartReducer from "./shoppingCartRedux";
import productReducer from "./productRedux";
import userReducer from "./userRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const rootReducer = combineReducers({
  shoppingCart: shoppingCartReducer, 
  user: userReducer,
  product: productReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create the store instance
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor with the store instance
export let persistor = persistStore(store)

// Define RootState using the store's getState method
export type RootState = ReturnType<typeof store.getState>;
