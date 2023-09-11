import { collection, getDocs } from "firebase/firestore";
import {db} from "../config/firebase"

export const getEmployees = async (dispatch, setListEmployees) => {
    const querySnapshot = await getDocs(collection(db, "employees"));
    const employees = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    dispatch(setListEmployees(employees))
  };