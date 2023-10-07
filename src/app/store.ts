import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import categoriesReducer from '../features/categories/CategorySlice';
import { apiSlice } from '../features/api/apiSlice';
import { castMembersApi } from '../services/castMembers';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    categories: categoriesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [castMembersApi.reducerPath]: castMembersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(castMembersApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
