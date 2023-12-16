import { createContext, useContext, useRef } from 'react';

const AirplaneMarkerContext = createContext();

const useMarkerContext = () => {
	return useContext(AirplaneMarkerContext);
};

const AirplaneMarkerContextProvider = ({ children }) => {
	///const refArr = useRef(null);
	const refArr = {};

	const addRef = (name, ref) => {
		refArr[name] = ref;
	};

	const getRef = (name) => {
		return refArr[name].current;
	};

	const values = {
		addRef,
		getRef
	}

	return (
		<AirplaneMarkerContext.Provider value={values}>
			{children}
		</AirplaneMarkerContext.Provider>
	);
};

export { AirplaneMarkerContext, AirplaneMarkerContextProvider, useMarkerContext };