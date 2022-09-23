import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

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
import {xd} from "./components/types";
//import { getToken2 } from "./firebase";
import { getToken2  } from "./components/Home";
import { onMessageListener } from "./firebase";
import Button from "@mui/material/Button";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getMessaging } from "firebase/messaging";
import { useAuth } from "./context/authContext";

function App() {
  const [show, setShow] = useState(false);
  const [isTokenFound, setTokenFound] = useState(false);
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useReducer(userReducer, userInitialState);
  const [notification, setNotification] = useState<xd>({title: '', body: ''});
  const{user,logout,login}:any=useAuth() 
  const useremail = user?.email;
    getToken2(setTokenFound,useremail);
 
    onMessageListener().then((payload:any)=> {
      //setShow(true);
      setOpen(true);
      setNotification({title: payload.notification.title, body: payload.notification.body})
      console.log(payload);
    }).catch(err => console.log('failed: ', err));

   
  
  

 

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <>
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            
            
           
            <Route
              path="/Admin"
              element={<Admin state={state} dispatch={dispatch} />}
            >
              <Route path="/Admin/UserRegister" element={<UserRegister edit={false}/>} />
              <Route path="/Admin/UserSearch" element={<UserSearch />} />
              <Route path="/Admin/UserNote" element={<UserNote />} />
              <Route path="/Admin/Payment" element={<UserPayment/>} />
              <Route path="/Admin/UserReady" element={<UserReady/>} />
              <Route path="/Admin/UserStatistics" element={<UserStatistics/>} />
              <Route path="/Admin/AddUserNote" element={<AddUserNote edit={false} />} />
              <Route path="/Admin/Home" element={<Home />} />
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
      <div>
      
      <Snackbar
        open={open}
        autoHideDuration={50000}
        onClose={handleClose}
        message={notification.title}
        action={action}
      />
    </div>

    </>
  );
}

export default App;
