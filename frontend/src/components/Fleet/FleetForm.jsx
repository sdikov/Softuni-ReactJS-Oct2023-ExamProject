import { useState, useEffect, useContext, useRef } from 'react';

import * as aircraftsService from '../../services/aircraftsService.js';
import { FlightsContext } from "../../context/FlightsContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx"

const formDefaultValues = {
	airlineName: '',
	aircraftRegistrationNumber: '',
	aircraftType: '',
}

export default function FleetForm({ aircraftData, handleEditAircraftData }) {

	const { userId, username } = useContext(AuthContext);

	const [flightsCtx, updateFlightsCtx] = useContext(FlightsContext);
	const [formData, setFormData] = useState(formDefaultValues);
	const [formErrors, setFormErrors] = useState();

	//console.log(aircraftData);

	/**
	 * Controlled Form
	 */
	const handleChange = (e) => {
		const { name, value } = e.target;
		//console.log(`${name}:${value}`);
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	/**
	 * clear form
	 */
	const clearForm = () => {
		setFormData(formDefaultValues);
		handleEditAircraftData([]);
	};

	/**
	 * submit form
	 */
	const formSubmitHandler = async (e) => {
		e.preventDefault();

		//console.log(formData);

		// simple validation check
		// todo: Validate the form and If there are errors, don't proceed with the submission
		setFormErrors();
		const validateValues = [
			formData.airlineName,
			formData.aircraftRegistrationNumber,
			formData.aircraftType
		];
		if (validateValues.some((value) => !value.trim())) {
			setFormErrors('Please fill in all fields');
			return;
		}

		try {
			// edit
			if (formData._id) {
				await aircraftsService.edit(formData._id, {
					"airlineName": formData.airlineName,
					"aircraftRegistrationNumber": formData.aircraftRegistrationNumber,
					"aircraftType": formData.aircraftType,
					"currentFlightIndex": 0,
					"isActive": formData.isActive,
					"_id": formData._id,
					"_ownerId": userId,
					"_ownerUsername": username
				});
				//clearForm();

			} else {
				// create
				await aircraftsService.create({
					...formData,
					"_ownerId": userId,
					"_ownerUsername": username,
				});
				clearForm();
			}

			// update ctx
			const updatedAircrafts = await aircraftsService.getAll();
			updateFlightsCtx({ aircrafts: updatedAircrafts });

		} catch (err) {
			// Error notification
			console.log(err);
		}
	}

	useEffect(() => {
		setFormData(formDefaultValues);

		// Update form data if we have aircraft to edit
		if ('_id' in aircraftData) {
			//console.log(aircraftData);
			setFormData(aircraftData);
		}
	}, [aircraftData]);

	return (
		<>
			<h3 className="text-white">Fleet Update</h3>

			<div className={`card ${formData._id ? 'text-bg-secondary' : ''}`}>
				<h5 className="card-header d-flex">
					{formData._id ? 'Edit' : 'Add'} Aircraft
					{formData._id && (
						<div className="ms-auto">
							<a className="cursor-pointer text-white" onClick={clearForm}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
									<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
								</svg>
							</a>
						</div>
					)}

				</h5>
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

						<button type="submit" className="btn btn-primary me-2">{formData._id ? 'Edit' : 'Add'} Aircraft</button>
						<button type="button" className="btn btn-secondary" onClick={clearForm}>{formData._id ? 'Close' : 'Clear'}</button>
					</form>
				</div>
			</div>
		</>
	)

}