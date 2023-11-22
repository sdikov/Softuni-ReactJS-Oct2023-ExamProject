import { useEffect, useState, useRef, useContext } from "react";
import { icon, divIcon } from 'leaflet';
import { Marker, Polyline, Popup, useMap } from "react-leaflet";
import "./MovingMarker.js"

const airplaneIcon = icon({
	iconSize: [40, 40],
	popupAnchor: [2, -20],
	iconUrl: 'airplane-icon.svg'
});

// todo: add as atr to plane?
const planeSpeed = 5800;

export default function AirplaneMarker({ aircraftData }) {

	const [position, setPosition] = useState([0, 0]);
	const [flights, setFlights] = useState(aircraftData.flights);
	const [currentFlightIndex, setCurrentFlightIndex] = useState(0);

	const map = useMap();
	const markerRef = useRef(null);

	//console.log(aircraftData);

	useEffect(() => {

		if (currentFlightIndex >= flights.length) {
			return;
		}

		const i = currentFlightIndex;

		const startPoint = [
			flights[i].arrivalAirportInfo.latitude,
			flights[i].arrivalAirportInfo.longitude
		];
		const endPoint = [
			flights[i].departureAirportInfo.latitude,
			flights[i].departureAirportInfo.longitude
		];

		const distance = map.distance(startPoint, endPoint);
		const animatedTime = (distance / planeSpeed) * 20;
		const randomDelay = Math.floor(Math.random() * 4000) + 1000;

		if (markerRef.current) {
			const animatedMarker = L.Marker.movingMarker(
				[startPoint, endPoint],
				[animatedTime],
				{ icon: airplaneIcon, zIndexOffset: 9000 });

			markerRef.current.movingMarkerElement = animatedMarker;
			markerRef.current.movingMarkerElement.addTo(map);
		}

		setTimeout(() => {
			markerRef.current.movingMarkerElement.on('start', () => {
				console.log(`${flights[i].flightNumber} Captain: Cabin crew prepare for take-off...`);
			});

			markerRef.current.movingMarkerElement.start();

		}, randomDelay);

		markerRef.current.movingMarkerElement.on('end', () => {
			markerRef.current.movingMarkerElement.removeFrom(map);
			console.log(markerRef.current);

			console.log(`
				${aircraftData.airlineName} flight
				${flights[i].flightNumber} 
				from ${flights[i].departureAirportInfo.city} 
				has just landed at 
				${flights[i].arrivalAirportInfo.name}
				Clap! Clap! Clap! Great job Captain! ;)))
			`);

			setCurrentFlightIndex((currentFlightIndex) => currentFlightIndex + 1);
		});

	}, [currentFlightIndex, flights]);

	return (
		<Marker ref={markerRef} position={position} />
	);

}