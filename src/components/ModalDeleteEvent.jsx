import { useDispatch } from "react-redux";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { deleteEventState } from "../features/listEmployees";

export default function ModalDeleteEvent({deleteEvent, closeModal, setDeleteEvent}) {

    const dispatch = useDispatch()

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, "employees", deleteEvent.employeeID,"events", deleteEvent.eventID))
        } catch (err) {
            console.log("handleDeleteEvent", err);
        }

        dispatch(deleteEventState({"employeeID":deleteEvent.employeeID, "eventID":deleteEvent.eventID}))

        setDeleteEvent({
            eventID: "",
            employeeID: ""
        })

        closeModal()
    }

  return (
    <div className='modal'>
        <div className="container-modal">
            <h3>Voulez-vous supprimer cet événement?</h3>
            <div className="container-btns-choice">
                <button
                className='btn-valid'
                onClick={() => handleDelete()}
                >Oui</button>
                <button
                className='btn-delete'
                onClick={closeModal}
                >Non</button>
            </div>
        </div>
    </div>
  )
}
