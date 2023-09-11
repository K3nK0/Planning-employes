import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const listEmployees = createSlice({
    name: "listEmployees",
    initialState,
    reducers: {
        setListEmployees: (state, {payload}) => {
          // console.log("payload",payload);
          return payload;
        },
        deleteEmployee: (state, {payload}) => {
          const findIndex = state.findIndex(employee => employee.id === payload)
          state.splice(findIndex, 1)
        },
        updateStateEmployee: (state, {payload}) => {
          // console.log("update", payload);
          const currentIndex = state.findIndex(employee => employee.id === payload.id);
          if (currentIndex !== -1) {
              state[currentIndex] = {...payload};
          }
        }
    }
})

export const {setListEmployees, deleteEmployee, updateStateEmployee} = listEmployees.actions
export default listEmployees.reducer