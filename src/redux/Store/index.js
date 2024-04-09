import reducers from '../Reducers'
import { configureStore } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";

export const config = {
    key: 'root',
    storage: storage,
    blacklist: ['extras'],
};

const persisted = persistReducer(config, reducers);

 const store = configureStore({
	reducer: persisted,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),

})

export default store;