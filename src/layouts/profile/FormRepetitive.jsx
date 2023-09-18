import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../config/firebase';

import { addEventState } from '../../features/listEmployees';
import { getEventsEmployee } from '../../utils/getEmpoyees';

export default function FormRepetitive({closeModal, employeeID}) {

  const dispatch = useDispatch()

  const [inputsStates, setInputsStates] = useState({
    title: "",
    dayOrWeek: "days",
    interval: 1,
    startDate: "",
    endDate: "",
    startHour: "",
    endHour: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const events = [];
    const startDate = new Date(inputsStates.startDate);
    const endDate = new Date(inputsStates.endDate);
    const interval = parseInt(inputsStates.interval);
    const isWeekly = inputsStates.dayOrWeek === "weeks";
  
    if (startDate > endDate) {
      alert("La date de début doit être antérieure à la date de fin.");
      return;
    }
  
    let currentDate = startDate;
    while (currentDate <= endDate) {
      const event = {
        title: inputsStates.title,
        start: `${currentDate.toISOString().slice(0, 10)}T${inputsStates.startHour}:00`,
        end: `${currentDate.toISOString().slice(0, 10)}T${inputsStates.endHour}:00`,
      };
      events.push(event);
  
      if (isWeekly) {
        currentDate.setDate(currentDate.getDate() + interval * 7);
      } else {
        currentDate.setDate(currentDate.getDate() + interval);
      }
    }

    events.forEach(async event => {
      try {
        await addDoc(collection(db,"employees", employeeID, "events"), {
          ...event
        });
        } catch (error) {
          console.log(error);
        }
    })

    getEventsEmployee(dispatch, addEventState, employeeID)
  };

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

      <div className="container-frequences">
      <p>Tous/toutes les</p>

        <div className="container-radio">
          

            <div className="container-input-radio">
              <input 
              type="radio" 
              name="dayOrWeek" 
              value="days"
              onChange={e => setInputsStates({...inputsStates, dayOrWeek:e.target.value})}
              className='input-radio'
              id="days" 
               />
              <label className='label-radio' htmlFor="days">jours</label>
            </div>
            <div className="container-input-radio">
              <input 
              type="radio" 
              name="dayOrWeek" 
              value="weeks"
              onChange={e => setInputsStates({...inputsStates, dayOrWeek:e.target.value})}
              className='input-radio'
              id="weeks" />
              <label className='label-radio' htmlFor="weeks">semaines</label>
            </div>

        </div>

        <div className="select-interval">
          <label htmlFor="interval">Tous les (x) jours/semaines</label>
          <input 
          type="number" 
          id="interval" 
          value={inputsStates.interval} 
          onChange={e => setInputsStates({...inputsStates, interval:e.target.value})}
          min={1}
          max={7}/>
        </div>

      </div>

      <div className="input input-start-date">
        <label htmlFor="dateEvent">Choisir le premier jour</label>
        <input 
        type="date" 
        id="dateEvent" 
        value={inputsStates.startDate}
        onChange={e => setInputsStates({...inputsStates, startDate:e.target.value})}
        />
      </div>

      <div className="input input-end-date">
        <label htmlFor="dateEvent">Choisir le dernier jour</label>
        <input 
        type="date" 
        id="dateEvent" 
        value={inputsStates.endDate}
        onChange={e => setInputsStates({...inputsStates, endDate:e.target.value})}
        />
      </div>

      <div className="input input-date">
        <label htmlFor="startHourEvent">Heure de début</label>
        <input 
        type="time" 
        id="startHourEvent" 
        value={inputsStates.startHour}
        onChange={e => setInputsStates({...inputsStates, startHour:e.target.value})}
        step="900"
        />
      </div>

      <div className="input input-date">
        <label htmlFor="endHourEvent">Heure de fin</label>
        <input 
        type="time" 
        id="endHourEvent" 
        value={inputsStates.endHour}
        onChange={e => setInputsStates({...inputsStates, endHour:e.target.value})}
        step="900"
        />
      </div>

      <div className="container-btns-choice">
        <button
        className="btn-valid"
        >Ajouter</button>
        <button
        onClick={() => {
          setInputsStates({
            title: "",
            dayOrWeek: "days",
            interval: 1,
            startDate: "",
            endDate: "",
            startHour: "",
            endHour: ""
          });
          closeModal()}}
        className="btn-delete"
        >Annuler</button>
      </div>
      

    </form>
  )
}
