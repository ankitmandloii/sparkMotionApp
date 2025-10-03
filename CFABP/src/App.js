import React, { useEffect, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router';
import { Toaster } from 'sonner';
import Artists from './pages/Artists';
import Home from './pages/Home';
import Map from './pages/Map';
import Schedule from './pages/Schedule';
import Footer from './components/Footer';
import Header from './components/Header';
import Info from "./pages/Info"

const App = () => {
  const [currentTab, setCurrentTab] = useState("home");
  const navigate = useNavigate();
  const [editUserInfo, setEditUserInfo] = useState(null)
  const [analyticsPage, setAnalyticsPage] = useState(false)
  const onTabChange = (tab) => {
    navigate(`/${tab.toLowerCase()}`)
    setCurrentTab(tab)
  }
  return (

    <div className="bg-black border min-h-screen  w-screen relative overflow-x-hidden">
      <Header></Header>
      <main className="flex justify-center w-full mt-[100px] ">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Schedule" element={<Schedule />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/Info" element={<Info />} />
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