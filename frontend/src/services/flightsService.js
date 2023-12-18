// import * as request from "../lib/request";
import request from "../utils/abstractApiRequest.js";

const baseUrl = 'http://localhost:3030/jsonstore/flights'


export const getAll = async () => {
    const result = await request.get(baseUrl);

    return Object.values(result);
};

export const getManyByAircraftId = async (id) => {
	// todo
    const result = await request.get(baseUrl);
    const flights = Object.values(result);
    return flights.filter(flight => flight.aircraftId === id);
 }

 export const create = async (data) => {

    const addData = {
        ...data,
        passengerCount: Math.floor(Math.random() * 220) + 50,
        status: "scheduled",
        isLanded: false,
        inFlight: false,
    }

    const result = await request.post(baseUrl, addData);

    return result;
};