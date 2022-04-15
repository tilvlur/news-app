import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import newsReducer from "../features/news/newsSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    news: newsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
