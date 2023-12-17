import { useState, useEffect, useContext, useRef } from 'react';

import * as aircraftsService from '../../services/aircraftsService.js';
import { FlightsContext } from "../../context/FlightsContext.jsx";

export default function FleetList() {

	const [flightsCtx, updateFlightsCtx] = useContext(FlightsContext);
	const [aircrafts, setAircrafts] = useState([]);


	/**
	 * change aicraft status 
	 * and update Flights Context
	 */
	const handleCkickStatus = async (e, aircraftId, isActive) => {
		e.preventDefault();

		const data = await aircraftsService.getOneById(aircraftId);
		data.isActive = isActive;

		try {
			await aircraftsService.edit(aircraftId, data);
			const updatedAircrafts = await aircraftsService.getAll();

			updateFlightsCtx({ aircrafts: updatedAircrafts });

		} catch (err) {
			console.log(err);
		}
	}

	const handleCkickDelete = async (e, aircraftId) => {
		try {
			await aircraftsService.remove(aircraftId);
			const updatedAircrafts = await aircraftsService.getAll();

			updateFlightsCtx({ aircrafts: updatedAircrafts });

		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {

		// skip initial render
		if (Object.keys(flightsCtx).length === 0) {
			return;
		}

		setAircrafts(flightsCtx.aircrafts);
	}, [flightsCtx])

	return (
		<>
			<h2 className="text-white">Fleet List</h2>

			<div className="card">
				<h5 className="card-header">Table Basic</h5>
				<div className="table-responsive text-nowrap">
					<table className="table">
						<thead>
							<tr>
								<th>Airline</th>
								<th>Registration Number</th>
								<th>Type</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody className="table-border-bottom-0">
							{aircrafts && aircrafts.map((aircraft, index) => (
								<tr key={aircraft._id}>
									<td>{aircraft.airlineName}</td>
									<td>{aircraft.aircraftRegistrationNumber}</td>
									<td>{aircraft.aircraftType}</td>
									<td>
										<span className={`badge ${aircraft.isActive ? 'text-bg-success' : 'text-bg-danger'}`}>
											{aircraft.isActive ? 'Active' : 'Inactive'}
										</span>
									</td>
									<td>
										<div className="btn-group">
											<button
												onClick={(e) => handleCkickStatus(e, aircraft._id, !aircraft.isActive)}
												type="button"
												className="btn btn-outline-secondary">{aircraft.isActive ? 'Disable' : 'Enable'}
											</button>
											<button type="button" class="btn me-2 btn-danger"
												onClick={(e) => handleCkickDelete(e, aircraft._id)}
											>
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
													<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
													<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
												</svg>
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)

}