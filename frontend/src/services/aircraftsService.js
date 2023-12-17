import request from "../utils/abstractApiRequest.js";

const baseUrl = 'http://localhost:3030/jsonstore/aircrafts'


export const getAll = async () => {
    const result = await request.get(baseUrl);

    return Object.values(result);
};

export const getOneById = async (id) => {
    const result = await request.get(`${baseUrl}/${id}`, );

    return result;
}

export const getOneByCode = async (code) => {
	// todo
    const result = await request.get(baseUrl);
    const airports = Object.values(result);
    return airports.find(airport => airport.code === code);
 }

 export const edit = async (aircraftId, data) => {
    const result = await request.put(`${baseUrl}/${aircraftId}`, data);

    return result;
};

export const create = async (data) => {
    const addData = {
        ...data,
        currentFlightIndex: 0,
        isActive: true,
    }
    const result = await request.post(baseUrl, addData);

    return result;
};

export const remove = async (id) => request.delete(`${baseUrl}/${id}`);