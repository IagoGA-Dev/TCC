import { createSlice } from "@reduxjs/toolkit";
import { eventData } from "../data";

interface CalendarState {
  events: {
    id: number;
    title: string;
    date: Date;
    color: "blue" | "green" | "yellow" | "red";
  }[];
}

const initialState: CalendarState = {
  events: eventData,
};

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        addEvent: (state, action) => {
            state.events.push(action.payload);
        },
        deleteEvent: (state, action) => {
            state.events = state.events.filter((event) => event.id !== action.payload);
        }
    }
});

export const { addEvent, deleteEvent } = calendarSlice.actions;

export default calendarSlice.reducer;