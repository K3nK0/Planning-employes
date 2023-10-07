import { useDispatch } from "react-redux";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { getAuth, deleteUser } from "firebase/auth";
import { deleteEmployee } from "../../features/listEmployees";

export default function ModalDeleteEmployee({employee, closeModal}) {

    console.log("id", employee.id);

    const dispatch = useDispatch()

    const handleDelete = async id => {
        try {

            await deleteUser(id);
      
            await deleteDoc(doc(db, "employees", id));
      
            // Dispatchez une action Redux pour supprimer l'employé
            dispatch(deleteEmployee(id));
            closeModal(); // Fermez le modal après la suppression
          } catch (error) {
            console.error("Erreur lors de la suppression de l'employé:", error);
            // Gérez l'erreur ici si nécessaire
          }
    }

  return (
    <div className='modal'>
        <div className="container-modal">
            <h3>Voulez-vous supprimer {employee.lastName} {employee.firstName}</h3>
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
