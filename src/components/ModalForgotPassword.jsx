import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

export default function ModalForgotPassword({closeModalForgotPassword}) {

    const [emailUser, setEmailUser] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()

        const auth = getAuth();
        sendPasswordResetEmail(auth, emailUser)
        .then(() => {
            // Password reset email sent!
            // ..
            console.log("Email envoyer");
            closeModalForgotPassword()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });

    }
    

  return (
    <div className="modal">
        <form
        onSubmit={handleSubmit}
        className="container-modal"
        >
        
        <div className="input">
            <label htmlFor="emailForgotPassword">Entrer votre email pour le réinitialiser</label>
            <input 
            type="email" 
            id="emailForgotPassword" 
            placeholder="Email" 
            value={emailUser}
            onChange={e => setEmailUser(e.target.value)}
            required
            />
        </div>

        <div className="container-btns-choice">
                <button
                className='btn-valid'
                // onClick={() => handleDelete()}
                >Envoyer</button>
                <button
                className='btn-delete'
                onClick={closeModalForgotPassword}
                >Annuler</button>
            </div>
        </form>
    </div>
  )
}
