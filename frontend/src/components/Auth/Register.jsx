import { useState, useContext } from "react";

import { AuthContext } from "../../context/AuthContext.jsx";

export default function Register() {

	const { registerSubmitHandler } = useContext(AuthContext);

	const [formData, setFormData] = useState({
		'email': '',
		'username': '',
		'password': '',
		'passwordConfirm': ''
	});

	const [errors, setErrors] = useState('');

	/**
	 * Submit form
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();

		// console.log('handleSubmit Register');
		// console.log(formData);

		if (formData.email.length == 0 || formData.username.length == 0 || formData.username.length == 0 || formData.passwordConfirm.length == 0) {
			// todo: error hadnling
			setErrors('All fields are required!');
			return;
		}

		if (formData.password !== formData.passwordConfirm) {
			setErrors('Password and confirm password does not match');
			return;
		}

		try {
			await registerSubmitHandler({
				email: formData.email,
				username: formData.username,
				password: formData.password
			});
		} catch (error) {
			setErrors(error.message);
		}

	};

	/**
	 * Controlled Form
	 */
	const handleChange = (e) => {
		setErrors();
		const { name, value } = e.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	return (
		<>
			<div className="mt-4 d-flex align-items-center justify-content-center">


				<div className="card col-md-4">
					<div className="card-body">

						<h4 className="mb-2">Register</h4>

						<form className="mb-3" onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="username" className="form-label">Username</label>
								<input type="text" className="form-control" id="username" name="username" placeholder="Enter your username" autoFocus=""
									value={formData.username} onChange={handleChange}
								/>
							</div>

							<div className="mb-3">
								<label htmlFor="email" className="form-label">Email</label>
								<input type="text" className="form-control" id="email" name="email" placeholder="Enter your email" autoFocus=""
									value={formData.email} onChange={handleChange}
								/>
							</div>

							<div className="mb-3 form-password-toggle">
								<label className="form-label" htmlFor="password">Password</label>
								<input type="password" className="form-control" id="password" name="password" aria-describedby="password"
									value={formData.password} onChange={handleChange}
								/>
							</div>

							<div className="mb-3 form-password-toggle">
								<label className="form-label" htmlFor="passwordConfirm">Confirm password</label>
								<input type="password" className="form-control" id="passwordConfirm" name="passwordConfirm" aria-describedby="password"
									value={formData.passwordConfirm} onChange={handleChange}
								/>
							</div>

							<div className="mb-3">
								<button className="btn btn-primary d-grid w-100" type="submit">Sign up</button>
							</div>

							{!!errors && (
								<div className="alert alert-danger mb-3" role="alert">
									{errors}
								</div>
							)}
						</form>

					</div>
				</div>

			</div>
		</>
	)

}