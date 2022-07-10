import authHeader from "./auth-header";

const API_URL_ANIMALS = "/animals";


const getAnimals = async (page) => {
    let response = await fetch(API_URL_ANIMALS  + `?page=${page}`, {headers: authHeader()});
    let data = await response.json();
    return data;
}
const UserService = {
    getAnimals,
}
export default UserService;
