import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const listEmployees = createSlice({
    name: "listEmployees",
    initialState,
    reducers: {
        setEmployees: (state, {payload}) => {
            state = payload
        }
    }
})

export const {} = listEmployees.actions
export default listEmployees.reducer