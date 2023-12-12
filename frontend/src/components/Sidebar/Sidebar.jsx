import { Link } from 'react-router-dom';

export default function Sidebar() {
	const sidebarStyle = {
		width: '280px',
		height: '100vh'
	};

	return (
		<div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark " style={sidebarStyle}>
			<Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
				<svg className="bi pe-none me-2" width="35" height="35">
					<image className="nav-svg" href="/images/airport.svg" height="35" width="35" />
				</svg>
				<span className="fs-4">Alfa Tango Charlie</span>
			</Link>
			<hr />
			<ul className="nav nav-pills flex-column mb-auto">
				<li className="nav-item">
					<Link to="/" className="nav-link text-white">Home</Link>
				</li>
				<li className="nav-item">
					<Link to="/home" className="nav-link text-white">HomeTest</Link>
				</li>
			</ul>
		</div>
	);
}