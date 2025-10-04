import React, { useEffect, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import Map from './pages/Map';
import Schedule from './pages/Schedule';
import Footer from './components/Footer';
import Header from './components/Header';
import Info from "./pages/Info"
import Events from './pages/Events';
import Artists from './pages/Artists';
import ScheduleHeaderButton from './components/shared/ScheduleHeaderButton';
import ArtistPageButton from './components/shared/ArtistPageButton';
import InfoHeaderButton from './components/shared/InfoHeaderButton';
import HomeHeaderButton from './components/shared/HomeHeaderButton';
import FormPage from './pages/FormPage';

const App = () => {
  const [currentTab, setCurrentTab] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(true);
  const headerButtonMap = {
    home: HomeHeaderButton,
    schedule: ScheduleHeaderButton,
    info: InfoHeaderButton
  }
  const onTabChange = (tab) => {
    navigate(`/${tab.toLowerCase()}`)

    setCurrentTab(tab)
  }
  function onCancel() {
    setShowForm(false)
  }
  useEffect(() => {

    const path = location.pathname.split("/")[1];
    setCurrentTab(path);
  }, [location.pathname]);
  return (

    <div className="bg-black border min-h-screen  w-screen relative overflow-x-hidden  mb-[110px]">
      <Header Button={headerButtonMap[currentTab]}></Header>
      {
        showForm &&
        <FormPage {...{ onCancel }} />
      }


      <main className="flex justify-center w-full mt-[70px] md:mt-[100px] ">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Schedule" element={<Events />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/Info" element={<Info />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/artist" element={<Artists />} />
        </Routes>
      </main>

      <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 w-full  p-4 max-w-[500px]  max-h-[70px] mb-[40px] rounded-full shadow-xl z-10 ">

        <Footer {...{ currentTab, onTabChange }} ></Footer>
      </div>
      <Toaster position="top-left" richColors />

    </div>

  );
};

export default App