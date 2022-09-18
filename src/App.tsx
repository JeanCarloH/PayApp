import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./App.css";
import Button from '@mui/material/Button';
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
import { getToken2 } from "./firebase";
import { onMessageListener } from "./firebase";
import { xd } from "./components/types";
function App() {
  // if ('serviceWorker' in navigator) {
  //   window.addEventListener('load', function() {
  //     navigator.serviceWorker.register('/sw.js').then(function(registration) {
  //       // Si es exitoso
  //       console.log('SW registrado correctamente');
  //     }, function(err) {
  //       // Si falla
  //       console.log('SW fallo', err);
  //     });
  //   });
  // }
  //const [openNotificacion, setOpenNotificacion] = React.useState(false);

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState<xd>({title: '', body: ''});

  const [isTokenFound, setTokenFound] = useState(false);
  getToken2(setTokenFound);

  const [state, dispatch] = useReducer(userReducer, userInitialState);

  onMessageListener().then((payload:any) => {
    setShow(true);
    setNotification({title: payload.notification.title, body: payload.notification.body})
    console.log(payload);
  }).catch(err => console.log('failed: ', err));
  const handleClose = () => {
    setShow(false);
   
  };
  return (
    <>
      <AuthProvider >
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
   {show ?(
         <Dialog open={show} onClose={handleClose}>
         <DialogTitle>{notification.title}</DialogTitle>
         <DialogContent>
         {notification.body}
         </DialogContent>
         <DialogActions>
           <Button onClick={handleClose}>Cancelar</Button>
        
           <Button onClick={handleClose}>Aceptar</Button>
         </DialogActions>
       </Dialog>
   ):(
      <></>
   )}


   
    </>
  );
}

export default App;
