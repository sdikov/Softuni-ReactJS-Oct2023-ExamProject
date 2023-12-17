import { AirplaneMarkerContextProvider } from '../../context/AirplaneMarkerContext.jsx';

import Map from './Map/Map.jsx';
import CardPanel from './CardPanel.jsx';

export default function Home() {
	return (
		<>
			<AirplaneMarkerContextProvider>
				<div className='row'>
					<div className='col-3'>
						<CardPanel />
					</div>
					<div className='col-9'>
						<Map />
					</div>
				</div>
			</AirplaneMarkerContextProvider>
		</>
	);
}