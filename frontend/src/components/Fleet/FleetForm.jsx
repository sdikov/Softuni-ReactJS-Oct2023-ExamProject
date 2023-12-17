import { useState, useEffect, useContext, useRef } from 'react';

import * as aircraftsService from '../../services/aircraftsService.js';
import { FlightsContext } from "../../context/FlightsContext.jsx";

export default function FleetForm() {

	const [flightsCtx, updateFlightsCtx] = useContext(FlightsContext);

	const [formData, setFormData] = useState({
		airlineName: '',
		aircraftRegistrationNumber: '',
		aircraftType: '',
	});
	const [formErrors, setFormErrors] = useState();

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(`${name}:${value}`);
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const formSubmitHandler = async (e) => {
		e.preventDefault();

		// simple validation check
		// todo: Validate the form and If there are errors, don't proceed with the submission
		setFormErrors();
		if (Object.values(formData).some((value) => !value.trim())) {
			setFormErrors('Please fill in all fields');
			return;
		}

		//console.log(formData);

		try {
			await aircraftsService.create(formData);
			const updatedAircrafts = await aircraftsService.getAll();

			updateFlightsCtx({ aircrafts: updatedAircrafts });
   
		 } catch (err) {
			// Error notification
			console.log(err);
		 }
	}

	return (
		<>
			<h2 className="text-white">Form</h2>

			<div className="card">
				<h5 className="card-header">Add Fleet</h5>
				<div className="card-body">
					<form onSubmit={formSubmitHandler}>
						<div className="mb-3">
							<label htmlFor="airlineName" className="form-label">Airline Name</label>
							<input type="text" className="form-control" id="airlineName" name="airlineName"
								value={formData.airlineName} onChange={handleChange}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="aircraftRegistrationNumber" className="form-label">Registration Number</label>
							<input className="form-control" type="text" id="aircraftRegistrationNumber" name="aircraftRegistrationNumber"
								value={formData.aircraftRegistrationNumber} onChange={handleChange}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="aircraftType" className="form-label">Select Aircraft Type</label>
							<select className="form-select" id="aircraftType" name="aircraftType"
								value={formData.aircraftType} onChange={handleChange}
							>
								<option value="">---</option>
								<option value="Airbus А319">Airbus А319</option>
								<option value="Airbus A320">Airbus A320</option>
								<option value="Airbus A321">Airbus A321</option>
								<option value="Embraer 190">Embraer 190</option>
							</select>
						</div>
						{!!formErrors && (
							<div className="alert alert-danger mb-3" role="alert">
								{formErrors}
							</div>
						)}

						<button type="submit" className="btn btn-primary">Add Aircraft</button>
					</form>
				</div>
			</div>
		</>
	)

}