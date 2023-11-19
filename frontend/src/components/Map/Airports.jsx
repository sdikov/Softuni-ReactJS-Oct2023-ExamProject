import { useEffect, useState, useRef } from "react";
import { icon, divIcon } from 'leaflet';
import { Marker, Popup, useMap } from "react-leaflet";

import * as airportService from '../../services/airportsService.js';

const airportIcon = icon({
	iconSize: [35, 35],
	iconUrl: 'airport.svg'
});

export default function Airports() {

	const [airports, setAirports] = useState([]);

	//const map = useMap();

	useEffect(() => {
		airportService.getAll().then((data) => {
			setAirports(data);
		}, (error) => {
			console.error("Error fetching airport data:", error);
		});
	}, []);

	//airports.map(a => console.log(a));

	return (
		<>
			{airports.map((airport) => (
				<Marker
					key={airport.code}
					position={[airport.latitude, airport.longitude]}
					icon={airportIcon}
					zIndexOffset={1000}
				>
					<Popup>{airport.name}</Popup>
				</Marker>
			))}
		</>

	);

}