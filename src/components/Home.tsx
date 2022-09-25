import React from "react";
import HomeTable from "./HomeTable";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { db2 } from '../firebase';
import { TYPES } from "../actions/userActions"
import { doc, onSnapshot, collection, query, where,addDoc,updateDoc,setDoc,deleteDoc,getDocs,getDoc} from "firebase/firestore";
import { useEffect,useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { FenceSharp } from "@mui/icons-material";
import { useAuth } from '../context/authContext';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebase";

var today = new Date();
 
var now = today.toLocaleDateString('en-GB');

const yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1)
const ayer=yesterday.toLocaleDateString('en-GB')

const antierxd = new Date(today)
antierxd.setDate(antierxd.getDate() - 2)

const antier =antierxd.toLocaleDateString('en-GB')
console.log(now,ayer,antier)
export const getToken2 = (setTokenFound:any,useremail:any) => {
  
  return getToken(messaging, {vapidKey: "BB1Xe-i3dVi7POm4swH7RAxAReADelXaYT2P_4qgy1Em01hzLrAstpbaSCt-46f14l7BuwshpgPVxFmf5jGF3ys"}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      
      addToken(currentToken,useremail)
    
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
 
}
const addToken = async (token:any,useremail:any) => {
  const hola = await setDoc(doc(db2, "tokens",token), {
    tokenUser:token,
    propietario:useremail,
    
  });
  
}

const Home =()=>{

 
  const{user,logout,login}:any=useAuth() 


  const {dispatch,dbmora,db,dbusersready,getDataUserReady,getData,agregadorTokens,getDataNote}:any = useOutletContext();
  useEffect(()=>{
    
    getDataUserMora();
    getDataUserReady();
    getData("");
    getDataNote();
  },[])

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  const getDataUserMora = async () => {
    
   
    const consulta2=query(collection(db2, "Users"),where("propietario","==",user.email),where("totalabonos",">",0));
    const consulta=query(collection(db2, "Payments"),where("fecha","<=",now),where("fecha",">=",antier)); //corone creo
   
    const querySnapshot = await getDocs(consulta);
    const querySnapshot2 = await getDocs(consulta2);
    console.log(querySnapshot.docs,"querySnapshot")
    console.log(querySnapshot2.docs,"querySnapshot2")
  
   const usuarioslistos= querySnapshot2.docs.filter(cliente => 
      querySnapshot.docs.find(pago => pago.data().clienteid==cliente.id)===undefined
    );
    
      if (querySnapshot.docs) {
        dispatch({ type: TYPES.CONSULTAR_USUARIOSMORA, payload:usuarioslistos });
        
     
      } else {
        dispatch({ type: TYPES.SIN_DATOS });
      
      }
      const imagen = 'public/payappreal.png'
  return querySnapshot.docs
     
    }
      return( 
    <>
    <ResponsiveAppBar/>

    <Box sx={{ display: { xs: "flex", md: "none" }, mr: 2}} >
           <img src={process.env.PUBLIC_URL +'payappreal.png'}  alt="payapp" width="100%" height="100%"/>
             </Box>
             <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2}} >
           <img src={process.env.PUBLIC_URL +'payapplogopc.png'}  alt="payapp" width="100%" height="100%"/>
             </Box>
    <HomeTable/>
   
    <Grid sx={{m:-0.1}}>

    <Card sx={{  m:1}}>
      <CardContent>
        <Typography variant="h5" component="div">
          {bull} La cantidad de clientes en mora es: {dbmora.length}
        </Typography>
      </CardContent>
   </Card>
   <Card sx={{  m:1 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {bull} La cantidad de clientes es: {db.length}
        </Typography>
      </CardContent>
   </Card>
   <Card sx={{  m:1 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {bull} La cantidad de clientes faltantes por cobrar son: {dbusersready.length}
        </Typography>
      </CardContent>
   </Card>
   </Grid>
    </>
    );
   
}
export default Home;
