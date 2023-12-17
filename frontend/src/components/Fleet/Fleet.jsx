import FleetList from "./FleetList.jsx"


export default function Fleet() {

	return (
		<>
			<div className="row">
				<div className="col-8">
					<FleetList />
				</div>
				<div className="col-4">
					<h2 className="text-white">Form?</h2>
				</div>
			</div>
		</>
	)

}