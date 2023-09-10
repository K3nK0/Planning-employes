import { doc, setDoc } from "firebase/firestore"
import { db } from "../../config/firebase"

import { useState } from "react"

export default function ModalUpdateEmployee({employee, closeModal}) {

    const [updateEmployee, setUpdateEmployee] = useState({
        ...employee
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        const employeeUpdate = {
            name: updateEmployee.name,
            hoursToDo: updateEmployee.hoursToDo,
            estimatedHours: updateEmployee.estimatedHours
        }

        await setDoc(doc(db, "employees", employee.id), {
            ...employeeUpdate
          });

        closeModal()
    }

  return (
    <div className="modal">
        <form 
        onSubmit={handleSubmit}
        className="container-modal">
            <h3>Modification</h3>
            <div className="input">
                <label htmlFor="name">Prénom</label>
                <input 
                type="text" 
                id="name" 
                placeholder="Prénom" 
                value={updateEmployee.name}
                onChange={e => setUpdateEmployee({...updateEmployee, name: e.target.value})}
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
