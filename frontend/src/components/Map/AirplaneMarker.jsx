import { useEffect, useState, useRef, useContext } from "react";
import { icon, divIcon } from 'leaflet';
import { Marker, Polyline, useMap } from "react-leaflet";
import "./MovingMarker.js"

//import * as airportService from '../../services/airportsService.js';

const airplaneIcon = icon({
	iconSize: [40, 40],
	popupAnchor: [2, -20],
	iconUrl: 'airplane-icon.svg'
});

export default function AirplaneMarker({ aircraftData }) {

	const [aircraft, setAircraft] = useState(aircraftData);

	console.log(aircraft.aircraftRegistrationNumber);
	//console.log(`${aircraft.departureAirport} > ${aircraft.arrivalAirport}`);
	console.log(aircraft);

	return (
		<></>
	)

	//console.log(`${flightData.departureAirport} > ${flightData.arrivalAirport}`);

	const [marker, setMarker] = useState(null);
	const [trackingPath, setTrackingPath] = useState([]);

	const [departingAirport, setDepartingAirport] = useState([]);
	const [arrivingAirport, setArrivingAirport] = useState([]);

	const [startPoint, setStartPoint] = useState([]);
	const [endPoint, setEndPoint] = useState([]);

	const map = useMap();

	// flight Data
	const planeSpeed = 800; // todo add as atr to plane
	const departureAirport = flightData.departureAirport;
	const arrivalAirport = flightData.arrivalAirport;

	// getting airports data
	useEffect(() => {

		console.log('getting async airports data...');

		airportService.getOneByCode(departureAirport)
			.then((data) => {
				setDepartingAirport(data);
				setStartPoint([data.latitude, data.longitude]);
			});

		airportService.getOneByCode(arrivalAirport)
			.then((data) => {
				setArrivingAirport(data);
				setEndPoint([data.latitude, data.longitude]);
			});

	}, []);

	useEffect(() => {

		//ensure that the startPoint and endPoint values are available
		if (startPoint.length === 0 || endPoint.length === 0) {
			return;
		}

		// get the distance between airports (coordinates) and calculate some animation time
		const distance = map.distance(startPoint, endPoint);
		const animatedTime = (distance / planeSpeed) * 20;
		//console.log(`distance: ${distance}, planeSpeed: ${planeSpeed}, animatedTime: ${animatedTime}`);

		const animatedMarker = L.Marker.movingMarker([startPoint, endPoint], [animatedTime], { icon: airplaneIcon, zIndexOffset: 9000 }).addTo(map);

		//setMarker(animatedMarker);
		animatedMarker.start();


	}, [startPoint, endPoint]);

	return (
		<></>
	)

	useEffect(() => {

		// Create a polyline representing the tracking path
		//const trackingPath = L.polyline([startPoint, endPoint], { color: 'blue' }).addTo(map);
		//const trackingPath = L.polyline([startPoint, endPoint]).addTo(map);

		// Create a marker at the starting point
		const animatedMarker = L.Marker.movingMarker([startPoint], [3000], { icon: airplaneIcon, zIndexOffset: 9000 }).addTo(map);

		// ?
		setMarker(animatedMarker);

		animatedMarker.start();

		// When the marker moves, update the tracking path
		animatedMarker.on('move', () => {
			setTrackingPath([...trackingPath, animatedMarker.getLatLng()]);
		});

		// When the animation ends, remove the tracking path
		animatedMarker.on('end', () => {
			console.log('end');
			setTrackingPath([]);
			// if (trackingPath.length > 1) {
			// 	setTrackingPath([]); // Reset the tracking path when the animation ends
			// }
		});

	}, []);

	return (
		<>
		</>
	);

}