import AuthService from "./auth.service";

export default function authHeader() {
    let user;
    AuthService.currentUser.subscribe(x=> user=x)

    if (user && user.token) {
        return {Authorization: 'Bearer ' + user.token};
    } else {
        return {};
    }
}
