import { createSlice } from "@reduxjs/toolkit";
// import { taskData } from "../data";
interface TaskState {
    tasks: {
        id: number;
        title: string;
        description: string;
        date: string;
        status: "pendente" | "em desenvolvimento" | "terminado";
    }[];
}

const initialState: TaskState = {
    tasks: [],
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
        },
        moveTask: (state, action) => {
            const { id, status } = action.payload;
            const task = state.tasks.find((task) => task.id === id);
            if (task) {
                task.status = status;
            }
        },
        setInitialTasks: (state, action) => {
            const tasks = action.payload;
            
            // * Convertendo tasks para o formato do redux.
            const newTasks = tasks.map((task: {
                ID: number;
                Titulo: string;
                Descricao: string;
                createdAt: string;
                Status: string;
            }) => ({
                id: task.ID,
                title: task.Titulo,
                description: task.Descricao,
                date: task.createdAt,
                status: task.Status,
            }));

            state.tasks = newTasks;
        }
    }
});

export const { addTask, editTask, deleteTask, moveTask, setInitialTasks } = taskSlice.actions;

export default taskSlice.reducer;