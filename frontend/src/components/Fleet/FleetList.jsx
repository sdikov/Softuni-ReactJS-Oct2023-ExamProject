import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import * as aircraftsService from '../../services/aircraftsService.js';
import { FlightsContext } from "../../context/FlightsContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx"

export default function FleetList({ handleEditAircraftData }) {

	const { userId, isOwner, isAuthenticated } = useContext(AuthContext);
	const [flightsCtx, updateFlightsCtx] = useContext(FlightsContext);
	const [aircrafts, setAircrafts] = useState([]);
	const [actionErrors, setActionErrors] = useState();

	/**
	 * change aicraft status 
	 * and update Flights Context
	 */
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

	/**
	 * Edit aircraft
	 */
	const handleCkickEdit = async (e, aircraft) => {
		handleEditAircraftData(aircraft);
		//console.log(aircraft);
	}

	/**
	 * Delete aircraft
	 */
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

	useEffect(() => {

		// skip initial render
		if (Object.keys(flightsCtx).length === 0) {
			return;
		}
		//console.log(flightsCtx.aircrafts);

		setAircrafts(flightsCtx.aircrafts);
	}, [flightsCtx])

	return (
		<>
			<h3 className="text-white">Fleet List (Aircraft Catalog)</h3>

			<div className="card">
				<h5 className="card-header">All Aircrafts</h5>
				<div className="table-responsive text-nowrap">
					<table className="table">
						<thead>
							<tr>
								<th></th>
								<th>Airline</th>
								<th>Reg. №</th>
								<th>Owner</th>
								<th>Type</th>
								<th>Flights</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody className="table-border-bottom-0">
							{aircrafts && aircrafts.map((aircraft, index) => (
								<tr key={aircraft._id}>
									<td>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-airplane-fill" viewBox="0 0 16 16">
											<path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849" />
										</svg>
									</td>
									<td>{aircraft.airlineName}</td>
									<td>{aircraft.aircraftRegistrationNumber}</td>
									<td>{aircraft._ownerUsername}</td>
									<td>{aircraft.aircraftType}</td>
									<td>

										<Link to={`/flights/${aircraft._id}`} className="btn btn-outline-secondary">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list-ol" viewBox="0 0 16 16">
												<path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5" />
												<path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635z" />
											</svg>
											<span className='ms-2'>{aircraft.flights.length}</span>

										</Link>
									</td>
									<td>
										{isAuthenticated ? (
											<button
												onClick={(e) => handleCkickStatus(e, index, aircraft._id, !aircraft.isActive)}
												type="button"
												className={`btn ${aircraft.isActive ? 'text-bg-success' : 'text-bg-danger'}`}>
												{aircraft.isActive ? (
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-right me-2" viewBox="0 0 16 16">
														<path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z" />
													</svg>
												) : (
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-right me-2" viewBox="0 0 16 16">
														<path fillRule="evenodd" d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0z" />
													</svg>
												)}
												{aircraft.isActive ? 'Active' : 'Grounded'}
											</button>
										) : (
											<>
												{aircraft.isActive ? 'Active' : 'Grounded'}
											</>
										)}

									</td>
									<td>
										{isOwner(userId, aircraft) ? (
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
										) : (
											<div className='text-muted'></div>
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