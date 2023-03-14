import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { curryGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import PostsSlice from "./reducers/food/foodSlice";
import { userApi } from "./reducers/servise/userServise";
import userSlice from "./reducers/user/userSlice";

const rootReducer = combineReducers({
  user: userSlice,
  posts: PostsSlice,
  userApi: userApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (curryGetDefaultMiddleware) =>
    curryGetDefaultMiddleware().concat(userApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
