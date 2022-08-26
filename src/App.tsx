
import React from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './context/authContext';
import Login from './components/Login';

function App() {
  return (
   <>
   <AuthProvider>
   <HashRouter>
    <Routes>
    <Route path="/"element={<Login/>} />
    </Routes>
   </HashRouter>
   </AuthProvider>
   </>
   
  );
}

export default App;
