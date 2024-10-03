import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home /> } />
        {/* <Route path="/Login" element={<Login /> } />
        <Route path="/Logout" element={<Logout /> } />
        <Route path="/Register" element={<Register /> } />
        <Route path="/InfoUtente" element={<InfoUtente /> } /> */}
      </Routes>
    </>
  ); 
}

export default App;
