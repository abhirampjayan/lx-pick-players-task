import { configureStore } from "@reduxjs/toolkit";
import { playersListApi } from "../services/players";
import { setupListeners } from "@reduxjs/toolkit/query";
import selectedPlayersReducer from "./slice/selectedPlayesSlice";
export const store = configureStore({
  reducer: {
    selectedPlayers: selectedPlayersReducer,
    [playersListApi.reducerPath]: playersListApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(playersListApi.middleware),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
