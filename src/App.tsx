import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { AuthProvider } from "./context/authContext";
import Login from "./components/Login";
import Home from "./components/Home";
import Admin from "./components/Admin";
import UserRegister from "./components/UserRegister";
import UserSearch from "./components/UserSearch";
import { userReducer, userInitialState } from "./reducers/userReducer";
import { useReducer, useState } from "react";
import UserNote from "./components/UserNote";
import AddUserNote from "./components/AddUserNote";
import UserPayment from "./components/UserPayment";
import UserReady from "./components/UserReady";
import UserStatistics from "./components/UserStatistics";
function App() {
  const [state, dispatch] = useReducer(userReducer, userInitialState);
  return (
    <>
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/UserReady" element={<UserReady/>} />
            <Route path="/UserStatistics" element={<UserStatistics/>} />
            
           
            <Route
              path="/Admin"
              element={<Admin state={state} dispatch={dispatch} />}
            >
              <Route path="/Admin/UserRegister" element={<UserRegister edit={false}/>} />
              <Route path="/Admin/UserSearch" element={<UserSearch />} />
              <Route path="/Admin/UserNote" element={<UserNote />} />
              <Route path="/Admin/Payment" element={<UserPayment/>} />
              <Route path="/Admin/AddUserNote" element={<AddUserNote edit={false} />} />
              <Route
                path="/Admin/EditUsernote/:id"
                element={<AddUserNote edit={true} />}
              />
              <Route
                path="/Admin/Edit/:id"
                element={<UserRegister edit={true} />}
              />
            </Route>
          </Routes>
        </HashRouter>
      </AuthProvider>
    </>
  );
}

export default App;
