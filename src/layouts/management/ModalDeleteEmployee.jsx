import { useDispatch } from "react-redux";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { getAuth, deleteUser } from "firebase/auth";
import { deleteEmployee } from "../../features/listEmployees";

export default function ModalDeleteEmployee({employee, closeModal}) {

    const dispatch = useDispatch()

    const handleDelete = id => {
        deleteDoc(doc(db, "employees", id))
        getAuth()
            .deleteUser(id)
            .then(() => {
                console.log('Successfully deleted user');
            })
            .catch((error) => {
                console.log('Error deleting user:', error);
            });
        dispatch(deleteEmployee(id))
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
