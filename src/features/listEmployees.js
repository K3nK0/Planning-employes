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
          if(payload.events.length !== undefined){
            payload.events.forEach(event => {
              currentEmployee.eventsState.push(event)
            })
          }
          else {
            currentEmployee.eventsState.push(payload.events)
          }
          
        },
        handleUpdateEvent: (state, {payload}) => {
          const findEmployee = state.find(employee => employee.id === payload.employeeId)

          const updateEvent = findEmployee.eventsState.find(event => event.id === payload.event.id)
          
          updateEvent.start = payload.event.start
          updateEvent.end = payload.event.end

        }
    }
})

export const {setListEmployees, deleteEmployee, updateStateEmployee, addEventState, handleUpdateEvent} = listEmployees.actions
export default listEmployees.reducer