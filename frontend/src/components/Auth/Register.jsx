import { useState } from "react";

export default function Register() {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('handleSubmit Register');
		
		//onLogin(username, password);
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
								<input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" id="username" name="username" placeholder="Enter your username" autoFocus="" />
							</div>

							<div className="mb-3 form-password-toggle">
								<label className="form-label" htmlFor="password">Password</label>
								<input value={password} onChange={(e) => setPassword(e.target.value)}  type="password" className="form-control" id="password" name="password" placeholder="*****" aria-describedby="password" />
							</div>

							<div className="mb-3 form-password-toggle">
								<label className="form-label" htmlFor="password-confirm">Confirm password</label>
								<input value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}  type="password" className="form-control" id="password-confirm" name="password-confirm" placeholder="*****" aria-describedby="password" />
							</div>

							<div className="mb-3">
								<button className="btn btn-primary d-grid w-100" type="submit">Sign up</button>
							</div>
						</form>

					</div>
				</div>

			</div>
		</>
	)

}