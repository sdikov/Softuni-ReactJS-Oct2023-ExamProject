
import { useState, useEffect, useContext, useRef } from 'react';

import { FlightsContext } from "../../context/FlightsContext.jsx";
import { useMarkerContext } from "../../context/AirplaneMarkerContext.jsx";


export default function CardPanel() {

	const [contextValue, updateFlightsCtx] = useContext(FlightsContext);
	const [aircrafts, setAircrafts] = useState([]);

	const cardRefs = useRef([]);
	const { addRef, getRef } = useMarkerContext();

	const updateCard = (cardId, newState) => {
		const cardRef = cardRefs.current[cardId];
		if (cardRef) {
			cardRef.querySelector('.flight-info').textContent = newState.flightInfo;
			cardRef.querySelector('.flight-number').textContent = newState.flightNumber;
			cardRef.querySelector('.flight-status').textContent = newState.flightStatus;

			if (newState.flightStatus == 'In Flight') {
				cardRef.querySelector('.flight-status').classList.add('text-success');
				cardRef.querySelector('.flight-status').classList.remove('text-danger');
			} else {
				cardRef.querySelector('.flight-status').classList.add('text-danger');
				cardRef.querySelector('.flight-status').classList.remove('text-success');
			}
		}
	};


	const handleCardClick = (aircraftId) => {
		const markerRef = getRef(aircraftId);
		markerRef.movingMarkerElement.openPopup();
	};


	useEffect(() => {

		// skip initial render
		if (Object.keys(contextValue).length === 0) {
			return;
		}

		setAircrafts(contextValue.aircrafts);

		aircrafts.map((aircraft) => {
			//console.log(`${aircraft.aircraftRegistrationNumber} ${aircraft.currentFlightIndex}`);
			//const currentFlight = aircraft.flights.find(flight => flight.inFlight === true);

			const currentFlight = aircraft.flights[aircraft.currentFlightIndex];

			if (currentFlight) {
				//console.log(currentFlight);
				let flightInfo = `${currentFlight.departureAirport} • ${currentFlight.arrivalAirport}`;
				let flightStatus = (currentFlight.inFlight === true) ? 'In Flight' : 'Landed';
				let flightNumber = currentFlight.flightNumber;
				updateCard(aircraft._id, { flightInfo, flightStatus, flightNumber });
			} else {
				let flightStatus = 'Landed';
				updateCard(aircraft._id, { flightStatus });
			}
		});


	}, [contextValue, aircrafts]);

	return (
		<>
			{aircrafts && aircrafts.map((aircraft, index) => (
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