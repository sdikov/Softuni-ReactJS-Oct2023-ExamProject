
import { useState, useEffect, useContext, useRef } from 'react';

import { FlightsContext } from "../../context/FlightsContext.jsx";
import { useMarkerContext } from "../../context/AirplaneMarkerContext.jsx";


export default function CardPanel() {

	const [flightsCtx, updateFlightsCtx] = useContext(FlightsContext);
	//const [aircrafts, setAircrafts] = useState([]);
	
	// show only active aircrafts
	const activeAircrafts = flightsCtx?.aircrafts?.filter((aircraft) => aircraft.isActive === true) || [];

	const cardRefs = useRef([]);
	const { addRef, getRef } = useMarkerContext();

	/**
	 * update card information
	 * based on current flight aircraft info
	 */
	const updateCard = (cardId, values) => {
		const cardRef = cardRefs.current[cardId];
		if (cardRef) {
			const { flightInfo, flightNumber, flightStatus } = values;
			cardRef.querySelector('.flight-info').textContent = flightInfo;
			cardRef.querySelector('.flight-number').textContent = flightNumber;
			cardRef.querySelector('.flight-status').textContent = flightStatus;

			const inFlight = flightStatus === 'In Flight';
			cardRef.querySelector('.flight-status').classList.toggle('text-success', inFlight);
			cardRef.querySelector('.flight-status').classList.toggle('text-danger', !inFlight);
		}
	};


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
		
		activeAircrafts.map((aircraft) => {
			const currentFlight = aircraft.flights[aircraft.currentFlightIndex];

			if (currentFlight) {
				let flightInfo = `${currentFlight.departureAirport} • ${currentFlight.arrivalAirport}`;
				let flightStatus = (currentFlight.inFlight === true) ? 'In Flight' : 'Landed';
				let flightNumber = currentFlight.flightNumber;
				updateCard(aircraft._id, { flightInfo, flightStatus, flightNumber });
			} else {
				let flightStatus = 'Landed';
				updateCard(aircraft._id, { flightStatus });
			}
		});


	}, [flightsCtx]);

	// Define activeAircrafts within the component function
	//const activeAircrafts = flightsCtx.aircrafts.filter((aircraft) => aircraft.isActive === true);

	return (
		<>
			{activeAircrafts && activeAircrafts.map((aircraft, index) => (
				<div className="card mb-2 cursor-pointer"
					key={aircraft._id}
					ref={(el) => (cardRefs.current[aircraft._id] = el)}
					onClick={() => handleCardClick(aircraft._id)}
				>
					<div className="card-body">
						<div className="d-flex justify-content-between">
							<div className='h5'>{aircraft.aircraftRegistrationNumber}</div>
							<div className='h5 font-'>{aircraft.airlineName}</div>
						</div>
						<div className="d-flex justify-content-between">
							<div className="card-subtitle text-body-secondary flight-number"></div>
							<div className="card-subtitle flight-info"></div>
						</div>
						<p className="card-text text-uppercase fw-bold flight-status"></p>
						<div className="progress">
							<div className="progress-bar bg-black" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
						</div>
					</div>
				</div>
			))}
		</>
	);
}