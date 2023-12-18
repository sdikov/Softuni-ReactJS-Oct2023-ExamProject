import { useState, useEffect, useContext, useRef } from 'react';

import * as aircraftsService from '../../services/aircraftsService.js';
import * as flightsService from '../../services/flightsService.js';
import { FlightsContext } from "../../context/FlightsContext.jsx";

const formDefaultValues = {
	airlineName: '',
	aircraftRegistrationNumber: '',
	flightNumber: '',
	departureAirport: '',
	arrivalAirport: '',
}

export default function FlightsForm({ aircraftData, handleEditFlightData }) {

	const [flightsCtx, updateFlightsCtx] = useContext(FlightsContext);
	const [formData, setFormData] = useState(formDefaultValues);
	const [formErrors, setFormErrors] = useState();
	const [airports, setAirports] = useState();

	//console.log(aircraftData.airlineName);
	//console.log(flightsCtx.airports);
	//console.log(formData);

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
		return;
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
			formData.flightNumber,
			formData.arrivalAirport
		];
		if (validateValues.some((value) => !value.trim())) {
			setFormErrors('Please fill in all fields');
			return;
		}

		try {
			// edit
			if (formData._id) {
				// await aircraftsService.edit(formData._id, {
				// 	"airlineName": formData.airlineName,
				// 	"aircraftRegistrationNumber": formData.aircraftRegistrationNumber,
				// 	"aircraftType": formData.aircraftType,
				// 	"currentFlightIndex": 0,
				// 	"isActive": formData.isActive,
				// 	"_id": formData._id
				// });
				// //clearForm();

			} else {
				// create
				await flightsService.create({
					aircraftId: aircraftData._id,
					flightNumber: formData.flightNumber,
					arrivalAirport: formData.arrivalAirport,
					departureAirport: formData.departureAirport,
				});
				clearForm();
			}

			// update ctx
			const updatedAircrafts = await flightsService.getAll();
			updateFlightsCtx({ flights: updatedAircrafts });

		} catch (err) {
			// Error notification
			console.log(err);
		}
	}

	/**
	 * find last flight and return airport code
	 */
	const findDepartureAirport = () => {
		const lastFlight = [...aircraftData.flights].pop();
		return lastFlight?.arrivalAirport || 'PDV';
	};

	useEffect(() => {

		// skip initial render
		if (Object.keys(flightsCtx).length === 0) {
			return;
		}

		if (Object.keys(aircraftData).length !== 0) {

			//console.log(aircraftData);

			const lastAiport = findDepartureAirport();
			const airportsFiltered = [...flightsCtx.airports].filter(airport => airport.code !== lastAiport);
			console.log(airportsFiltered);

			setAirports(airportsFiltered);

			setFormData((prevState) => ({
				...prevState,
				airlineName: aircraftData?.airlineName || '',
				aircraftRegistrationNumber: aircraftData?.aircraftRegistrationNumber || '',
				departureAirport: lastAiport,
			}));
		}

		// Update form data if we have aircraft to edit
		if ('_id' in aircraftData) {
			//console.log(aircraftData);
			//setFormData(aircraftData);
		}
	}, [aircraftData, flightsCtx]);

	return (
		<>
			<h3 className="text-white">Flight Update</h3>

			<div className={`card ${formData._id ? 'text-bg-secondary' : ''}`}>
				<h5 className="card-header d-flex">
					{formData._id ? 'Edit' : 'Add'} Flight
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
							<input type="text" className="form-control-plaintext" id="airlineName" name="airlineName" disabled readOnly
								value={formData.airlineName}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="aircraftRegistrationNumber" className="form-label">Registration Number</label>
							<input className="form-control-plaintext" type="text" id="aircraftRegistrationNumber" name="aircraftRegistrationNumber" disabled readOnly
								value={formData.aircraftRegistrationNumber}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="flightNumber" className="form-label">Flight Number</label>
							<input type="text" id="flightNumber" className="form-control" name="flightNumber"
								value={formData.flightNumber} onChange={handleChange}
							/>
						</div>
						<div className="row mb-3">
							<div className="col-6">
								<label htmlFor="departureAirport" className="form-label">Departure Airport</label>
								<input className="form-control-plaintext" type="text" id="departureAirport" name="departureAirport" disabled readOnly
									value={formData.departureAirport}
								/>
							</div>
							<div className="col-6">
								<label htmlFor="arrivalAirport" className="form-label">Select Arrival Airport</label>
								<select className="form-select" id="arrivalAirport" name="arrivalAirport"
									value={formData.arrivalAirport} onChange={handleChange}
								>
									<option value="">---</option>
									{airports && airports.map((airport) => (
										<option key={airport.code} value={airport.code}>
											{airport.name}
										</option>
									))}
								</select>
							</div>
						</div>
						{!!formErrors && (
							<div className="alert alert-danger mb-3" role="alert">
								{formErrors}
							</div>
						)}

						<button type="submit" className="btn btn-primary me-2">{formData._id ? 'Edit' : 'Add'} Flight</button>
						<button type="button" className="btn btn-secondary" onClick={clearForm}>{formData._id ? 'Close' : 'Clear'}</button>
					</form>
				</div>
			</div>
		</>
	)

}