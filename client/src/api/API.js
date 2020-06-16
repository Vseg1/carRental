import Car from './Car';
const baseURL = "/api";

async function getCars(filter, param) {
    console.log('filter : ' + filter + '\n');
    console.log('param : ' + param);
    let url = "/cars";
    switch(filter){
        case 'brand':
            url += "/brand/" + param;
            break;
        case 'category':
            url += "/category/" + param;
            break;
        default:
            break;
    }
    const response = await fetch(baseURL + url);
    const carsJson = await response.json();

    if(response.ok){
        return carsJson.map((c) => new Car(c.id,c.brand,c.category,c.model));
    } else {
        throw carsJson;  // An object with the error coming from the server
    }
}


async function addCar(car) {
    return new Promise((resolve, reject) => {
        fetch("/cars", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
        }).then( (response) => {
            if(response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

async function updateCar(car) {
    return new Promise((resolve, reject) => {
        fetch("/cars/" + car.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
        }).then( (response) => {
            if(response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}


async function deleteCar(carId) {
    return new Promise((resolve, reject) => {
        fetch("/cars/" + carId, {
            method: 'DELETE'
        }).then( (response) => {
            if(response.ok) {
                resolve(null);
            } else {
                // analyze the cause of error
                response.json()
                .then( (obj) => {reject(obj);} ) // error msg in the response body
                .catch( (err) => {reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch( (err) => {reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
}

const API = { getCars, addCar, updateCar, deleteCar } ;
export default API;
