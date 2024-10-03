import sessionReducer from "@/redux-store/slices/session.slice";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({
  session: sessionReducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
