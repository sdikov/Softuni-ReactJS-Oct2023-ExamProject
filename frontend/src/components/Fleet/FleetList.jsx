import { useState, useEffect, useContext, useRef } from 'react';

import * as aircraftsService from '../../services/aircraftsService.js';
import { FlightsContext } from "../../context/FlightsContext.jsx";

export default function FleetList() {

	const [contextValue, updateFlightsCtx] = useContext(FlightsContext);
	const [aircrafts, setAircrafts] = useState([]);


	const handleCkickStatus = async (e, aircraftId, isActive) => {
		e.preventDefault();

		const data = await aircraftsService.getOneById(aircraftId);
		data.isActive = isActive;

		try {
			await aircraftsService.edit(aircraftId, data);

			const updatedAircrafts = await aircraftsService.getAll();

			// updateFlightsCtx({
			// 	...contextValue,
			// 	aircrafts: updatedAircrafts,
			// });
			setAircrafts(updatedAircrafts);

		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {

		// skip initial render
		if (Object.keys(contextValue).length === 0) {
			return;
		}

		setAircrafts(contextValue.aircrafts);
	}, [contextValue])

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
										<button
											onClick={(e) => handleCkickStatus(e, aircraft._id, !aircraft.isActive)}
											type="button"
											className="btn btn-sm btn-outline-secondary">{aircraft.isActive ? 'Disable' : 'Enable'}</button>
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