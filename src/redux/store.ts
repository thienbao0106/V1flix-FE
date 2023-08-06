import { configureStore } from "@reduxjs/toolkit";
import genersReducer from "./slices/genersSlice";
import themeReducer from "./slices/themeSlice";
import filmReducer from "./slices/filmSlice";
import accountReducer from "./slices/accountSlice";
export const store = configureStore({
  reducer: {
    geners: genersReducer,
    theme: themeReducer,
    films: filmReducer,
    account: accountReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
