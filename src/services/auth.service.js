import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));

const register = async (email, username, password) => {
    let response = await fetch("/auth/register", {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({"email": email, "username": username, "password": password})
    });
    let data = await response;

    if (data.status === 201) {
        return data;
    }
};

const login = async (email, password) => {
    let response = await fetch("/auth/login", {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({"email": email, "password": password})
    })
    let data = await response.json();

    if (data.token) {
        localStorage.setItem("user", JSON.stringify(data));
        currentUserSubject.next(data);//updates with last localstorage change
        return data;
    }

};

const logout=()=> {
    localStorage.removeItem('user');
    localStorage.removeItem('arrLength');
    currentUserSubject.next(null);//updates with last localstorage change
}

const AuthService = {
    register, login,logout, currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }//exporting function with last localstoragechange
}

export default AuthService;
