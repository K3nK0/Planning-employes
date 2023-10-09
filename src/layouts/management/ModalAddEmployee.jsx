    import traverser from "../../assets/traverser.svg"
import { useState } from "react"
import { useDispatch } from "react-redux";

import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setListEmployees } from "../../features/listEmployees";
import { getEmployees } from "../../utils/getEmpoyees";
import { nanoid } from "nanoid";

export default function ModalAddEmployee({closeModalAddEmployee}) {

    const dispatch = useDispatch()

    const [addEmployee, setAddEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        hoursToDo: 0,
        estimatedHours: 0
    })

    const handleSubmit = async e => {
        e.preventDefault()

        const auth = getAuth();
        const password = "gymLanester56"
        await createUserWithEmailAndPassword(auth, addEmployee.email, password)
        .then(async () => {

            const employee = {
                uid: auth.currentUser.uid,
                lastName: addEmployee.lastName,
                firstName: addEmployee.firstName,
                email: addEmployee.email,
                hoursToDo: addEmployee.hoursToDo,
                estimatedHours: 0,
                eventsState: []
            }

            try {
                // await addDoc(collection(db, "employees"), {
                //     ...employee
                // })
                await setDoc(doc(db, "employees", employee.uid), employee)
            } catch (err) {
                console.log(err);
            }
            getEmployees(dispatch, setListEmployees)
            // Signed up 
            // const user = `${employee.firstName} ${employee.lastName}`;
            // ...
            console.log("user créé");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error createUser",errorMessage);
            // ..
        });

        setAddEmployee({
            lastName: "",
            firstName: "",
            email: "",
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
                <label htmlFor="last-name">Nom</label>
                <input 
                type="text" 
                id="last-name" 
                placeholder="Nom" 
                value={addEmployee.lastName}
                onChange={e => setAddEmployee({...addEmployee, lastName: e.target.value})}
                required
                />
            </div>

            <div className="input">
                <label htmlFor="first-name">Prénom</label>
                <input 
                type="text" 
                id="first-name" 
                placeholder="Prénom" 
                value={addEmployee.firstName}
                onChange={e => setAddEmployee({...addEmployee, firstName: e.target.value})}
                required
                />
            </div>

            <div className="input">
                <label htmlFor="email">Email</label>
                <input 
                type="email" 
                id="email" 
                placeholder="Email" 
                value={addEmployee.email}
                onChange={e => setAddEmployee({...addEmployee, email: e.target.value})}
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
