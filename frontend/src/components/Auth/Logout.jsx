import { useContext, useEffect } from "react";

import { AuthContext } from '../../context/AuthContext.jsx';

export default function Logout() {

	const { logoutHandler } = useContext(AuthContext);

	useEffect(() => {
		logoutHandler();
	}, []);

	return null;

}