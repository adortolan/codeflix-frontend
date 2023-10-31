import {
  configureStore,
  ThunkAction,
  Action,
  PreloadedState,
  combineReducers,
} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import categoriesReducer from '../features/categories/CategorySlice';
import { apiSlice } from '../features/api/apiSlice';
import { castMembersApi } from '../services/castMembers';

const rootReducer = combineReducers({
  counter: counterReducer,
  categories: categoriesReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [castMembersApi.reducerPath]: castMembersApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(apiSlice.middleware)
        .concat(castMembersApi.middleware),
  });
};
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
