import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Home from './components/Home/Home.jsx';
import Map from './components/Map/Map.jsx';

import { FlightsContextProvider } from "./context/FlightsContext.jsx";

function App() {

  return (
    <FlightsContextProvider>

      <main className='d-flex flex-nowrap'>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </main >



    </FlightsContextProvider >
  )
}

export default App