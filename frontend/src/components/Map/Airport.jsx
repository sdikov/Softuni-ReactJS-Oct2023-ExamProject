import { useEffect, useState } from "react";
import { icon } from 'leaflet';
import { Marker, Popup } from "react-leaflet";

const airportIcon = icon({
	iconSize: [35, 35],
	iconUrl: 'images/airport.svg'
});

export default function Airport({ airportData }) {

	const [airport, setAirport] = useState(airportData);

	return (
		<>
			{airport && (
				<Marker
					key={airport.code}
					position={[airport.latitude, airport.longitude]}
					icon={airportIcon}
					zIndexOffset={1000}
				>
					<Popup>{airport.name}</Popup>
				</Marker>
			)}
		</>
	);

}