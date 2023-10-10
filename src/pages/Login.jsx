import "../styles/login.css"

import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../config/firebase"

import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserConnected } from "../features/userConnected";
import { getEmployees } from "../utils/getEmpoyees";
import { setListEmployees } from "../features/listEmployees";
import { createPortal } from "react-dom";

import ModalForgotPassword from "../components/ModalForgotPassword";

export default function Login() {

  const navigate = useNavigate()
  const [wrongConnection, setWrongConnection] = useState("")
  const [showModalForgotPassword, setShowModalForgotPassword] = useState(false)

  const userConnect = useSelector(state => state.userConnected)

  const dispatch = useDispatch()

  function getEmployeeConnect(dataEmployees) {

    let userRole
    let userId = auth.currentUser.uid
    let linkNavigate = "/management";
  
    for(const employee of dataEmployees) {
      if(auth.currentUser.uid === employee.uid) {
        linkNavigate = `/profile/${employee.id}`;
        userRole = "employee"
        userId = employee.id
        break;
      }
      else userRole = "admin"
    }
    navigate(linkNavigate);
    dispatch(getUserConnected({"connected": true, "role": userRole, "userID": userId}));
  }
  
  async function getDataAfterLogin() {
    
    try {
      const dataEmployees = await getEmployees(dispatch, setListEmployees);
      getEmployeeConnect(dataEmployees);
    } catch (error) {
      console.log(error);
    }
    
  }
  
  const [loginForm, setLoginForm] = useState({
      email: "",
      pwd: ""
  })

  const handleSubmit = async (e) => {
      e.preventDefault()
      try {
          await signInWithEmailAndPassword(auth, loginForm.email, loginForm.pwd)
          .then((data) => {
            if(data.operationType === "signIn") {
              setWrongConnection("")
              getDataAfterLogin()
            }
          })
      } catch (error) {
          console.log(error);
          setWrongConnection("Mauvais mail/mot de passe")
      }
    }

  return (
    <>
      {userConnect.connected ? <Outlet /> : 
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

          <p className="txt-wrong-connection">{wrongConnection}</p>

          <button className="btn-send">Connection</button>

          <button 
          type="button"
          className="btn-forgot-password"
          onClick={() => setShowModalForgotPassword(true)}
          >
            Mot de passe oublié
          </button>

        </form>
      </div>}

      {showModalForgotPassword && createPortal(<ModalForgotPassword closeModalForgotPassword={() => setShowModalForgotPassword(false)} />, document.body)}
    </>
  )
}
