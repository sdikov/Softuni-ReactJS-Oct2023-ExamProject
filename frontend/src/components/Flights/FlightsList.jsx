import { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import * as aircraftsService from '../../services/aircraftsService.js';
import { FlightsContext } from "../../context/FlightsContext.jsx";

export default function FlightList({ aicraftId, handleEditFlightData }) {

	const [flightsCtx, updateFlightsCtx] = useContext(FlightsContext);
	const [flights, setFlights] = useState([]);
	const [aircraft, setAircraft] = useState([]);
	const [actionErrors, setActionErrors] = useState();

	/**
	 * change aicraft status 
	 * and update Flights Context
	 */
	/*
	const handleCkickStatus = async (e, index, aircraftId, isActive) => {
		e.preventDefault();


		const data = await aircraftsService.getOneById(aircraftId);
		data.isActive = isActive;

		const flights = flightsCtx.aircrafts[index].flights;

		// check if aircraft has at least 1 flight
		setActionErrors();
		if (flights.length === 0) {
			setActionErrors('Before changing the status, add at least 1 flight');
			return;
		}

		try {
			await aircraftsService.edit(aircraftId, data);
			const updatedAircrafts = await aircraftsService.getAll();

			updateFlightsCtx({ aircrafts: updatedAircrafts });

		} catch (err) {
			console.log(err);
		}
	}
	*/

	/**
	 * Edit flight
	 */
	
	const handleCkickEdit = async (e, aircraft) => {
		console.log('handleCkickEdit');
		//handleEditAircraftData(aircraft);
	}
	

	/**
	 * Delete aircraft
	 */
	/*
	const handleCkickDelete = async (e, aircraft) => {

		var result = confirm(`Delete ${aircraft.airlineName} ( ${aircraft.aircraftRegistrationNumber} ). Are you sure?`);
		if (result) {
			try {
				await aircraftsService.remove(aircraft._id);
				const updatedAircrafts = await aircraftsService.getAll();

				updateFlightsCtx({ aircrafts: updatedAircrafts });
				handleEditAircraftData([]);

			} catch (err) {
				console.log(err);
			}
		}

	}
	*/

	useEffect(() => {

		// skip initial render
		if (Object.keys(flightsCtx).length === 0) {
			return;
		}

		const aircraftData = flightsCtx.aircrafts.find(aircraft => aircraft._id === aicraftId);
		
		setAircraft(aircraftData);
		setFlights(aircraftData.flights);
		handleEditFlightData(aircraftData);
	}, [flightsCtx])

	return (
		<>
			<h3 className="text-white">Flight List (Flights Catalog)</h3>

			<div className="card">
				<h5 className="card-header">Aircraft: {aircraft.airlineName} ({aircraft.aircraftRegistrationNumber})</h5>
				<div className="table-responsive text-nowrap">
					<table className="table">
						<thead>
							<tr>
								<th></th>
								<th>Airline</th>
								<th>Registration Number</th>
								<th>DEP</th>
								<th>ARR</th>
								<th>Flight Number</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody className="table-border-bottom-0">
							{flights && flights.map((flight, index) => (
								<tr key={flight._id}>
									<td>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cursor" viewBox="0 0 16 16">
											<path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52z" />
										</svg>
									</td>
									<td>{aircraft.airlineName}</td>
									<td>{aircraft.aircraftRegistrationNumber}</td>
									<td>{flight.departureAirport}</td>
									<td>{flight.arrivalAirport}</td>
									<td>{flight.flightNumber}</td>
									<td>
										{index == flights.length - 1 && (
											<div className="btn-group">
												<button type="button" className="btn btn-outline-secondary"
													onClick={(e) => handleCkickEdit(e, aircraft)}
												>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
														<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
														<path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
													</svg>
												</button>
												<button type="button" className="btn btn-danger"
													onClick={(e) => handleCkickDelete(e, aircraft)}
												>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
														<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
														<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
													</svg>
												</button>
											</div>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{!!actionErrors && (
					<div className="alert alert-danger mb-3" role="alert">
						{actionErrors}
					</div>
				)}
			</div>
		</>
	)

}