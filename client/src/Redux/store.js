import userSlice from './Slices/UserSlice';
import adminSlice from './Slices/AdminSlice';
import cartSlice from './Slices/CartSlice';

import { productsApi } from './RTK/Products';
import { authApi } from './RTK/Auth';
import { cartApi } from './RTK/Cart';
import { orderApi } from './RTK/Order';
import { userApi } from './RTK/User';
import { passportApi } from './RTK/Passport';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

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
	[productsApi.reducerPath]: productsApi.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[cartApi.reducerPath]: cartApi.reducer,
	[orderApi.reducerPath]: orderApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[passportApi.reducerPath]: passportApi.reducer,
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
	}).concat(
		productsApi.middleware,
		authApi.middleware,
		cartApi.middleware,
		orderApi.middleware,
		userApi.middleware,
		passportApi.middleware,
	),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);