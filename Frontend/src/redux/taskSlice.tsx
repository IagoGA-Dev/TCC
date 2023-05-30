import { createSlice } from "@reduxjs/toolkit";
import { taskData } from "../data";
interface TaskState {
    tasks: {
        id: number;
        title: string;
        description: string;
        status: "pendente" | "em desenvolvimento" | "terminado";
    }[];
}

const initialState: TaskState = {
    tasks: taskData,
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        editTask: (state, action) => {
            const { id, title, description, status } = action.payload;
            const task = state.tasks.find((task) => task.id === id);
            if (task) {
                task.title = title;
                task.description = description;
                task.status = status;
            }
        }
    }
});

export const { addTask, editTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;