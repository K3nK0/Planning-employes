import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function ModalDeleteEmployee({employee, closeModal}) {

    const handleDelete = id => {
        deleteDoc(doc(db, "employees", id))
        closeModal()
    }

  return (
    <div className='modal'>
        <div className="container-modal">
            <h3>Voulez-vous supprimer {employee.name}</h3>
            <div className="container-btns-choice">
                <button
                className='btn-valid'
                onClick={() => handleDelete(employee.id)}
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
