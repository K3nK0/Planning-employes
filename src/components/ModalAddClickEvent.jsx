import { useState } from "react"
import { useDispatch } from "react-redux";
import { doc, updateDoc } from "firebase/firestore"; 
import { db } from "../config/firebase";
import { arrayUnion } from "firebase/firestore";
import { addEventState } from "../features/listEmployees";
import {nanoid} from "nanoid"


export default function ModalAddClickEvent({event, employee, closeModal, setNewAddEvent}) {

    const dispatch = useDispatch()

    const [newEvent, setNewEvent] = useState({
        title: "",
        start: event.start,
        end: event.end
    })

    const handleSubmit = async e => {
        e.preventDefault()

        const addEvent = {
            id: nanoid(),
            title: newEvent.title,
            start: newEvent.start,
            end: newEvent.end
        }

        try {
            await updateDoc(doc(db,"employees", employee.id), {
                events: arrayUnion(addEvent)
            })
        } catch (err) {
            console.log("error addClickEvent", err);
        }

        dispatch(addEventState({"employee":employee.id, "event":addEvent}))

        setNewEvent({
            title: "",
            start: event.startStr,
            end: event.endStr
        })

        setNewAddEvent({
            start: "",
            end: ""
        })
        closeModal()

    }

  return (
    <div className="modal">
      <form 
      className="container-modal"
      onSubmit={handleSubmit}
      >
        <h3>Nom de l'événement</h3>
        <div className="input">
            <label htmlFor="event-title">Titre de lévénement</label>
            <input 
            type="text"
            id="event-title"
            placeholder="titre"
            value={newEvent.title}
            onChange={e => setNewEvent({...newEvent, title: e.target.value})}
            />
        </div>
        <div className="container-btns-choice">
                <button
                className='btn-valid'
                >Valider</button>
                <button
                className='btn-delete'
                onClick={closeModal}
                >Annuler</button>
            </div>
      </form>
    </div>
  )
}
