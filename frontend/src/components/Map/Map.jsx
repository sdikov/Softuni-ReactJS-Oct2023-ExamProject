import { useEffect, useState, useRef, useContext } from "react";

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

import Airport from "./Airport.jsx";
import AirplaneMarker from './AirplaneMarker.jsx';

import { FlightsContext } from "../../context/FlightsContext.jsx";

export default function Map() {

	const [contextValue, updateFlightsCtx] = useContext(FlightsContext);
	const [airports, setAirports] = useState([]);
	const [aircrafts, setAircrafts] = useState([]);
	const [flights, setFlights] = useState([]);

	useEffect(() => {
		if (contextValue.aircrafts && contextValue.aircrafts.length > 0) {
			setAircrafts(contextValue.aircrafts);
		}
		if (contextValue.airports && contextValue.airports.length > 0) {
			setAirports(contextValue.airports);
		}
		if (contextValue.flights && contextValue.flights.length > 0) {
			setFlights(contextValue.flights);
		}
	}, [contextValue, airports, aircrafts, flights]);

	return (
		<MapContainer center={[42.5049, 25.3188]} zoom={8}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='© OpenStreetMap contributors' />
			{aircrafts && flights && aircrafts.map((aircraft) => (
				<AirplaneMarker
					key={aircraft._id}
					aircraftData={aircraft}
					//flightsData={flights}
				/>
			))}
			{airports && airports.map((airport) => (
				<Airport key={airport._id} airportData={airport} />
			))}

		</MapContainer>
	);
}