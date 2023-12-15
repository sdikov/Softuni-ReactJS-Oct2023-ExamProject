import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header.jsx';
import Home from './components/Home/Home.jsx';

import { FlightsContextProvider } from "./context/FlightsContext.jsx";

function App() {

  return (
    <FlightsContextProvider>
      <Header />
      <div className='container-fluid'>
        <div className='row flex-nowrap'>       
          <main className='vh-100 bg-dark col-12'>

            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>

          </main >
        </div>
      </div>
    </FlightsContextProvider >
  )
}

export default App