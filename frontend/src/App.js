import React, { useEffect, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Routes, Route, Navigate, useNavigate } from 'react-router';
import { login, logout } from './redux/slices/userInfoSlice';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Auth/Login.jsx';
import Header from './components/shared/Header.jsx';
import TabNavigation from './components/shared/TabNavigation.jsx';
import Overview from './pages/Overview.jsx';
import Organizer from './pages/Organizer.jsx';
import Events from './pages/Events.jsx';
import bgDashboard from './assets/images/bgdashboard.jpg'
import Analytics from './pages/Analytics.jsx';
import Settings from './pages/Settings.jsx';
import CreateEventForm from './components/forms/CreateEventForm.jsx';
import CreateOrganizerForm from './components/forms/CreateOrganizerForm.jsx';
import OrganizerDashboard from "./pages/OrganizerDashboard.jsx"
// import Login from './pages/Auth/Login';
// --- Page Components ---
const Home = () => (
  <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold mb-4 text-gray-800">Home Page</h1>
    <p className="text-gray-600 text-center">This is a public page. Anyone can see this.</p>
  </div>
);



const App = () => {
  const isLoggedIn = useSelector((state) => state.userInfo?.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("Overview");
  const [editUserInfo, setEditUserInfo] = useState(null)
  const onTabChange = (tab) => {
    navigate(`/${tab}`)
    // navigate(`Admin/${tab}`)
    setCurrentTab(tab)
  }
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
    } else {
      navigate("/overview")
    }
  }, [isLoggedIn])
  return (

    <div className="bg-[var(--color-surface-background)] min-h-screen font-sans antialiased " style={{
      backgroundColor: 'var(--color-surface-background)',
      // backfaceVisibility:"visible",
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgDashboard})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      {
        isLoggedIn &&
        <> <Header></Header>
          <div className='bg-[var(--border-color)] p-1 rounded-full mt-1'>
            <TabNavigation {...{ currentTab, onTabChange }}></TabNavigation>
          </div></>
      }

      {/* <nav className="mb-8 flex justify-center space-x-4">
          <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">Home</Link>
          <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-medium">Dashboard</Link>
          {!isLoggedIn ? (
            <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">Login</Link>
          ) : (
            <button
              onClick={() => dispatch(logout())}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Logout
            </button>
          )}
        </nav> */}


      <main className="flex justify-center ">
        <Routes>
          <Route path="/" element={<Home />} />
          {isLoggedIn ?
            <Route path="/login" element={<Navigate to="/overview" />} /> :
            <Route path="/login" element={<Login />} />
          }
          <Route path="/events/createEvent" element={<PrivateRoute isLoggedIn={isLoggedIn}><CreateEventForm /></PrivateRoute>} />
          <Route path="/organizations/createOrganizer" element={<PrivateRoute isLoggedIn={isLoggedIn}><CreateOrganizerForm organizerToUpdate={editUserInfo} /></PrivateRoute>} />
          <Route path="/overview" element={<PrivateRoute isLoggedIn={isLoggedIn}><Overview /></PrivateRoute>} />
          <Route path="/Organizations" element={<PrivateRoute isLoggedIn={isLoggedIn}><Organizer editUserInfo={editUserInfo} setEditUserInfo={setEditUserInfo} /></PrivateRoute>} />
          <Route path="/events" element={<PrivateRoute isLoggedIn={isLoggedIn}><Events /></PrivateRoute>} />
          <Route path="/analytics" element={<PrivateRoute isLoggedIn={isLoggedIn}><Analytics /></PrivateRoute>} />
          <Route path="/organizerDashboard" element={<PrivateRoute isLoggedIn={isLoggedIn}><Settings /></PrivateRoute>} />

          <Route path="/settings" element={<PrivateRoute isLoggedIn={isLoggedIn}><Settings /></PrivateRoute>}
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                {/* <Dashboard /> */}
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>

  );
};

export default App