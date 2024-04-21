import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { REDUX_KEY } from '@/constants/constants';
import { moneyApi } from '@/services/moneyService';
import { productApi } from '@/services/productService';
import { transactionSessionApi } from '@/services/transactionSessionService';
import { CURRENT_ENVIRONMENT, Environment } from '@/utils/environmentUtils';

const services = {
  [productApi.reducerPath]: productApi.reducer,
  [moneyApi.reducerPath]: moneyApi.reducer,
  [transactionSessionApi.reducerPath]: transactionSessionApi.reducer,
};

const combinedReducers = combineReducers({
  ...services,
});

const persistedReducer = persistReducer(
  {
    key: REDUX_KEY,
    version: 1,
    storage,
  },
  combinedReducers,
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productApi.middleware,moneyApi.middleware, transactionSessionApi.middleware),
  devTools: CURRENT_ENVIRONMENT !== Environment.Production,
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;

export default store;
