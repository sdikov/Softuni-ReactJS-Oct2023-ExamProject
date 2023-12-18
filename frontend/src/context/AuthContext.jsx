import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as usersService from '../services/usersService.js';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

	const navigate = useNavigate();

	const [auth, setAuth] = useState(() => {

		const persistedState = localStorage.getItem('auth');

		if (persistedState) {
			return JSON.parse(persistedState);
		}

		return {
			'email': '',
			'username': '',
			'accessToken': '',
			isAuthenticated: false
		}
	});

	/**
	 * Register / Create User
	 */
	const registerSubmitHandler = async (formData) => {

		const result = await usersService.register(formData);

		const serializedValue = JSON.stringify(result);
		localStorage.setItem('auth', serializedValue);

		setAuth({ ...auth, ...result });		
		navigate('/');
	};


	/**
	* login
	*/
	const loginSubmitHandler = async (formData) => {

		const result = await usersService.login(formData.email, formData.password);

		const serializedValue = JSON.stringify(result);
		localStorage.setItem('auth', serializedValue);

		setAuth({ ...auth, ...result });
		navigate('/');
	};

	/**
	 * logout
	 */
	const logoutHandler = async () => {
		const result = await usersService.logout();

		setAuth({});
		localStorage.removeItem('auth');
		navigate('/');
	};

	const values = {
		registerSubmitHandler,
		loginSubmitHandler,
		logoutHandler,
		email: auth.email,
		username: auth.username,
		isAuthenticated: !!auth.accessToken,
	}

	return (
		<AuthContext.Provider value={values}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };