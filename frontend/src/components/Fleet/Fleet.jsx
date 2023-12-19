import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import FleetList from "./FleetList.jsx"
import FleetForm from "./FleetForm.jsx"

import { AuthContext } from "../../context/AuthContext.jsx"


export default function Fleet() {

	const { isAuthenticated } = useContext(AuthContext);
	console.log(isAuthenticated);

	const [data, setData] = useState([]);
	const handleEditAircraftData = (newData) => {
		setData(newData);
	}

	return (
		<>
			<div className="row">
				<div className={isAuthenticated ? "col-7" : "col-12"}>
					<FleetList handleEditAircraftData={handleEditAircraftData} />
				</div>
				{isAuthenticated && (
					<div className="col-5">
						<FleetForm
							aircraftData={data}
							handleEditAircraftData={handleEditAircraftData}
						/>
					</div>
				)}
			</div>

			{!isAuthenticated && (
				<div className="row align-items-center justify-content-center mt-3">
					<div className="col-6">
						<div className="card bg-transparent border-white text-light mb-3">
							<div className="card-body">
								<h5 className="card-title">How to add new Aircraft?</h5>
								<p className="card-text">You need to be logged in to access full functionality of this page.</p>
								<Link to={`/auth/login`} className="btn btn-primary">Login</Link>
							</div>
						</div>
					</div>
				</div>
			)}

		</>
	)

}