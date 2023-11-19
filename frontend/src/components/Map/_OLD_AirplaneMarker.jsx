import { useEffect, useState, useRef } from "react";

import { Marker, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
//import L from 'leaflet';
import './AirplaneMarker.css';
import 'leaflet.animatedmarker/src/AnimatedMarker';

const markerIcon = divIcon({
	className: 'airplane-icon',
	iconSize: [35, 35]
});


export default function AirplaneMarker({ pathCoordinates }) {

	const [currentPos, setCurrentPos] = useState(0);
	
	const map = useMap();
	const markerRef = useRef();
	const polylineRef = useRef(null);

	const line = L.polyline(
		[
			[42.6977, 23.3219],
			[42.4980, 27.4716]
		],
		{
			color: "green",
			weight: 1.5,
			dashArray: '5',
			dashOffset: '5'
		}
	);

	// console.log(line.getLatLngs());

	let animatedMarker = L.animatedMarker(line.getLatLngs(), {
		autoStart: false,
		interval: 3000,
		markerIcon,
		onEnd: function () {
			//console.log('arrived');
			//map.removeLayer(polylineRef.current);
		},
	});

	useEffect(() => {

		//map.removeLayer(markerRef.current);
		//markerRef.current.setLatLng([42.4980, 27.4716]);

		polylineRef.current = line;

		setTimeout(
			() => {
				// console.log('departure');
				// line.addTo(map);
				// map.addLayer(animatedMarker);
				// animatedMarker.start();
				map.addLayer(markerRef.current);
			},
			2000
		);
	});

	// useEffect(() => {
	// 	setTimeout(
	// 	  () => (currentPos < pathCoordinates.length - 1 ? setCurrentPos(currentPos + 1) : setCurrentPos(0)),
	// 	  300
	// 	);

	//    }, [currentPos]);

	return (
		// <Marker ref={markerRef} position={pathCoordinates[currentPos]} icon={markerIcon} zIndexOffset={1000} />
		<animatedMarker ref={markerRef} position={pathCoordinates[currentPos]} icon={markerIcon} zIndexOffset={1000} />
	);
}