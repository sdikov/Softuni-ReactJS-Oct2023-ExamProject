import { useState, useContext } from "react";
import { Link } from 'react-router-dom';

import { AuthContext } from "../../context/AuthContext.jsx";

export default function Login() {

	const { loginSubmitHandler } = useContext(AuthContext);

	const [formData, setFormData] = useState({
		'email': '',
		'password': ''
	});

	const [errors, setErrors] = useState('');

	/**
	 * Controlled Form
	 */
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	/**
	 * on submit use Auth Context login handler
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formData.email.length == 0 || formData.password.length == 0) {
			// todo: error hadnling
			return;
		}

		try {
			await loginSubmitHandler(formData);
		} catch (error) {
			//setErrors(error.message);
			setErrors('Login failed. Invalid credentials or password');
		}

		//onLogin(username, password);
	};

	return (
		<>
			<div className="mt-4 d-flex flex-column align-items-center justify-content-center">

				<div className="card col-md-4">
					<div className="card-body">

						<h4 className="mb-2">Login</h4>

						<form className="mb-3" onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="email" className="form-label">Email</label>
								<input type="text" className="form-control" id="email" name="email" placeholder="Enter your email" autoFocus=""
									value={formData.username} onChange={handleChange}
								/>
							</div>

							<div className="mb-3 form-password-toggle">
								<label className="form-label" htmlFor="password">Password</label>
								<input type="password" className="form-control" id="password" name="password" placeholder="" aria-describedby="password"
									value={formData.password} onChange={handleChange}
								/>
							</div>

							<div className="mb-3">
								<button className="btn btn-primary d-grid w-100" type="submit">Sign in</button>
							</div>

							{!!errors && (
								<div className="alert alert-danger mb-3" role="alert">
									{errors}
								</div>
							)}
						</form>

					</div>
				</div>

				<div className="col-md-4 text-white mt-3">
					<div className="alert alert-dark" role="alert">
						<p>for immediate testing:</p>
						<ul className="list-unstyled">
							<li>username: admin@abv.bg</li>
							<li>password: admin</li>
						</ul>
						<p>or <Link to={`/auth/register`} className="">create new user</Link></p>
					</div>
				</div>

			</div>
		</>
	)

}