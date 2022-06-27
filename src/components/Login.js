import AuthService from "../services/auth.service";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import UserService from "../services/user.service";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkanimals, setCheckAnimals] = useState([]);
    const showlogin = localStorage.getItem("toLogin");
    useEffect(() => {
        if (checkanimals.items != undefined || localStorage.getItem("user")) {
            navigate("/animals");
        }
    }, [checkanimals]);
    const getAnima = () => {
        UserService.getAnimals(1)
            .then(r => {
                localStorage.setItem("arrLength", r.totalNumber);
                setCheckAnimals(r);
            });
    }
    const updateEmail = (e) => {
        setEmail(e.target.value);
    }
    const updatePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleLogin = () => {
        AuthService.login(email, password).then(r => {
            if (r.token) {
                getAnima();
            }
        });
    }
    return (
        showlogin ?
            <div>
                <div className="input-credit">
                    <input className="email" placeholder="Email" onChange={updateEmail} value={email || ""}/>
                    <input className="password" placeholder="Password" onChange={updatePassword}
                           value={password || ""}/>
                    <button onClick={() => handleLogin()}></button>
                </div>
            </div> : <div>
                <p>you have to register first</p>
                <a href="/auth/register">here</a>
            </div>
    )
}
