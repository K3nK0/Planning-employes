import { configureStore } from "@reduxjs/toolkit";
import listEmployees from "./features/listEmployees";

export const store = configureStore({
    reducer: {
        listEmployees
    }
})