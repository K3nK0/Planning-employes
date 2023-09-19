import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../config/firebase"

import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserConnected } from "../features/userConnected";

export default function Login() {

  const navigate = useNavigate()

  const userConnect = useSelector(state => state.userConnected)
  console.log("userConnect",userConnect);

  const dispatch = useDispatch()

    const [loginForm, setLoginForm] = useState({
        email: "",
        pwd: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("loginForm", loginForm);
        try {
            await signInWithEmailAndPassword(auth, loginForm.email, loginForm.pwd)
            .then(data => {
              if(data.operationType === "signIn") {
                dispatch(getUserConnected(true))
                navigate("/management")
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
