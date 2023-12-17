import FleetList from "./FleetList.jsx"
import FleetForm from "./FleetForm.jsx"


export default function Fleet() {

	return (
		<>
			<div className="row">
				<div className="col-7">
					<FleetList />
				</div>
				<div className="col-5">
					
					<FleetForm />
				</div>
			</div>
		</>
	)

}