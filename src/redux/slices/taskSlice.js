import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from '@reduxjs/toolkit';

const loadTasksFromLocalStorage = () => {
    try {
        const tasks = localStorage.getItem('tasks');
        
        if (tasks) {
            const parsedTasks = JSON.parse(tasks);
            return parsedTasks;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error loading tasks from localStorage: ', error);
        return [];
    }
};

const initialState = {
    tasks: loadTasksFromLocalStorage().length > 0 ? loadTasksFromLocalStorage() : [
        {
            id: nanoid(),
            title: "Fix payment processing bug",
            description: "Users are experiencing issues with payment processing during checkout.",
            priority: "Moderate",
            status: "Closed",
            assignedTo: "Alex Johnson",
            assignedBy: "Me",
            startDate: new Date("2025-10-01"),
            closedDate: new Date("2025-10-03"),
            approvedDate: new Date("2025-10-04"),
            comments: "Identified the issue with the payment gateway integration. Resolved and tested successfully.",
            timeSpent: 12,
        },
        {
            id: nanoid(),
            title: "Enhance dashboard analytics",
            description: "The analytics dashboard needs additional metrics for better insights.",
            priority: "High",
            status: "Open",
            assignedTo: "Me",
            assignedBy: "Sarah Connor",
            startDate: new Date("2025-06-05"),
            closedDate: null,
            approvedDate: null,
            comments: "Researching additional metrics to include. Initial designs are in progress.",
            timeSpent: 5,
        },
        {
            id: nanoid(),
            title: "Update user profile page",
            description: "The user profile page requires a redesign for better user experience.",
            priority: "Moderate",
            status: "Pending Approval",
            assignedTo: "Me",
            assignedBy: "John Doe",
            startDate: new Date("2025-05-10"),
            closedDate: null,
            approvedDate: null,
            comments: "Completed the redesign. Awaiting feedback from the design team.",
            timeSpent: 8,
        },
        {
            id: nanoid(),
            title: "Implement dark mode feature",
            description: "Add a dark mode option for better accessibility and user preference.",
            priority: "Low",
            status: "In Progress",
            assignedTo: "Emily Smith",
            assignedBy: "Me",
            startDate: new Date("2025-10-12"),
            closedDate: null,
            approvedDate: null,
            comments: "Working on the CSS changes and testing across different devices.",
            timeSpent: 10,
        },
    ],

};

const saveTasksToLocalStorage = (tasks) => {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks to localStorage: ', error);
    }
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action) => {
            const newTask = {
                id: nanoid(),
                ...action.payload,
            }
            state.tasks.push(newTask);
            saveTasksToLocalStorage(state.tasks);
        },
        updateTask: (state, action) => {
            const { id, updatedTask } = action.payload;
            const index = state.tasks.findIndex(task => task.id === id);
            if (index !== -1) {
                state.tasks[index] = { ...state.tasks[index], ...updatedTask };
                saveTasksToLocalStorage(state.tasks);
            }
        },
        deleteTask: (state, action) => {
            const id = action.payload;
            state.tasks = state.tasks.filter(task => task.id !== id);
            saveTasksToLocalStorage(state.tasks);
        },
    },
});

export const { addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;