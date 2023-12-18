import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext.jsx';

import Header from './components/Header/Header.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Auth/Login.jsx';
import Logout from './components/Auth/Logout.jsx';
import Register from './components/Auth/Register.jsx';
import Fleet from './components/Fleet/Fleet.jsx';
import Flights from './components/Flights/Flights.jsx';

import { FlightsContextProvider } from "./context/FlightsContext.jsx";


function App() {

  return (
    <AuthProvider>
      <FlightsContextProvider>
        <Header />
        <div className='container-fluid'>
          <div className='row flex-nowrap'>
            <main className='vh-100 bg-dark col-12'>

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/logout" element={<Logout />} />
                <Route path="/fleet" element={<Fleet />} />
                <Route path="/flights/:aicraftId" element={<Flights />} />
              </Routes>

            </main >
          </div>
        </div>
      </FlightsContextProvider >
    </AuthProvider>
  )
}

export default App