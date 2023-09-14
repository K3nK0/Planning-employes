import traverser from "../../assets/traverser.svg"
import { useState } from "react"
import { useDispatch } from "react-redux";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { setListEmployees } from "../../features/listEmployees";
import { getEmployees } from "../../utils/getEmpoyees";

export default function ModalAddEmployee({closeModalAddEmployee}) {

    const dispatch = useDispatch()

    const [addEmployee, setAddEmployee] = useState({
        name: "",
        hoursToDo: 0,
        estimatedHours: 0
    })

    const handleSubmit = async e => {
        e.preventDefault()

        const employee = {
            name: addEmployee.name,
            hoursToDo: addEmployee.hoursToDo,
            estimatedHours: 0,
            eventState: []
        }

        try {
            await addDoc(collection(db, "employees"), {
                ...employee
            })
        } catch (err) {
            console.log(err);
        }
        getEmployees(dispatch, setListEmployees)

        setAddEmployee({
            name: "",
            hoursToDo: 0,
            estimatedHours: 0
        })

        closeModalAddEmployee()
    }

  return (
    <div className="modal">
        <form 
        onSubmit={handleSubmit}
        className="container-modal">
            <h3>Renseigner un nouvel employé</h3>
            <div className="input">
                <label htmlFor="name">Prénom</label>
                <input 
                type="text" 
                id="name" 
                placeholder="Prénom" 
                value={addEmployee.name}
                onChange={e => setAddEmployee({...addEmployee, name: e.target.value})}
                required
                />
            </div>
            <div className="input">
                <label htmlFor="hoursTodo">Heures à effectuer</label>
                <input 
                type="number" 
                id="hoursTodo" 
                placeholder="Entrer un nombre" 
                min={0}
                value={addEmployee.hoursToDo}
                onChange={e => setAddEmployee({...addEmployee, hoursToDo: e.target.value})}
                />
            </div>
            <button className="btn-send">Envoyer</button>
            <img 
            src={traverser} 
            alt="" 
            onClick={closeModalAddEmployee}
            className="traverser" />
        </form>
    </div>
  )
}
