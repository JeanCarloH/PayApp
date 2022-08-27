
import React from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './context/authContext';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
   <>
   <AuthProvider>
   <HashRouter>
    <Routes>
    <Route path="/"element={<Login/>} />
    <Route path="/Home"element={<Home/>} />
    </Routes>
   </HashRouter>
   </AuthProvider>
   </>
   
  );
}

export default App;
