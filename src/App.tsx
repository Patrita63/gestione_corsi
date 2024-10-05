import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import ListTipoUtente from './Components/TipoUtente/listTipoUtente';
import EditTipoUtente from './Components/TipoUtente/editTipoUtente';
import ViewTipoUtente from './Components/TipoUtente/viewTipoUtente';
import DelTipoUtente from './Components/TipoUtente/delTipoutente';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/Components/TipoUtente/ListTipoUtente" element={<ListTipoUtente /> } />
        <Route path="/Components/TipoUtente/EditTipoUtente" element={<EditTipoUtente /> } />
        <Route path="/Components/TipoUtente/ViewTipoUtente" element={<ViewTipoUtente /> } />
        <Route path="/Components/TipoUtente/DeleteTipoUtente" element={<DelTipoUtente /> } />
        {/* <Route path="/Login" element={<Login /> } />
        <Route path="/Logout" element={<Logout /> } />
        <Route path="/Register" element={<Register /> } />
        <Route path="/InfoUtente" element={<InfoUtente /> } /> */}
      </Routes>
    </>
  ); 
}

export default App;
