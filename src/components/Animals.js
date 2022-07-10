import UserService from "../services/user.service";
import {useEffect, useState} from "react";

const styles = {
    animalWrapper: {
        display: "flex",
        flexFlow: "column",
        gap: "10px",
        flexWrap: "wrap"
    },
    animalinMap: {
        display: "flex",
        justifyContent: "flex-start",
        gap: "10px",
        border: "3px solid blue",
        padding: "5px",
        borderRadius: "4px",
        flexWrap: "wrap"
    }

}
export const Animals = () => {

    const animalLength = localStorage.getItem("arrLength");

    const [animal, setAnimal] = useState([]);
    const [pagecounter, setPagecounter] = useState(parseInt(animalLength / 20) + (animalLength%20===0?0:1));//if we have 40 animals thats 2 requests
    //because request returns maximum 20 animals,if we have 39 animals remainder is not 0
    // and we need to add 1 because integer of 39/20 is 1 and that will not leave us without last request

    useEffect(() => {
        if (pagecounter !== 0 && animalLength != null) {
            UserService.getAnimals(pagecounter).then(response => setAnimal(animal.concat(response.items))).then(setPagecounter(pagecounter - 1));
        }
    }, [animal,pagecounter,animalLength]);

    return (<div style={styles.animalWrapper}>
        {animal !== undefined && animal[0] !== undefined ?
            animal.map((item, key) => {
                return (
                    <div key={key} style={styles.animalinMap}>
                        <div>averageLifeExpectancy: {item.averageLifeExpectancy}</div>
                        <div>color: {item.color}</div>
                        <div>gender: {item.gender}</div>
                        <div>maxSpeed: {item.maxSpeed}</div>
                        <div>type: {item.type}</div>
                        <div>Origin: {item.origin}</div>
                    </div>)
            }) :
            animalLength != null ? <div>Animals loading...</div> :
                <div>
                    <p>you have to login first</p>
                    <a href="/auth/login">here</a>
                </div>
        }
    </div>)
}
