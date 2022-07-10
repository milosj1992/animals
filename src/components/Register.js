import AuthService from "../services/auth.service";
import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from "react-validation/build/button";
import validator from 'validator';


const required = value => {
    if (!value) {
        return (
            <div>
                This field is required!
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div>
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};
const emailvalidation = (value) => {
    if (!validator.isEmail(value)) {
        return `${value} is not a valid email.`
    }
};

export const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const currentForm = useRef();
    const afterForm = useRef();

    const updateUsername = (e) => {
        setUsername(e.target.value);
    }
    const updateEmail = (e) => {
        setEmail(e.target.value);
    }
    const updatePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleRegister = (e) => {
        e.preventDefault();
        currentForm.current.validateAll();
        if (afterForm.current.context._errors.length === 0) {
            AuthService.register(email, username, password)
                .then(r => {
                    if (r.status === 201) {
                        navigate("/auth/login");
                    }
                });
        }
    }
    return (
        <Form onSubmit={(e) => handleRegister(e)} ref={currentForm}>
            <div>
                <div className="input-credit">
                    <Input className="email" placeholder="Email" onChange={updateEmail} value={email || ""}
                           validations={[required, emailvalidation]} name="email"/>
                    <Input className="username" placeholder="Username" onChange={updateUsername}
                           value={username || ""} validations={[required, vusername]} name="username"/>
                    <Input className="password" placeholder="Password" type="password" onChange={updatePassword}
                           value={password || ""} validations={[required, vpassword]} name="password"/>

                </div>
                <button>Submit</button>
            </div>
            <CheckButton
                style={{display: "none"}}
                ref={afterForm}
            />
        </Form>
    )
}
