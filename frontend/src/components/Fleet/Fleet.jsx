import { useState } from 'react';

import FleetList from "./FleetList.jsx"
import FleetForm from "./FleetForm.jsx"


export default function Fleet() {

	const [data, setData] = useState([]);
	const handleEditAircraftData = (newData) => {
		setData(newData);
	}

	return (
		<>
			<div className="row">
				<div className="col-7">
					<FleetList handleEditAircraftData={handleEditAircraftData} />
				</div>
				<div className="col-5">
					<FleetForm
						aircraftData={data}
						handleEditAircraftData={handleEditAircraftData}
					/>
				</div>
			</div>
		</>
	)

}