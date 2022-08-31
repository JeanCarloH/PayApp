
import React from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './context/authContext';
import Login from './components/Login';
import Home from './components/Home';
import Admin from './components/Admin';
import UserRegister from './components/UserRegister';
import UserSearch from './components/UserSearch';
import { userReducer, userInitialState } from "./reducers/userReducer";
import { useReducer, useState } from "react";


function App() {
 const [state, dispatch] = useReducer(userReducer, userInitialState);
  return (
   <>
   <AuthProvider>
   <HashRouter>
    <Routes>
    <Route  path="/"element={<Login/>} /> 
    <Route path="/Home"element={<Home/>} />
   
    <Route path="/Admin"element={<Admin state={state} dispatch={dispatch}/>} 
    >
   <Route path="/Admin/UserRegister"element={<UserRegister/>} 
   />
   <Route path="/Admin/UserSearch"element={<UserSearch/>} 
   />
   </Route>
    </Routes>
   </HashRouter>
   </AuthProvider>
   </>
   
  );
}

export default App;
