
import { useState, useEffect, useContext, useRef } from 'react';

import CardPanelItem from './CardPanelItem.jsx';

import { FlightsContext } from "../../../context/FlightsContext.jsx";
import { useMarkerContext } from "../../../context/AirplaneMarkerContext.jsx";


export default function CardPanel() {

	const [flightsCtx, updateFlightsCtx] = useContext(FlightsContext);
	//const [aircrafts, setAircrafts] = useState([]);
	const [activeAircrafts, setActiveAircrafts] = useState([]);

	const cardRefs = useRef([]);
	const { addRef, getRef } = useMarkerContext();

	/**
	 * open marker popup
	 * when card is clicked
	 */
	const handleCardClick = (aircraftId) => {
		const markerRef = getRef(aircraftId);
		markerRef.movingMarkerElement.openPopup();
	};

	useEffect(() => {

		// skip initial render
		if (Object.keys(flightsCtx).length === 0) {
			return;
		}

		const filterAircrafts = (flightsCtx?.aircrafts || []).filter((aircraft) => aircraft.isActive === true);

		setActiveAircrafts(filterAircrafts);

	}, [flightsCtx]);

	return (
		<>
			{activeAircrafts.map((aircraft) => (
				<CardPanelItem
					key={aircraft._id}
					onClick={() => handleCardClick(aircraft._id)}
					aircraft={aircraft}
				/>
			))}
		</>
	);
}