
import React , { ChangeEvent } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { Outlet } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { doc, onSnapshot, collection, query, where,addDoc,updateDoc,setDoc,deleteDoc,getDocs,getDoc,documentId,orderBy} from "firebase/firestore";
import { db2 } from '../firebase';
import { TYPES } from "../actions/userActions"
import { ActionType } from "../components/types";
import {
    userInitialState,
    userReducer,
  } from "../reducers/userReducer";

  import { Props2 } from '../components/types';
 import { useAuth } from '../context/authContext';
import { convertToObject, idText } from 'typescript';
import { useOutletContext } from 'react-router-dom';
import UsersTable from './UsersTable';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { UserRegistered2 } from './types';
import { Analytics, ConstructionOutlined, FenceSharp, Notifications } from '@mui/icons-material';
import { Box, Grid, useTheme } from '@mui/material';
import { useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import {getAuth} from "firebase/auth";
import { getMessaging } from 'firebase/messaging';
import { messaging } from 'firebase-admin';

import { getToken2 } from './Home';
var today = new Date();
 

var now = today.toLocaleDateString('en-GB');



const yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1)
const ayer=yesterday.toLocaleDateString('en-GB')

const antierxd = new Date(today)
antierxd.setDate(antierxd.getDate() - 2)

const antier =antierxd.toLocaleDateString('en-GB')
// const initialForm = {
//   abono:0,
// };



