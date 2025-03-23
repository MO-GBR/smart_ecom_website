import userSlice from './Slices/UserSlice';
import adminSlice from './Slices/AdminSlice';
import cartSlice from './Slices/CartSlice';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
    persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    user: userSlice,
	admin: adminSlice,
	cart: cartSlice,
});

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		}
	})
});

export const persistor = persistStore(store);