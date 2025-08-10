import { configureStore } from "@reduxjs/toolkit";
import { baseApi, internalApi } from "./api/baseApi";
import applicationReducer from "./slice/applicationSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [internalApi.reducerPath]: internalApi.reducer,
    application: applicationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, internalApi.middleware),
});
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
