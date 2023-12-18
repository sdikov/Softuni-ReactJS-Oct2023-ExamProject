import { useState } from 'react';
import { useParams } from "react-router-dom";

import FlightList from './FlightsList.jsx';
import FlightsForm from './FlightsForm.jsx';

export default function Flights() {

	const { aicraftId } = useParams();

	const [data, setData] = useState([]);
	const handleEditFlightData = (newData) => {
		setData(newData);
	}

	return (
		<>
			<div className="row">
				<div className="col-7 text-white">
					<FlightList
						aicraftId={aicraftId}
						handleEditFlightData={handleEditFlightData}
					/>
				</div>
				<div className="col-5">
					<FlightsForm
						aircraftData={data}
						handleEditFlightData={handleEditFlightData}
					/>
				</div>
			</div>
		</>
	)

}