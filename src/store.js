import { configureStore } from "@reduxjs/toolkit";
import listEmployees from "./features/listEmployees";
import userConnected from "./features/userConnected";

export const store = configureStore({
    reducer: {
        listEmployees,
        userConnected
    }
})