const Admin: React.FC<Props2> = ({state,dispatch}) => {
 
  const [open, setOpen] = React.useState(false);
  
  const [openDelete, setOpenDelete] = React.useState(false);
  const [cantidad, setCantidad] = React.useState(0);
  const [fechas, setFechas] = React.useState([]);
  const [cantidadBoolean, setCantidadBoolean] = React.useState(false);
  const [recibidorId, setRecibidorId] = React.useState("");
  const [recibidorObjeto, setRecibidorObjeto] = React.useState("");
  const [openNotificacion, setOpenNotificacion] = React.useState(false);
  const [titulo, setTitulo] = React.useState("");
  const [recordatorio, setRecordatorio] = React.useState("");
  let inputref:any= useRef();
  const clave:any= useRef();
  let fecha:any=[];
  const { db}:any = state;
  const {dbnote}:any =state;
  const {dbpayments}:any =state;
  const {dbusersready}:any =state;
  const {dbstatistics}:any =state;
  const {dbmora}:any =state;
  const {dbtokens}:any =state;
  const topic="notes";
  
  const{user,logout,login}:any=useAuth() //aca traemos el estado de usecontext
  React.useEffect(() => {
   
     
 }
, [])

// setInterval(() => {

//   muestraReloj();
//   mirador();
//   }, 1000);
  
  function muestraReloj():any {
    var fechaHora = new Date();
    var horas:any = fechaHora.getHours();
    var minutos:any = fechaHora.getMinutes();
    var segundos:any = fechaHora.getSeconds();
  
    if(horas < 10) { horas = '0' + horas; }
    if(minutos < 10) { minutos = '0' + minutos; }
    if(segundos < 10) { segundos = '0' + segundos; }
 
     let tiempo:string=horas + ':' + minutos + ':' + segundos;
     console.log(tiempo)
   return   tiempo;
  }
  

  

  const mirador = async() => {
  
    let titulo:any=dbnote.map((doc:any) => doc.titulo);
    let recordatorio=dbnote.map((doc:any) => doc.recordatorio);
    let fecha=dbnote.map((doc:any) => doc.fecha);
   console.log(titulo,recordatorio,fecha)
   
  for (let i = 0; i < dbnote.length; i++) {
    if(muestraReloj() == fecha[i]){
      agregadorTokens();
      setTitulo(titulo[i])
      setRecordatorio(recordatorio[i])
      setOpenNotificacion(true)
      notifications();

     
         }
         
        }
    
  }
  const agregadorTokens=async()=>{
    
    const consulta=query(collection(db2, "tokens"),where("propietario","==",user.email));
    const querySnapshot = await getDocs(consulta);
              if (querySnapshot.docs) {
              dispatch({ type: TYPES.CONSULTAR_TOKENS, payload:querySnapshot.docs });
              
           
            } else {
              dispatch({ type: TYPES.SIN_DATOS });
              
            }
            return querySnapshot.docs
  }
   
  const notifications = async () => {
    let token=dbtokens.map((doc:any) => doc.tokenUser);
    for (let i = 0; i < token.length; i++) {
     
      
    
  let _datos2 = {
    
    "to" : token[i],
     "collapse_key" : "type_a",
    // "direct_boot_ok" : true,
    "notification" : {
        "body" : `recordatorio: ${recordatorio}`,
        "title": `titulo: ${titulo}`
    }
    // "webpush":{
    //   "headers":{
    //     "image":"./PayApp_picture.png"
    //   },
    //   "fcm_options":{
    //     "link":"localhost:3000"
    //   }
   // },
    
    // "data" : {
    //     "body" : {recordatorio},
    //     "title": {titulo}
    // }
   
  
}
    await fetch('https://fcm.googleapis.com/fcm/send', {
      method: "POST",
      body: JSON.stringify(_datos2),
      headers: {"Content-Type": "application/json",
                "Authorization": "key=AAAAD9nn5Ng:APA91bFoD968PcLHMJy-PYmf09ILP9s8oygc2nudaYhqyoHYU0lUThvp02rnVCnoiUzpJDLSE4yS5QoFpxzo0sOfOQd-Y0EAkJ9k6QZXvIB24RTSa5VlryeOGb3zIfwNhsA-2JGQL0Sv"
    },
      
    }).then(response => response.json()) 
    .then(json => console.log(json));
  }
}
  


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpenNotificacion(false);
    setOpen(false);
  };

  const handleClickOpenDelete = (id:any) => {
    setRecibidorId(id);
    setOpenDelete(true);
  
  };
  const eliminar =()=>{
   // deleteData(recibidorId);
   deleteData2(recibidorId);
   
  }
 

  const agregar =async()=>{
    console.log(inputref.current.value,"soy el useref");
    if(inputref.current.value>0){
    const fecha2 = Date.now();
    const fecha22= fecha2.toString();
   
    
    const docRef = doc(db2, "Users",recibidorId);
    const docSnap = await getDoc(docRef);
    
   let resultado;
   let resultado2;
   let resultado3;
    if (docSnap.exists()) {
     
       resultado=docSnap.data().abono;
        resultado2=docSnap.data().monto;
        resultado3=docSnap.data().totalabonos;
        await addDoc(collection(db2,"Payments"),{
         abono:parseInt(inputref.current.value),
         monto:resultado2-parseInt(inputref.current.value),
         fecha:now,
         fecha2:fecha22, //fecha en epoch
         clienteid:recibidorId,
         nombre:docSnap.data().nombre,
         propietario:docSnap.data().propietario,
        })
       
        

    } else {
    
      console.log("No such document!");
    }

    setOpen(false)
    
    
   
    
    await updateDoc(doc(db2, "Users",recibidorId),{ monto:resultado2-parseInt(inputref.current.value), })
    await updateDoc(doc(db2, "Users",recibidorId),{ totalabonos:resultado3+1, })
    const consulta=query(collection(db2, "Users"),where("propietario","==",user.email));
    const querySnapshot = await getDocs(consulta);
              if (querySnapshot.docs) {
              dispatch({ type: TYPES.CONSULTAR_PRODUCTO, payload:querySnapshot.docs });
              
           
            } else {
              dispatch({ type: TYPES.SIN_DATOS });
            
            }
          
            return querySnapshot.docs
  }
  
}

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };


  

  const addPropietario = async () => {
    const docRef = doc(db2, "tokens",recibidorId);
    const docSnap = await getDoc(docRef);
  }

    const getDataUserReady = async () => {
    
   
      const consulta2=query(collection(db2, "Users"),where("propietario","==",user.email),where("tipo","==","1")) //me trae6 
      const consulta=query(collection(db2, "Payments"),where("fecha","==",now)); //me trae 5

      const querySnapshot = await getDocs(consulta);
    
      const querySnapshot2 = await getDocs(consulta2);

    
     const usuarioslistos= querySnapshot2.docs.filter(cliente => 
        querySnapshot.docs.find(pago => pago.data().clienteid==cliente.id)===undefined, //como de este usuario no encontre, entonces mando el nombre
       
      );
      
        if (querySnapshot.docs) {
          dispatch({ type: TYPES.CONSULTAR_USUARIOSLISTOS, payload:usuarioslistos });
          
       
        } else {
          dispatch({ type: TYPES.SIN_DATOS });
        
        }
      
    return querySnapshot.docs
       
      }
    
    
  //agregar usuario
    const addData = async (object:any,object2:any) => {
        const hola = await addDoc(collection(db2, "Users"), object);
 
      };
      const addPayment = async (id:any,object:any) => {
        const hola2:any =  await setDoc(doc(db2, "Payments",id),object);
      }

      //agregar nota
      const addDataNote = async (object:any) => {
        const hola = collection(db2, "Notes");
        await addDoc(hola, object);
   
          
       
        //console.log("entre a guardar la nota")
        
     
      };
      //agregar abono 
      const addPay = async (id:string) => {
      
        setRecibidorId(id);
        console.log(recibidorId,"soy el id del usestate")
        
        const message="¿Quieres Abonar este valor?";
        const docRef = doc(db2, "Users",id);
        const docSnap = await getDoc(docRef);
        
       let resultado=0;
       let resultado2=0;
        if (docSnap.exists()) {
         
          resultado=docSnap.data().abono;
          setCantidad(resultado)
        } else {
        
          console.log("No such document!");
        }

        
        setOpen(true);
       // setCantidad(resultado);
    

      };






      //obtener datos dependiendo de la busqueda
    const getData = async (busqueda:any,filtro:any) => {
      console.log(busqueda,filtro,"los datos que recibo")
      
      if(user){
        if(busqueda=="" && filtro==""){

          const consulta=query(collection(db2, "Users"),where("propietario","==",user.email));
          const querySnapshot = await getDocs(consulta);

          console.log("entre a filtrar")
          if (querySnapshot.docs) {
              dispatch({ type: TYPES.CONSULTAR_PRODUCTO, payload:querySnapshot.docs });
              
            
            } else {
              dispatch({ type: TYPES.SIN_DATOS });
             
            }
          
        return querySnapshot.docs
        }
        if(busqueda ){
          console.log("entre a buscar")
          const consulta=query(collection(db2, "Users"),where("propietario","==",user.email),where("nombre","==",busqueda));
          const querySnapshot = await getDocs(consulta);
    
          if (querySnapshot.docs) {
              dispatch({ type: TYPES.CONSULTAR_PRODUCTO, payload:querySnapshot.docs });
              
           
            } else {
              dispatch({ type: TYPES.SIN_DATOS });
            
            }
          
        return querySnapshot.docs
          }
        }if(busqueda=="" && filtro){

          const consulta=query(collection(db2, "Users"),where("propietario","==",user.email),where("tipo","==",filtro));
          const querySnapshot = await getDocs(consulta);

          console.log("entre a filtrar")
          if (querySnapshot.docs) {
              dispatch({ type: TYPES.CONSULTAR_PRODUCTO, payload:querySnapshot.docs });
              
            
            } else {
              dispatch({ type: TYPES.SIN_DATOS });
             
            }
          
        return querySnapshot.docs
        }
        if(busqueda && filtro){

          const consulta=query(collection(db2, "Users"),where("propietario","==",user.email),where("tipo","==",filtro),where("nombre","==",busqueda));
          const querySnapshot = await getDocs(consulta);

          console.log("entre a filtrar")
          if (querySnapshot.docs) {
              dispatch({ type: TYPES.CONSULTAR_PRODUCTO, payload:querySnapshot.docs });
              
            
            } else {
              dispatch({ type: TYPES.SIN_DATOS });
             
            }
          
        return querySnapshot.docs
        }
       
      }
        
      
 
      //obtener los pagos de cada usuario
      const getDataPayments = async (id:any,busquedaPagos:any) => {
        
        setRecibidorId(id);
        if(user){
          if(busquedaPagos){
            const ref=collection(db2, "Payments")
          const consulta=query(ref,where("clienteid","==",id),where("fecha","==",busquedaPagos));
          const querySnapshot = await getDocs(consulta);
      
           console.log(querySnapshot.docs,"hola")
            if (querySnapshot.docs) {
              dispatch({ type: TYPES.CONSULTAR_PAGOS, payload:querySnapshot.docs });
              
           
            } else {
              dispatch({ type: TYPES.SIN_DATOS });
            
            }
            return querySnapshot.docs
          }
        }if(busquedaPagos==""){
          const ref=collection(db2, "Payments")
          const consulta=query(ref,where("clienteid","==",id),orderBy("fecha"))
          const querySnapshot = await getDocs(consulta);
      
           
            if (querySnapshot.docs) {
              dispatch({ type: TYPES.CONSULTAR_PAGOS, payload:querySnapshot.docs });
              
           
            } else {
              dispatch({ type: TYPES.SIN_DATOS });
            
            }
          
        
        return querySnapshot.docs
      }
    }
  
      
      
      const getDataNote = async () => {
        if(user){
         
            const consulta=query(collection(db2, "Notes"),where("propietario","==",user.email));
            const querySnapshot = await getDocs(consulta);
      
            if (querySnapshot.docs) {
                dispatch({ type: TYPES.CONSULTAR_NOTAS, payload:querySnapshot.docs });
                
                //setError(null);
              } else {
                dispatch({ type: TYPES.SIN_DATOS });
                //setError();
              }
            
          return querySnapshot.docs
            
          }

        }

        
         const getUserStatistics= async (value:string,value2:string) => {
          "año-mes-dia"
          
          let fecha1 = new Date(value).getTime();
          let fecha2 = new Date(value2).getTime();
      
          let fecha11 = fecha1+18000000;
          let fecha22 = fecha2+18000000+82800000;
      
         let fechaReal1= fecha11.toString();
        let fechaReal2=fecha22.toString();
          console.log(fechaReal1,fechaReal2,"fechas a comprobar")
          if(value && value2){
            console.log("soy las dos fechas")
              const consulta=query(collection(db2, "Payments"),where("propietario","==",user.email),where('fecha2','>=',fechaReal1),where('fecha2','<=',fechaReal2));
              const querySnapshot = await getDocs(consulta);
            
              console.log(querySnapshot.docs.map((doc:any)=>(doc.data())),"soy la fecha")
              if (querySnapshot.docs) {
                
                  dispatch({ type: TYPES.CONSULTAR_ESTADISTICAS, payload:querySnapshot.docs});
                  
                  //setError(null);
                } else {
                  dispatch({ type: TYPES.SIN_DATOS });
                  //setError();
                }
                return querySnapshot.docs
              }if(value){
                console.log("soy una sola fecha")
                let probando= fecha1+18000000+82800000;
                let probando2=probando.toString();
                console.log(fechaReal1,"fecha colocada")
                console.log(probando,"soy la fecha probando")
                const consulta=query(collection(db2, "Payments"),where("propietario","==",user.email),where('fecha2','>=',fechaReal1),where('fecha2','<=',probando2));
                const querySnapshot = await getDocs(consulta);
              
                console.log(querySnapshot.docs.map((doc:any)=>(doc.data())),"soy la fecha")
                if (querySnapshot.docs) {
                  
                    dispatch({ type: TYPES.CONSULTAR_ESTADISTICAS, payload:querySnapshot.docs});
                    
                    //setError(null);
                  } else {
                    dispatch({ type: TYPES.SIN_DATOS });
                    //setError();
                  }
                  return querySnapshot.docs
              }
              
              }
          
      //actualizar datos de usuario
       const updateData = async(id:any,data:any) => {
        await updateDoc(doc(db2,'Users',id),{
          tipo:data.tipo,
          monto:data.monto,
          direccion:data.direccion,
          nombre:data.nombre,
          apellido:data.apellido,
          celular:data.celular,
          abono:data.abono,
          propietario:data.propietario,


        })
     };
           //actualizar notas de usuario
           const updateDataNote = async(id:any,data:any) => {
            await updateDoc(doc(db2,'Notes',id),{
              titulo:data.titulo,
              recordatorio:data.recordatorio,
    
            })
          
         };
         //eliminar usuario 
      const deleteData = async(recibidorId:any) => {
      if(clave.current.value==1234){
        const eliminar= await deleteDoc(doc(db2, 'Users', recibidorId));
        dispatch({ type: TYPES.ELIMINAR_USUARIO, payload: recibidorId });
        setOpenDelete(false)
      }
        setOpenDelete(false)
        
   
     };
     const deleteData2 = async(recibidorId:any) => {
      console.log("entree dd")
      if(clave.current.value==1234){
        let consulta= query(collection(db2,'Payments'),where('clienteid','==',recibidorId));
        let querySnapshot = await getDocs(consulta);
        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
    
        })
        const eliminar= await deleteDoc(doc(db2, 'Users', recibidorId));
        dispatch({ type: TYPES.ELIMINAR_USUARIO, payload: recibidorId }); 
        setOpenDelete(false)
      }
        setOpenDelete(false)
   
     };
     
    
      const theme = useTheme();
      const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
      
        <DialogTitle>¿Deseas Abonar esta cantidad?</DialogTitle>
         
          <Box
      sx={{
       textAlign: 'center',
         height:50,
        size:"1000px",
         
      }}
    >
          <input
         //   autoFocus={true}
            name='cantidad'
            id="number"
            type='number'
            step="1000"
            ref={inputref}
           
            defaultValue={cantidad}
            
          />
          </Box>
          

       <Box sx={{ textAlign:"center"}}>
        
          <Button onClick={handleClose}>Cancelar</Button>
       
          <Button onClick={agregar}>Aceptar</Button>
        </Box>
        
      </Dialog>

      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>¿Deseas eliminar este cliente?</DialogTitle>
        
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
          <Button onClick={handleCloseDelete}>Cancelar</Button>
          <Button onClick={eliminar}>Aceptar</Button>
          </Box>
         
        
      </Dialog>

      <Dialog open={openNotificacion} onClose={handleClose}>
      <DialogTitle>{titulo}</DialogTitle>
      <DialogContent>
       {recordatorio}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
     
        <Button onClick={handleClose}>Aceptar</Button>
      </DialogActions>
    </Dialog>
  
    <Outlet context={{db,dbnote,dbpayments,dbusersready,dbstatistics,dbmora,recibidorId,getUserStatistics,getDataUserReady,addPayment,addData, getData,updateData,deleteData,addPay,addDataNote,updateDataNote,getDataNote,handleClickOpenDelete,getDataPayments,dispatch}} />
    </>
  )
}

export default Admin