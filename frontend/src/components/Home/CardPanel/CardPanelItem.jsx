
import { useState, useEffect, useContext, useRef } from 'react';


export default function CardPanelItem({ onClick, aircraft }) {

	const [state, setState] = useState({
		flightInfo: '',
		flightStatus: '',
		flightNumber: '',
		flightIndex: '',
		countFlights: 0,
		flightStatusColor: '',
	});

	//const [aircraftState, setAircraftState] = useState(aircraft);

	useEffect(() => {
		//console.log(`${aircraft.aircraftRegistrationNumber} index is ${aircraft.currentFlightIndex} and flight status ${aircraft.flights[aircraft.currentFlightIndex].inFlight}`);
		const countFlights = aircraft.flights.length;
		const currentFlight = aircraft.flights[aircraft.currentFlightIndex];

		console.log("Aircraft prop changed:", aircraft);
		console.log(aircraft.currentFlightIndex);
		
		// fix for in flight issue
		// const countFlights = aircraftState.flights.length;
		// const currentFlight = aircraft.flights[aircraftState.currentFlightIndex];

		// console.log(aircraftState.flights);
		// console.log(`0: ${aircraftState.flights[0].inFlight}`);
		// console.log(`1: ${aircraftState.flights[1].inFlight}`);
		// console.log(`2: ${aircraftState.flights[2].inFlight}`);
		// console.log(`3: ${aircraftState.flights[3].inFlight}`);

		if (currentFlight) {
			const flightInfo = `${currentFlight.departureAirport} • ${currentFlight.arrivalAirport}`;
			//const flightStatus = currentFlight.inFlight ? 'In Flight' : 'Landed';
			//const flightStatus = currentFlight.inFlight.toString();
			const flightStatus = currentFlight.inFlight && !currentFlight.isLanded ? 'In Flight' : 'Landed';
			const flightStatusColor = currentFlight.inFlight && !currentFlight.isLanded ? 'text-success' : 'text-danger';
			const flightNumber = currentFlight.flightNumber;
			const flightIndex = aircraft.currentFlightIndex;

			setState({ flightInfo, flightStatus, flightNumber, flightIndex, countFlights, flightStatusColor });
		} else {
			setState({ flightStatus: 'At airport' });
		}
	}, [aircraft]);

	return (
		<div className="card mb-2 cursor-pointer" onClick={onClick}>
			<div className="card-body">
				<div className="d-flex justify-content-between">
					<div className='h5'>{aircraft.aircraftRegistrationNumber}</div>
					<div className='h5 font-'>{aircraft.airlineName}</div>
				</div>
				<div className="d-flex justify-content-between">
					<div className="card-subtitle text-body-secondary">{state.flightNumber} ({state.flightIndex + 1} / {state.countFlights})</div>
					<div className="card-subtitle">{state.flightInfo}</div>
				</div>
				<p className={`card-text text-uppercase fw-bold ${state.flightStatusColor}`}>{state.flightStatus}</p>
				<div className="progress">
					<div className="progress-bar bg-black" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
				</div>
			</div>
		</div>
	);
}