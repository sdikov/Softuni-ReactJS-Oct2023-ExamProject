// import * as request from "../lib/request";
import request from "../utils/abstractApiRequest.js";

const baseUrl = 'http://localhost:3030/jsonstore/airports'


export const getAll = async () => {
    const result = await request.get(baseUrl);

    // todo change result
    return Object.values(result);
    //return result;
    
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