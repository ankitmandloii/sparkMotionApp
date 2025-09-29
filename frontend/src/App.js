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
import { useLocation } from "react-router";

import { Toaster } from 'sonner';
// import Login from './pages/Auth/Login';
// --- Page Components ---
const Home = () => (
  <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold mb-4 text-gray-800">Home Page</h1>
    <p className="text-gray-600 text-center">This is a public page. Anyone can see this.</p>
  </div>
);



const App = () => {
  const location = useLocation();
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.userInfo?.isLoggedIn);
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("overview");
  const navigate = useNavigate();
  const [editUserInfo, setEditUserInfo] = useState(null)
  const [analyticsPage, setAnalyticsPage] = useState(false)
  const onTabChange = (tab) => {
    navigate(`/${tab.toLowerCase()}`)
    // navigate(`Admin/${tab}`)
    setCurrentTab(tab)
  }
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      if (userInfo?.user?.role === "superAdmin") {
        navigate("/overview");
      } else if (userInfo?.user?.role === "organizer") {
        navigate("/org");
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const tabs = [
      "overview",
      "events",
      "organizations",
      "settings"
    ];
    const path = location.pathname.split("/")[1];
    if (tabs.includes(path.toLocaleLowerCase())) {
      setCurrentTab(path);
      setAnalyticsPage(false)
    }
    else {
      setAnalyticsPage(true)
    }
    console.log(location.pathname.split("/")[1])

  }, [location.pathname]);
  return (

    <div className="bg-[var(--color-surface-background)] min-h-screen font-sans antialiased custom-scrollbar" style={{
      backgroundColor: 'var(--color-surface-background)',
      // backfaceVisibility:"visible",
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgDashboard})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      {
        isLoggedIn &&
        <Header></Header>
      }
      {
        userInfo?.user?.role === "superAdmin" && !analyticsPage
        &&
        <div className='bg-[var(--border-color)] p-1 rounded-full mt-1'>
          <TabNavigation {...{ currentTab, onTabChange }}></TabNavigation>
        </div>
      }


      <main className="flex justify-center ">
        <Routes>
          {/* login redirect */}
          {isLoggedIn ? (
            userInfo?.user?.role === "superAdmin" ?
              <Route path="/login" element={<Navigate to="/overview" />} /> :
              <Route path="/login" element={<Navigate to="/org" />} />
          ) : (
            <Route path="/login" element={<Login />} />
          )}

          {/* superAdmin-only routes */}
          <Route
            path="/overview"
            element={
              <PrivateRoute
                role={userInfo?.user?.role}
                isLoggedIn={isLoggedIn}
                allowedRoles={["superAdmin"]}
              >
                <Overview />
              </PrivateRoute>
            }
          />
          <Route
            path="/organizations"
            element={
              <PrivateRoute
                role={userInfo?.user?.role}
                isLoggedIn={isLoggedIn}
                allowedRoles={["superAdmin"]}
              >
                <Organizer
                  editUserInfo={editUserInfo}
                  setEditUserInfo={setEditUserInfo}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/events"
            element={
              <PrivateRoute
                role={userInfo?.user?.role}
                isLoggedIn={isLoggedIn}
                allowedRoles={["superAdmin"]}
              >
                <Events />
              </PrivateRoute>
            }
          />
          <Route
            path="/analytics/:id"
            element={
              <PrivateRoute
                role={userInfo?.user?.role}
                isLoggedIn={isLoggedIn}
                allowedRoles={["superAdmin"]}
              >
                <Analytics />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute
                role={userInfo?.user?.role}
                isLoggedIn={isLoggedIn}
                allowedRoles={["superAdmin"]}
              >
                <Settings />
              </PrivateRoute>
            }
          />

          {/* organizer-only route */}
          <Route
            path="/org"
            element={
              <PrivateRoute
                role={userInfo?.user?.role}
                isLoggedIn={isLoggedIn}
                allowedRoles={["organizer"]}
              >
                <OrganizerDashboard />
              </PrivateRoute>
            }
          />
        </Routes>

      </main>
      <Toaster position="top-left" richColors />
    </div>

  );
};

export default App