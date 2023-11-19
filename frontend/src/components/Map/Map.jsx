import { useEffect, useState, useRef } from "react";

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

import AirplaneMarker from './AirplaneMarker.jsx';
import Airports from "./Airports.jsx";

import * as airportService from '../../services/airportsService.js';
import * as aircraftsService from '../../services/aircraftsService.js';
import * as flightsService from '../../services/flightsService.js';

export default function Map() {

	const [flights, setFlights] = useState([]);
	const [aircrafts, setAircrafts] = useState([]);

	useEffect(() => {
		//console.log('getting flights...');

		flightsService.getAll()
			.then((data) => {
				setFlights(data);
			});

	}, []);

	useEffect(() => {
		//console.log(aircrafts);
		if (flights.length === 0) {
			return;
		}
		//console.log(flights);
	}, [flights, aircrafts]);


	// const pathCoordinates = [
	// 	[42.6977, 23.3219], // Sofia, Bulgaria
	// 	[42.0815, 24.8549], // Plovdiv, Bulgaria
	// 	[42.4980, 27.4716], // Burgas, Bulgaria
	// ];
	const pathCoordinates = [];

	// const pathCoordinates = [
	// 	{ lat: 42.6977, lng: 23.3219 }, // Sofia, Bulgaria
	// 	{ lat: 42.08154359319885, lng:24.854995087109568}, // Plovdiv, Bulgaria
	// 	{ lat: 42.4980, lng: 27.4716 } // Burgas, Bulgaria
	// ];

	return (
		<MapContainer center={[42.5049, 25.3188]} zoom={8}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='© OpenStreetMap contributors' />
			{flights.map((flightData) => (
				<AirplaneMarker
					key={flightData._id}
					flightData={flightData}
				/>
			))}
			<Airports />
		</MapContainer>
	);
}