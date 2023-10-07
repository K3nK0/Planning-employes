import { useEffect, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../config/firebase"

import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserConnected } from "../features/userConnected";
import { getEmployees } from "../utils/getEmpoyees";
import { setListEmployees } from "../features/listEmployees";

export default function Login() {

  const navigate = useNavigate()

  const userConnect = useSelector(state => state.userConnected)
  const listEmployees = useSelector(state => state.listEmployees)

  const dispatch = useDispatch()

  async function getEmployeeConnect() {
    try {
      await getEmployees(dispatch, setListEmployees);
      console.log("getEmployeeConnect", listEmployees);
  
      let linkNavigate = "/management"; // Par défaut, si aucun employé correspondant n'est trouvé
  
      for (const employee of listEmployees) {
        console.log("employee forOf");
        if (auth.currentUser.uid === employee.id) {
          linkNavigate = `/profile/${employee.id}`;
          break; // Sortez de la boucle une fois que vous avez trouvé une correspondance
        }
      }
  
      navigate(linkNavigate);
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des employés : ", error);
      // Gérer l'erreur ici, par exemple en redirigeant vers une page d'erreur
    }
  }
  
  async function getDataAfterLogin() {
    console.log("getDataAfterLogin");
    // await getEmployeeConnect();
    navigate("/management");
    dispatch(getUserConnected(true));
  }
  

  const [loginForm, setLoginForm] = useState({
      email: "",
      pwd: ""
  })

  const handleSubmit = async (e) => {
      e.preventDefault()

      // console.log("loginForm", loginForm);
      try {
          await signInWithEmailAndPassword(auth, loginForm.email, loginForm.pwd)
          .then(async (data) => {
            if(data.operationType === "signIn") {
              await getEmployees(dispatch, setListEmployees);
              getDataAfterLogin()

              // const user = auth.currentUser
            }
          })
      } catch (error) {
          console.log(error);
      }
    }

  return (
    <>
      {userConnect ? <Outlet /> : 
      <div className="modal modal-login">
        <form 
        onSubmit={handleSubmit}
        className="container-modal"
        >
          <h3>Connectez vous</h3>

          <div className="input">
              <label htmlFor="email">Email</label>
              <input 
              type="email" 
              id="email" 
              placeholder="votre_email@mail.fr"
              value={loginForm.email}
              onChange={e => setLoginForm({...loginForm, email: e.target.value})}
              required
              maxLength={30}
              />
          </div>

          <div className="input">
              <label htmlFor="pwd">Password</label>
              <input 
              type="password" 
              id="pwd" 
              value={loginForm.pwd}
              onChange={e => setLoginForm({...loginForm, pwd: e.target.value})}
              required
              maxLength={30}
              />
          </div>

          <button className="btn-send">Connection</button>

        </form>
      </div>}
    </>
  )
}
