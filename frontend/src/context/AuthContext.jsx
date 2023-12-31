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

		try {
			await usersService.logout();
		} catch (error) {
			//
		}

		setAuth({});
		localStorage.removeItem('auth');
		navigate('/');
	};

	/**
	 * owner
	 */
	const isOwner = (userId, object) => {
		return userId == object._ownerId;
	};

	const values = {
		registerSubmitHandler,
		loginSubmitHandler,
		logoutHandler,
		isOwner,
		userId: auth._id,
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