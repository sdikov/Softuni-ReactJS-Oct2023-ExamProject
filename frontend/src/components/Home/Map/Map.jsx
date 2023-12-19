import { useEffect, useState, useRef, useContext } from "react";

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

import Airport from "./Airport.jsx";
import AirplaneMarker from './AirplaneMarker.jsx';

import { FlightsContext } from "../../../context/FlightsContext.jsx";

export default function Map() {

	const [flightsCtx, updateFlightsCtx] = useContext(FlightsContext);
	const [airports, setAirports] = useState([]);
	const [aircrafts, setAircrafts] = useState([]);
	const [activeAircrafts, setActiveAircrafts] = useState([]);
	const [flights, setFlights] = useState([]);

	// console.log(flightsCtx);
	// return;

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

		const filterAircrafts = aircrafts.filter((aircraft) => aircraft.isActive === true) || [];
		setActiveAircrafts(filterAircrafts);

		// console.log(`0: ${activeAircrafts[0]?.flights[0].inFlight}`);
		// console.log(`1: ${activeAircrafts[0]?.flights[1].inFlight}`);
		// console.log(`2: ${activeAircrafts[0]?.flights[2].inFlight}`);
		// console.log(`3: ${activeAircrafts[0]?.flights[3].inFlight}`);

	}, [flightsCtx, airports, aircrafts, flights]);
	
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