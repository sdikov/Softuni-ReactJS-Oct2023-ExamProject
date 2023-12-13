import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Home from './components/Home/Home.jsx';
import Map from './components/Map/Map.jsx';

import { FlightsContextProvider } from "./context/FlightsContext.jsx";

function App() {

  return (
    <FlightsContextProvider>
      <div className='container-fluid'>
        <div className='row flex-nowrap'>
          <Sidebar />
          <main className='vh-100 bg-dark col py-3'>
            <Routes>
              <Route path="/" element={<Map />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </main >
        </div>
      </div>
    </FlightsContextProvider >
  )
}

export default App