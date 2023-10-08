import { collection, getDocs } from "firebase/firestore";
import {db} from "../config/firebase"
import { addEventState } from "../features/listEmployees";

export const getEmployees = async (dispatch, setListEmployees) => {
  const querySnapshot = await getDocs(collection(db, "employees"));
  const employees = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
  dispatch(setListEmployees(employees))

  employees.forEach(employee => {
    getEventsEmployee(dispatch, addEventState, employee.id)
  })
  
};

export const getEventsEmployee = async (dispatch, addEventState, employeeId) => {
  const querySnapshot = await getDocs(collection(db, "employees", employeeId, "events"));
  const eventsEmployee = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
  dispatch(addEventState({"employee": employeeId ,"events":eventsEmployee}))
}