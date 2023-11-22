import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Map from './components/Map/Map.jsx';

import { FlightsContextProvider } from "./context/FlightsContext.jsx";

function App() {

  return (
    <>
      <FlightsContextProvider>
        <Map />
      </FlightsContextProvider>

      {/* <Routes>
        <Route path="/" element={<Home />} />
      </Routes> */}
    </>
  )
}

export default App