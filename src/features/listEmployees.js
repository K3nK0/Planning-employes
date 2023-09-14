import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const listEmployees = createSlice({
    name: "listEmployees",
    initialState,
    reducers: {
        setListEmployees: (state, {payload}) => {
          return payload;
        },
        deleteEmployee: (state, {payload}) => {
          const findIndex = state.findIndex(employee => employee.id === payload)
          state.splice(findIndex, 1)
        },
        updateStateEmployee: (state, {payload}) => {
          const currentIndex = state.findIndex(employee => employee.id === payload.id);
          if (currentIndex !== -1) {
              state[currentIndex] = {...payload};
          }
        },
        addEventState: (state, {payload}) => {
          const currentEmployee = state.find(employeeState => employeeState.id === payload.employee)
          currentEmployee.events.push(payload.event)
        }
    }
})

export const {setListEmployees, deleteEmployee, updateStateEmployee, addEventState} = listEmployees.actions
export default listEmployees.reducer