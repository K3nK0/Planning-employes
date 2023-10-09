import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    connected: false,
    role: "",
    userId: ""
}

export const userConnected = createSlice({
    name: "userConnected",
    initialState,
    reducers: {
        getUserConnected: (state, {payload}) => {
            return payload
        }
    }
})

export const {getUserConnected} = userConnected.actions
export default userConnected.reducer