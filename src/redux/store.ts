import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";
import errorReducer from "./slices/errorSlice";
const store = configureStore({
  reducer: {
    task: taskReducer,
    error: errorReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
