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
import { GoogleAuthProvider } from "firebase/auth";
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';

var today = new Date();
 
var now = today.toLocaleDateString('en-GB');

const yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1)
const ayer=yesterday.toLocaleDateString('en-GB')

const antierxd = new Date(today)
antierxd.setDate(antierxd.getDate() - 2)

var antier =antierxd.toLocaleDateString('en-GB')



function formatoFecha(fecha:any, formato:any) {
  const map:any = {
      dd: fecha.getDate(),
      mm: fecha.getMonth() + 1,
      yy: fecha.getFullYear().toString().slice(-2),
      yyyy: fecha.getFullYear()
  }

  return formato.replace(/dd|mm|yy|yyyy/gi, (matched:any) => map[matched])
}

export const getToken2 = (setTokenFound:any,useremail:any) => {
  
  return getToken(messaging, {vapidKey: "BB1Xe-i3dVi7POm4swH7RAxAReADelXaYT2P_4qgy1Em01hzLrAstpbaSCt-46f14l7BuwshpgPVxFmf5jGF3ys"}).then((currentToken) => {
    if (currentToken) {
      //console.log('current token for client: ', currentToken);
      setTokenFound(true);
      
      addToken(currentToken,useremail)
    
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      //console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
   // console.log('An error occurred while retrieving token. ', err);
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
   const [isTokenFound, setTokenFound] = useState(false);
   const [busqueda, setBusqueda] = useState("");
   const [filtro, setFiltro] = useState("1");
   const [open, setOpen] = React.useState(false);
   const [validador2 , setValidador2] = useState(false);
  const clave:any= useRef();
  const {dispatch,dbmora,db,dbusersready,getDataUserReady,getData,agregadorTokens,getDataNote,getDataBase, getDataBaseDiarios}:any = useOutletContext();
  useEffect(()=>{
    
    getDataUserMora();
    getDataUserReady();
      loghome();
    

   
  },[])
  let contador=0;
  const loghome=async()=>{
   
    if(contador==0){
      await addDoc(collection(db2,"Loghome"),{ //me toco empezar a agregar pagos para ver donde está el error.
        contador:contador+1,
      })
    }
  
  }
  getToken2(setTokenFound,user.email)
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  const validador = () => {
    if(clave.current.value==1565 && (user.email=="efren@gmail.com" || user.email=="jeancarlocj14@gmail.com")){
      getDataBaseDiarios();
      setValidador2(true);
    }
    if(clave.current.value==1234 && user.email=="alejandra@gmail.com" ){
      getDataBaseDiarios();
      setValidador2(true);
    }
    setOpen(false);

  }
 
 

  
  const getDataUserMora = async () => {
    //año-mes-dia
    var año=now.split("/")[2]
    var mes=now.split("/")[1]
    var dia=now.split("/")[0]
    let fecha= año+"-"+mes+"-"+dia

    var año2=antier.split("/")[2]
    var mes2=antier.split("/")[1]
    var dia2=antier.split("/")[0]
    let fecha2= año2+"-"+mes2+"-"+dia2
   //console.log(fecha,fecha2)
    let fechabien = new Date(fecha).getTime();
    let fechabien2 = new Date(fecha2).getTime();
    
     let fecha11 = fechabien+18000000+82800000;
     let fecha22 = fechabien2+18000000;

    let fechaReal1= fecha11.toString();
   let fechaReal2=fecha22.toString();
    
   
    const consulta2=query(collection(db2, "Users"),where("propietario","==",user.email),where("totalabonos",">",0),where("tipo","==","1"));
    const consulta=query(collection(db2, "Payments"),where("fecha2","<=",fechaReal1),where("fecha2",">=",fechaReal2)); //corone creo
   
    const querySnapshot = await getDocs(consulta);
    const querySnapshot2 = await getDocs(consulta2);
   // console.log(querySnapshot.docs,"querySnapshot")
    //console.log(querySnapshot2.docs,"querySnapshot2")
  
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
    const handleClose = () => {
 
      setOpen(false);
    };
 
      return( 
    <>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>usa la clave para consultar</DialogTitle>
        
        <Box
      sx={{
        textAlign: 'center',
         height:50,
       
         
      }}
    >
        <input
          //  autoFocus={true}
            name='cantidad'
            id="name"
            type='number'
            ref={clave}
           
          />
          </Box>
          <Box sx={{textAlign:"center"}}>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={validador}>Aceptar</Button>
          </Box>
         
        
      </Dialog>


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
          {bull} La cantidad de clientes faltantes por cobrar son: {dbusersready.length}
        </Typography>
      </CardContent>
   </Card>
   <Box sx={{display:'flex', justifyContent:'center', marginBottom:2}}>
    <Button
                onClick={() =>setOpen(true)}
                variant="contained"
                endIcon={< SearchIcon />}
                color="success"
               
              >
                consultar clientes diarios
              </Button>
              </Box>
           
   </Grid>
   {   validador2==true&&
   <Card sx={{  m:1 }}>
    <CardContent>
      <Typography variant="h5" component="div">
        {bull} La cantidad de clientes diarios es: {db.length}
      </Typography>
    </CardContent>
 </Card>}
    </>
    );
   
}
export default Home;
