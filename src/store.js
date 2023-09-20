import { configureStore } from "@reduxjs/toolkit";
import listEmployees from "./features/listEmployees";
import userConnected from "./features/userConnected";
import dateInterval from "./features/dateInterval";

export const store = configureStore({
    reducer: {
        listEmployees,
        userConnected,
        dateInterval
    }
})