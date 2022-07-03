const register = async (email, username, password) => {
    let response = await fetch("/auth/register", {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({"email": email, "username": username, "password": password})
    });
    let data = await response;
    if (data.status == 201) {
        localStorage.setItem("toLogin", true);
        localStorage.removeItem("user");
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
        return data;
    }

};
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}
const AuthService = {
    register, login, getCurrentUser
}
export default AuthService;
