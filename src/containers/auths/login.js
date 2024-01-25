import React, {useState} from "react"
import {useDispatch} from "react-redux";
import {loginFxn} from "./actions";
import {notification} from "../../components/Elements/appUtils";
import {Socket} from "../../socket";
import {useNavigate} from "react-router-dom";

let initState = {
    email: "",
    password: ""
}
const Login = () => {
    const navigate = useNavigate();

    let dispatch = useDispatch()
    let [state, setState] = useState(initState);
    let events = {
        _updateState: (data) => {
            setState((prevState) => {
                return {
                    ...prevState,
                    ...data
                }
            })
        },
        handleSubmit: async (e) => {
            e.preventDefault()
            if (!state.email) {
                notification.warning({message: "Enter email address"})
                return
            }
            if (!state.password) {
                notification.warning({message: "Enter password"})
                return
            }
            let x = await dispatch(loginFxn(state))

            if (x.success) {
                // console.log(x)
                localStorage.setItem('token', x.token)
                localStorage.setItem('user', JSON.stringify(x.user))

                dispatch({
                    type: 'SET_CURRENT_USER',
                    user: x.user
                })


                if (!Socket.connected) {
                    Socket.connect()
                }

                setTimeout(() => {
                    window.location.href = "/dashboard"
                }, 1000)
            }
        }
    }


    return (
        <>

            <div class="main-wrapper">
                <div class="account-content">
                    <div class="login-wrapper">
                        <div class="login-content">
                            <div class="login-userset">
                                <div class="login-logo logo-normal">
                                    <img src={'../assets/logos/thrones_logo.png'} alt="img"/>
                                </div>
                                <a href="../../index.html" class="login-logo logo-white">
                                    <img src={'../assets/logos/thrones_logo.png'} alt=""/>
                                </a>
                                <div class="login-userheading">
                                    <h3>Sign In</h3>
                                    <h4>Please login to your account</h4>
                                </div>
                                <form onSubmit={events.handleSubmit}>
                                    <div className="form-login">
                                        <label>Email</label>
                                        <div className="form-addons">
                                            <input type="text" placeholder="Enter your email address"
                                                   value={state.email}
                                                   onChange={({target}) => {
                                                       events._updateState({email: target.value})
                                                   }}
                                            />
                                            <img src="../assets/img/icons/mail.svg" alt="img"/>
                                        </div>
                                    </div>
                                    <div className="form-login">
                                        <label>Password</label>
                                        <div className="pass-group">
                                            <input type="password"
                                                   value={state.password}
                                                   onChange={({target}) => {
                                                       events._updateState({password: target.value})
                                                   }}
                                                   className="pass-input" placeholder="Enter your password"/>
                                            <span className="fas toggle-password fa-eye-slash"></span>
                                        </div>
                                    </div>

                                    <div className="form-login">
                                        <button className="btn btn-login">Sign In</button>
                                    </div>
                                </form>


                            </div>
                        </div>
                        <div class="login-img">
                            <img src="../assets/img/login.jpg" alt="img"/>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Login
