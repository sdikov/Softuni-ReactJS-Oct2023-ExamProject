import { useState, useEffect, createContext } from 'react';

import * as airportService from '../services/airportsService.js';
import * as aircraftsService from '../services/aircraftsService.js';
import * as flightsService from '../services/flightsService.js';

const FlightsContext = createContext();

const FlightsContextProvider = ({ children }) => {
	const [contextValue, setContextValue] = useState({});

	useEffect(() => {
		const fetchData = async () => {

			/**
			 * Fetch aircrafts data
			*/
			const airportsData = await airportService.getAll().catch(error => {
				console.log("Error fetching airport data:", error);
			});

			/**
			 * Fetch aircrafts data
			*/
			const aircraftsData = await aircraftsService.getAll().catch(error => {
				console.log("Error fetching aircrafts data:", error);
			});

			/**
			 * Fetch flights data based on aircraft IDs
			*/
			const updatedAircraftsData = [];
			const flightsData = await Promise.all(
				aircraftsData.map(async (aircraft, i) => {
					const flightsArray = await flightsService.getManyByAircraftId(aircraft._id);

					// get Airport info
					// todo: make a better query when switch to collection data queries
					const flightsWithAirportInfo = [];
					for (const flightId in flightsArray) {
						const flight = flightsArray[flightId];
					 
						// Find departure airport information
						const departureAirportCode = flight.departureAirport;
						const departureAirportInfo = airportsData.find(airport => airport.code === departureAirportCode);
					 
						// Find arrival airport information
						const arrivalAirportCode = flight.arrivalAirport;
						const arrivalAirportInfo = airportsData.find(airport => airport.code === arrivalAirportCode);
					 
						// Add airport information to the flight
						flightsWithAirportInfo[flightId] = {
						  ...flight,
						  departureAirportInfo,
						  arrivalAirportInfo,
						};
					   }

					//console.log('------ / START ------');
					//console.log(airportsData);
					//console.log(flightsWithAirportInfo);
					//console.log('------ / END ------');


					// put flights in object of each aircraft
					updatedAircraftsData.push({
						...aircraft,
						flights: flightsWithAirportInfo,
					});

					//console.log(updatedAircraftsData);
					return flightsArray;
				})
			).catch(error => {
				console.log("Error fetching flights data:", error);
			});

			// Flatten the array of arrays into a single array of flights
			const flattenedFlights = flightsData.flat();

			setContextValue({
				airports: airportsData,
				aircrafts: updatedAircraftsData,
				flights: flattenedFlights
			});
		}

		fetchData();

	}, []);

	const updateContextValue = (newValue) => {
		setContextValue(newValue);
	};

	return (
		<FlightsContext.Provider value={[contextValue, updateContextValue]}>
			{children}
		</FlightsContext.Provider>
	);
};

export { FlightsContext, FlightsContextProvider };