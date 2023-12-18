import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext.jsx';

export default function Header() {

	const { email, username, isAuthenticated } = useContext(AuthContext);

	return (
		<header className="p-3 bg-dark text-white">
			<div className="container-fluid">
				<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

					<Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
						<svg className="bi pe-none me-2" width="35" height="35">
							<image className="nav-svg" href="/images/airport.svg" height="35" width="35" />
						</svg>
						<span className="fs-5 text-nowrap text-uppercase">Alfa Tango Charlie</span>
					</Link>

					<ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
						<li><Link to="/" className="nav-link px-2 text-white">Home</Link></li>
						<li><Link to="/fleet" className="nav-link px-2 text-white">Fleet</Link></li>
					</ul>
					{!!isAuthenticated ? (
						<>
							<div className="nav-item me-2">{email}</div>
							<Link to="/auth/logout" className="btn btn-outline-light">Log out</Link>
						</>
					) : (
						<div className="text-end">
							<Link to="/auth/register" className="btn btn-outline-light me-2">Sign up</Link>
							<Link to="/auth/login" className="btn btn-primary">Login</Link>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}