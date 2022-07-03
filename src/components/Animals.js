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
    const [animal, setAnimal] = useState([]);
    const animalLength = localStorage.getItem("arrLength");
    const [pagecounter, setPagecounter] = useState(parseInt(animalLength / 20) + 1);
    useEffect(() => {
        if (pagecounter != 0 && animalLength != null) {
            UserService.getAnimals(pagecounter).then(response => setAnimal(animal.concat(response.items))).then(setPagecounter(pagecounter - 1));
        }
    }, [animal]);
    return (<div style={styles.animalWrapper}>
        {animal != undefined && animal[0] != undefined ?
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
            animalLength!=null?<div>Animals loading...</div>:
            <div>
                <p>you have to login first</p>
                <a href="/auth/login">here</a>
                </div>
        }
    </div>)
}
