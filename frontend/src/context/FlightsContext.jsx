import { useState, useEffect, createContext } from 'react';

import * as airportService from '../services/airportsService.js';
import * as aircraftsService from '../services/aircraftsService.js';
import * as flightsService from '../services/flightsService.js';

const FlightsContext = createContext();

const FlightsContextProvider = ({ children }) => {
	const [contextValue, setContextValue] = useState({});

	let airportsData = [];
	let aircraftsData = [];
	let flightData = [];

	const restructureContextData = (data) => {

		/**
		 * add arrivalAirportInfo and departureAirportInfo to flights
		*/
		const updateFlightsData = data.flights.map((flight) => {
			return {
				...flight,
				departureAirportInfo: data.airports.find((airport) => airport.code === flight.departureAirport),
				arrivalAirportInfo: data.airports.find((airport) => airport.code === flight.arrivalAirport)
			}
		});

		/**
		 * add updated flights info to each aircraft
		*/
		const updatedAircraftsData = data.aircrafts.map((aircraft) => {
			const updatedData = {
				...aircraft,
				flights: updateFlightsData.filter(flight => flight.aircraftId === aircraft._id)
			}

			return updatedData;
		})

		const contextObjValues = {
			airports: data.airports,
			aircrafts: updatedAircraftsData,
			flights: updateFlightsData
		}

		setContextValue(contextObjValues);
		return contextValue;

	}

	useEffect(() => {
		const fetchData = async () => {

			try {
				/**
				 * Fetch aircrafts data
				*/
				airportsData = await airportService.getAll();

				/**
				 * Fetch aircrafts data
				*/
				aircraftsData = await aircraftsService.getAll();

				/**
				 * Fetch aircrafts data
				*/
				flightData = await flightsService.getAll();

			} catch (error) {
				console.error('Error fetching data:', error);
			}

			restructureContextData({
				airports: airportsData,
				aircrafts: aircraftsData,
				flights: flightData
			});
		}

		fetchData();

	}, []);

	/**
	 * update context
	 * Ensure that you create a new reference for the nested object
	 */
	const updateContextValue = (newValue) => {
		return restructureContextData({
			...contextValue,
			...newValue
		});
	};

	return (
		<FlightsContext.Provider value={[contextValue, updateContextValue]}>
			{children}
		</FlightsContext.Provider>
	);
};

export { FlightsContext, FlightsContextProvider };