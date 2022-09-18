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
var today = new Date();
 
var now = today.toLocaleDateString('en-GB');

const yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1)
const ayer=yesterday.toLocaleDateString('en-GB')

const antierxd = new Date(today)
antierxd.setDate(antierxd.getDate() - 2)

const antier =antierxd.toLocaleDateString('en-GB')
console.log(now,ayer,antier)
const Home =()=>{
  const{user,logout,login}:any=useAuth() 
  const {dispatch,dbmora,db,dbusersready,getDataUserReady,getData}:any = useOutletContext();
  useEffect(()=>{
    getDataUserMora();
    getDataUserReady();
    getData("");
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
    
  return querySnapshot.docs
     
    }
      return( 
    <>
    <ResponsiveAppBar/>

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