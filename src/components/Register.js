import AuthService from "../services/auth.service";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const updateUsername = (e) => {
        setUsername(e.target.value);
    }
    const updateEmail = (e) => {
        setEmail(e.target.value);
    }
    const updatePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleRegister = () => {
        AuthService.register(email, username, password)
            .then(r => {
                if(r.status==201){
                    navigate("/auth/login");
                }
            });
    }
    return (
        <div>
            <div className="input-credit">
                <input className="email" placeholder="Email" onChange={updateEmail} value={email || ""}/>
                <input className="username" placeholder="Username" onChange={updateUsername} value={username || ""}/>
                <input className="password" placeholder="Password" type="password" onChange={updatePassword} value={password || ""}/>
                <button onClick={() => handleRegister()}>Register</button>
            </div>
        </div>
    )
}
