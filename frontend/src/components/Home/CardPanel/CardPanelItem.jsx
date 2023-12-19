
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

	useEffect(() => {
		// console.log(`
		// 	${aircraft.aircraftRegistrationNumber} 
		// 	index is ${aircraft.currentFlightIndex} 
		// 	and flight status ${aircraft.flights[aircraft.currentFlightIndex]?.inFlight}
		// 	`);
		const countFlights = aircraft.flights.length;
		const currentFlight = aircraft.flights[aircraft.currentFlightIndex];

		if (currentFlight) {
			const flightInfo = `${currentFlight.departureAirport} • ${currentFlight.arrivalAirport}`;
			const flightStatus = currentFlight.inFlight && !currentFlight.isLanded ? 'In Flight' : 'Landed';
			const flightStatusColor = currentFlight.inFlight && !currentFlight.isLanded ? 'text-success' : 'text-danger';
			const flightNumber = currentFlight.flightNumber;
			const flightIndex = aircraft.currentFlightIndex + 1;

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
					<div className="card-subtitle text-body-secondary">
						{state.flightNumber}
						{state.countFlights && (
							<span className='ms-1 text-info-emphasis'>
								({state.flightIndex} / {state.countFlights})
							</span>
						)}

					</div>
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