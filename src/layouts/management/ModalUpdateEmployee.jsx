import { useDispatch } from "react-redux"

import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebase"

import { useState } from "react"
import { updateStateEmployee } from "../../features/listEmployees"

export default function ModalUpdateEmployee({employee, closeModal}) {

    const dispatch = useDispatch()

    const [updateEmployee, setUpdateEmployee] = useState({
        ...employee
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        const employeeUpdate = {
            id: updateEmployee.id,
            lastName: updateEmployee.lastName,
            firstName: updateEmployee.firstName,
            email: updateEmployee.email,
            hoursToDo: updateEmployee.hoursToDo,
            estimatedHours: updateEmployee.estimatedHours
        }

        await updateDoc(doc(db, "employees", employee.id), employeeUpdate);
        dispatch(updateStateEmployee(employeeUpdate))

        closeModal()
    }

  return (
    <div className="modal">
        <form 
        onSubmit={handleSubmit}
        className="container-modal">
            <h3>Modification</h3>

            <div className="input">
                <label htmlFor="last-name">Nom</label>
                <input 
                type="text" 
                id="last-name" 
                placeholder="Nom" 
                value={updateEmployee.lastName}
                onChange={e => setUpdateEmployee({...updateEmployee, lastName: e.target.value})}
                required
                />
            </div>

            <div className="input">
                <label htmlFor="first-name">Prénom</label>
                <input 
                type="text" 
                id="first-name" 
                placeholder="Prénom" 
                value={updateEmployee.firstName}
                onChange={e => setUpdateEmployee({...updateEmployee, firstName: e.target.value})}
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
                value={updateEmployee.hoursToDo}
                onChange={e => setUpdateEmployee({...updateEmployee, hoursToDo: e.target.value})}
                />
            </div>
            <div className="container-btns-choice">
                <button
                type='submit'
                className='btn-valid'
                >Valider</button>
                <button
                type='button'
                className='btn-delete'
                onClick={closeModal}
                >Annuler</button>
            </div>
        </form>
    </div>
  )
}
