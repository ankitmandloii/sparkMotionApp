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
import { apiConnecter } from './service/apiConnector';
import { config } from './config';
import {
  setConfig,
} from './redux/slices/configSlice';

const App = () => {
  const [currentTab, setCurrentTab] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(true);
  const dispatch = useDispatch();
  const configState = useSelector((state) => state.config);


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


  useEffect(() => {
    // const fetchConfig = async () => {
    //   try {
    //     const response = await apiConnecter("GET", '');
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

    // fetchConfig();
    dispatch(setConfig(config))
    console.log(configState)
  }, [config, dispatch]);
  return (

    <div className="bg-black border min-h-screen  w-screen relative overflow-x-hidden  mb-[110px]">
      <Header Button={headerButtonMap[currentTab]} config={config}></Header>
      {
        showForm &&
        <FormPage {...{ onCancel }} />
      }
      {
        configState &&
        <main className="flex justify-center w-full mt-[70px] md:mt-[100px] ">
          <Routes>
            <Route path="/Home" element={<Home config={config} />} />
            <Route path="/Schedule" element={<Events config={config} />} />
            <Route path="/Map" element={<Map config={config} />} />
            <Route path="/Info" element={<Info config={config} />} />
            <Route path="/Events" element={<Events config={config} />} />
            <Route path="/artist" element={<Artists config={config} />} />
          </Routes>
        </main>
      }

      <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 w-full  p-4 max-w-[500px]  max-h-[70px] mb-[40px] rounded-full shadow-xl z-10 ">

        <Footer {...{ currentTab, onTabChange }} ></Footer>
      </div>
      <Toaster position="top-left" richColors />

    </div>

  );
};

export default App