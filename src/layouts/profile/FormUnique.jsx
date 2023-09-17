import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../config/firebase';

import { addEventState } from '../../features/listEmployees';
import { getEventsEmployee } from '../../utils/getEmpoyees';

export default function FormUnique({closeModal, employeeID}) {

    const dispatch = useDispatch()

    const [inputsStates, setInputsStates] = useState({
        title: "",
        date: "",
        startHour: "",
        endHour: ""
      })

      const handleSubmit = async (e) => {
        e.preventDefault()
    
        const event = {
          title: inputsStates.title,
          start: `${inputsStates.date}T${inputsStates.startHour}:00`,
          end: `${inputsStates.date}T${inputsStates.endHour}:00`,
        }
    
        try {
            await addDoc(collection(db,"employees", employeeID, "events"), {
            ...event
          });
        } catch (error) {
          console.log(error);
        }
        getEventsEmployee(dispatch, addEventState, employeeID)
      }

  return (
    <form
    className="form-add-event"
    onSubmit={handleSubmit}
    >

      <div className="input input-name-event">
        <label htmlFor="titleEvent">Titre</label>
        <input 
        type="text" 
        id="titleEvent" 
        placeholder="Titre de l'évènement" 
        value={inputsStates.title}
        onChange={e => setInputsStates({...inputsStates, title:e.target.value})}
        required />
      </div>

      <div className="input input-date">
        <label htmlFor="dateEvent">Choisir le jour</label>
        <input 
        type="date" 
        id="dateEvent" 
        value={inputsStates.date}
        onChange={e => setInputsStates({...inputsStates, date:e.target.value})}
        required
        />
      </div>

      <div className="input input-date">
        <label htmlFor="startHourEvent">Heure de début</label>
        <input 
        type="time" 
        id="startHourEvent" 
        value={inputsStates.startHour}
        onChange={e => setInputsStates({...inputsStates, startHour:e.target.value})}
        required
        />
      </div>

      <div className="input input-date">
        <label htmlFor="endHourEvent">Heure de fin</label>
        <input 
        type="time" 
        id="endHourEvent" 
        value={inputsStates.endHour}
        onChange={e => setInputsStates({...inputsStates, endHour:e.target.value})}
        required
        />
      </div>

      <div className="container-btns-choice">
        <button
        className="btn-valid"
        >Ajouter</button>

        <button
        type='button'
        onClick={() => {
            setInputsStates({
                title: "",
                date: "",
                startHour: "",
                endHour: "",
            })
            closeModal()}}
        className="btn-delete"
        >Annuler</button>
      </div>
      

    </form>
  )
}
