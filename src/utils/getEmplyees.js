import { collection, getDocs } from "firebase/firestore";
import {db} from "../config/firebase"

export default async function getEmployees() {
    const querySnapshot = await getDocs(collection(db, "employees"));
    const employees = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    // console.log(employees);
    return employees
}