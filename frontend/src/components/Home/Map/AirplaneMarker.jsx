import { useEffect, useState, useRef, useContext } from "react";

import { icon, divIcon } from 'leaflet';
import { Marker, Polyline, Popup, useMap } from "react-leaflet";

// extends Leaflet's extends Leaflet's L.Marker to provide animations along a polyline.
import "./MovingMarker.js"
import "./leaflet.rotatedMarker.js"
import calculateBearing from "../../../utils/calculateBearing.js";

import { FlightsContext } from "../../../context/FlightsContext.jsx";
import { useMarkerContext } from "../../../context/AirplaneMarkerContext.jsx";

const airplaneIcon = icon({
	iconSize: [40, 40],
	popupAnchor: [2, -20],
	iconUrl: 'images/airplane-orange.svg',
	className: 'airplane-icon'
});

// todo: add as atr to plane?
//const planeSpeed = 100;
//const planeSpeed = 300;
const planeSpeed = 600;
//const planeSpeed = 6400;

export default function AirplaneMarker({ aircraftData, aircraftIndex }) {

	const [flightsCtx, updateFlightsCtx] = useContext(FlightsContext);
	const [currentFlightIndex, setCurrentFlightIndex] = useState(0);
	const [flights, setFlights] = useState(aircraftData.flights);

	const map = useMap();
	const markerRef = useRef(null);
	const { addRef } = useMarkerContext();

	/**
	 * create and store a separate ref for each instance
	 * of the AirplaneMarker component
	 */
	// todo
	addRef(aircraftData._id, markerRef);

	/**
	 * Update aircrafts in global context
	 * when the aircraft is in flight or has landed
	*/
	const handleUpdateFlightsCtx = (data, updateflightIndex) => {

		//const updatedAircrafts = [...flightsCtx.aircrafts];
		//console.log(updatedAircrafts[aircraftIndex].flights[index].inFlight);
		
		flightsCtx.aircrafts[aircraftIndex].flights[currentFlightIndex] = data;
		flightsCtx.aircrafts[aircraftIndex].currentFlightIndex = updateflightIndex;

		updateFlightsCtx({ aircrafts: flightsCtx.aircrafts });
	};

	/**
	 * start Animation
	 */
	const createMarker = (currentFlightData, startPoint, endPoint, bearing) => {
		const animatedMarker = L.Marker.movingMarker(
			[startPoint, endPoint],
			[(map.distance(startPoint, endPoint) / planeSpeed) * 20], // speed
			{ icon: airplaneIcon, zIndexOffset: 9000 }
		);

		markerRef.current.movingMarkerElement = animatedMarker;

		const iconRotation = bearing - 270;
		markerRef.current.movingMarkerElement.options.rotationAngle = iconRotation;
		markerRef.current.movingMarkerElement.options.rotationOrigin = 'center center';

		markerRef.current.movingMarkerElement.bindPopup(
			currentFlightData.flightNumber,
			{ autoClose: false, autoPan: false }
		);

		markerRef.current.movingMarkerElement.addTo(map);
	};

	const handleAnimationStart = (currentFlightData) => {
		//console.log(`${currentFlightData.flightNumber} Captain: Cabin crew prepare for take-off...`);
	};

	/**
	 * end Animation
	 */
	const handleAnimationEnd = (currentFlightData) => {
		markerRef.current.movingMarkerElement.removeFrom(map);
		// console.log(`
		//   ${aircraftData.airlineName} flight
		//   ${currentFlightData.flightNumber} 
		//   from ${currentFlightData.departureAirportInfo.city} 
		//   has just landed at 
		//   ${currentFlightData.arrivalAirportInfo.name}
		//   Clap! Clap! Clap! Great job Captain! ;)))
		// `);

		currentFlightData.isLanded = true;
		//handleUpdateFlightsCtx(currentFlightIndex, currentFlightData, currentFlightIndex + 1);
		handleUpdateFlightsCtx(currentFlightData, currentFlightIndex + 1);
		setCurrentFlightIndex((currentFlightIndex) => currentFlightIndex + 1);
	};

	useEffect(() => {

		//return;

		if (currentFlightIndex >= flights.length) {
			return;
		}

		const currentFlightData = flights[currentFlightIndex];
		
		const startPoint = [
			currentFlightData.departureAirportInfo.latitude,
			currentFlightData.departureAirportInfo.longitude
		];

		const endPoint = [
			currentFlightData.arrivalAirportInfo.latitude,
			currentFlightData.arrivalAirportInfo.longitude
		];

		const bearing = calculateBearing(
			currentFlightData.arrivalAirportInfo.latitude,
			currentFlightData.arrivalAirportInfo.longitude,
			currentFlightData.departureAirportInfo.latitude,
			currentFlightData.departureAirportInfo.longitude
		);

		//console.log(bearing);

		if (markerRef.current) {
			createMarker(currentFlightData, startPoint, endPoint, bearing);
			//console.log(`${currentFlightIndex} - ${flights[currentFlightIndex].flightNumber} - ${flights[currentFlightIndex].inFlight}`);

			markerRef.current.movingMarkerElement.on('start', () => handleAnimationStart(currentFlightData));

			setTimeout(() => {
				markerRef.current.movingMarkerElement.start();
				currentFlightData.inFlight = true;

				handleUpdateFlightsCtx(currentFlightData, currentFlightIndex);	

			}, Math.floor(Math.random() * 4000) + 1000);

			//console.log(`${currentFlightIndex} - ${flights[currentFlightIndex].flightNumber} - ${flights[currentFlightIndex].inFlight}`);
			//console.log('-----');

			markerRef.current.movingMarkerElement.on('end', () => handleAnimationEnd(currentFlightData));
		}

	}, [flights, currentFlightIndex]);

	return (
		<Marker ref={markerRef} position={[0, 0]} />
	);

}