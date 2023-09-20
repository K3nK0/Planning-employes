import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    startDate: (new Date().getMonth() >= 8 ? `${new Date().getFullYear()}-09-01` : `${new Date().getFullYear() - 1}-09-01`),
    endDate: (new Date().getMonth() >= 8 ? `${new Date().getFullYear() + 1}-08-31` : `${new Date().getFullYear()}-08-31`)
}

export const dateInterval = createSlice({
    name: "dateInterval",
    initialState,
    reducers: {
        getDateInterval: (state, {payload}) => {
            console.log("payload", payload);
            if(payload[0] === "startDate"){
                state.startDate = payload[1]
            }
            if(payload[0] === "endDate"){
                state.endDate = payload[1]
            }
        }
    }
})

export const {getDateInterval} = dateInterval.actions
export default dateInterval.reducer