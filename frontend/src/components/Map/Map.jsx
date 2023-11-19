import { useEffect, useState, useRef } from "react";

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

import AirplaneMarker from './AirplaneMarker.jsx';
import Airports from "./Airports.jsx";

export default function Map() {

	const pathCoordinates = [
		[42.6977, 23.3219], // Sofia, Bulgaria
		//[42.0815, 24.8549], // Plovdiv, Bulgaria
		[42.4980, 27.4716], // Burgas, Bulgaria
	];
	
	// const pathCoordinates = [
	// 	{ lat: 42.6977, lng: 23.3219 }, // Sofia, Bulgaria
	// 	{ lat: 42.08154359319885, lng:24.854995087109568}, // Plovdiv, Bulgaria
	// 	{ lat: 42.4980, lng: 27.4716 } // Burgas, Bulgaria
	// ];

	return (
		<MapContainer center={[42.5049, 25.3188]} zoom={8}>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='© OpenStreetMap contributors' />
			<AirplaneMarker pathCoordinates={pathCoordinates} />
			<Airports />
		</MapContainer>
	);
}