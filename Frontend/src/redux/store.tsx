import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import calendarReducer from "./calendarSlice";
import taskReducer from "./taskSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    calendar: calendarReducer,
    task: taskReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
