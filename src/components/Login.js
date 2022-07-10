import AuthService from "../services/auth.service";
import {useEffect, useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import UserService from "../services/user.service";
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


export const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkanimals, setCheckAnimals] = useState([]);

    const currentForm = useRef();
    const afterForm = useRef();

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
    const handleLogin = (e) => {
        e.preventDefault();
        currentForm.current.validateAll();

        if (afterForm.current.context._errors.length === 0) {
            AuthService.login(email, password)
                .then(r => {
                    if (r.token) {
                        getAnima();
                    }
                });
        }
    }
    return (
        <Form onSubmit={(e) => handleLogin(e)}
              ref={currentForm}>
            <div>
                <div className="input-credit">
                    <Input className="email" placeholder="Email" validations={[required, emailvalidation]}
                           onChange={updateEmail} value={email || ""} name="email"/>
                    <Input className="password" placeholder="Password" type="password" onChange={updatePassword}
                           value={password || ""} validations={[required, vpassword]} name="password"/>
                    <button>Submit</button>
                </div>
            </div>
            <CheckButton
                style={{display: "none"}}
                ref={afterForm}
            />
        </Form>
    )
}
