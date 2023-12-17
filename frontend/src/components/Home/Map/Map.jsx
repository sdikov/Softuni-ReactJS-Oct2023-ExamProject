import { useEffect, useState, useRef, useContext } from "react";

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

import Airport from "./Airport.jsx";
import AirplaneMarker from './AirplaneMarker.jsx';

import { FlightsContext } from "../../../context/FlightsContext.jsx";

export default function Map({ }) {

	const [flightsCtx, updateFlightsCtx] = useContext(FlightsContext);
	const [airports, setAirports] = useState([]);
	const [aircrafts, setAircrafts] = useState([]);
	const [flights, setFlights] = useState([]);

	let activeAircrafts = [];

	const darkMapUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
	const darkMapAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

	useEffect(() => {
		if (flightsCtx.aircrafts && flightsCtx.aircrafts.length > 0) {
			setAircrafts(flightsCtx.aircrafts);
		}
		if (flightsCtx.airports && flightsCtx.airports.length > 0) {
			setAirports(flightsCtx.airports);
		}
		if (flightsCtx.flights && flightsCtx.flights.length > 0) {
			setFlights(flightsCtx.flights);
		}
	}, [flightsCtx, airports, aircrafts, flights]);

	activeAircrafts = aircrafts.filter((aircraft) => aircraft.isActive === true) || [];
	//console.log(activeAircrafts);

	return (
		<MapContainer center={[42.5049, 25.3188]} zoom={8}>
			{/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='© OpenStreetMap contributors' /> */}
			<TileLayer url={darkMapUrl} attribution={darkMapAttribution} />
			{activeAircrafts && activeAircrafts.map((aircraft, index) => (
				<AirplaneMarker
					key={aircraft._id}
					aircraftData={aircraft}
					aircraftIndex={index}
				/>
			))}
			{airports && airports.map((airport) => (
				<Airport key={airport._id} airportData={airport} />
			))}

		</MapContainer>
	);
}