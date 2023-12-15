import { useEffect, useState, useRef, useContext } from "react";

import { icon, divIcon } from 'leaflet';
import { Marker, Polyline, Popup, useMap } from "react-leaflet";
import "./MovingMarker.js"
import "./leaflet.rotatedMarker.js"
import calculateBearing from "../../utils/calculateBearing.js";

import { FlightsContext } from "../../context/FlightsContext.jsx";

const airplaneIcon = icon({
	iconSize: [40, 40],
	popupAnchor: [2, -20],
	iconUrl: 'images/airplane-orange.svg',
	className: 'airplane-icon'
});

// todo: add as atr to plane?
//const planeSpeed = 100;
const planeSpeed = 300;
//const planeSpeed = 6400;

export default function AirplaneMarker({ aircraftData, aircraftIndex }) {

	const [flightsCtx, updateFlightsCtx] = useContext(FlightsContext);

	const [position, setPosition] = useState([0, 0]);
	const [flights, setFlights] = useState(aircraftData.flights);
	const [currentFlightIndex, setCurrentFlightIndex] = useState(0);

	const map = useMap();
	const markerRef = useRef(null);


	/**
	 * Update all global context
	 * when the aircraft has landed
	*/
	const handleUpdateFlightsCtx = (index, data, flightIndex) => {

		flightsCtx.aircrafts[aircraftIndex].flights[index] = data;
		flightsCtx.aircrafts[aircraftIndex].currentFlightIndex = flightIndex;

		updateFlightsCtx(flightsCtx);
	};

	useEffect(() => {

		if (currentFlightIndex >= flights.length) {
			return;
		}

		const nextFlightIndex = currentFlightIndex + 1;
		const currentFlightData = flights[currentFlightIndex];

		const startPoint = [
			currentFlightData.departureAirportInfo.latitude,
			currentFlightData.departureAirportInfo.longitude
			
		];

		const endPoint = [
			currentFlightData.arrivalAirportInfo.latitude,
			currentFlightData.arrivalAirportInfo.longitude
		];

		const distance = map.distance(startPoint, endPoint);
		const animatedTime = (distance / planeSpeed) * 20;
		const randomDelay = Math.floor(Math.random() * 4000) + 1000;
		const bearing = calculateBearing(
			currentFlightData.arrivalAirportInfo.latitude,
			currentFlightData.arrivalAirportInfo.longitude,
			currentFlightData.departureAirportInfo.latitude,
			currentFlightData.departureAirportInfo.longitude
		);

		//console.log(bearing);

		if (markerRef.current) {
			const animatedMarker = L.Marker.movingMarker(
				[startPoint, endPoint],
				[animatedTime],
				{ icon: airplaneIcon, zIndexOffset: 9000 }
			);

			markerRef.current.movingMarkerElement = animatedMarker;

			const iconRotation = bearing - 270;
			markerRef.current.movingMarkerElement.options.rotationAngle = iconRotation;
			markerRef.current.movingMarkerElement.options.rotationOrigin = 'center center';
			
			markerRef.current.movingMarkerElement.addTo(map);

		}

		setTimeout(() => {
			markerRef.current.movingMarkerElement.on('start', () => {
				console.log(`${currentFlightData.flightNumber} Captain: Cabin crew prepare for take-off...`);
			});

			markerRef.current.movingMarkerElement.start();
			//console.log(markerRef.current.movingMarkerElement.isRunning());

			currentFlightData.inFlight = true;
			handleUpdateFlightsCtx(currentFlightIndex, currentFlightData, currentFlightIndex);

		}, randomDelay);

		markerRef.current.movingMarkerElement.on('end', () => {
			markerRef.current.movingMarkerElement.removeFrom(map);
			//console.log(markerRef.current);

			console.log(`
				${aircraftData.airlineName} flight
				${currentFlightData.flightNumber} 
				from ${currentFlightData.departureAirportInfo.city} 
				has just landed at 
				${currentFlightData.arrivalAirportInfo.name}
				Clap! Clap! Clap! Great job Captain! ;)))
			`);

			// update aircraft state in global cntx
			//currentFlightData.inFlight = false;
			currentFlightData.isLanded = true;
			
			handleUpdateFlightsCtx(currentFlightIndex, currentFlightData, nextFlightIndex);

			setCurrentFlightIndex((currentFlightIndex) => currentFlightIndex + 1);

			setTimeout(() => {
				console.log(`${currentFlightData.flightNumber} Idle...`);
			}, randomDelay);
		});

	}, [currentFlightIndex, flights]);

	return (
		<Marker ref={markerRef} position={position} />
	);

}