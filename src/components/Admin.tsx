import React from 'react'
import { Outlet } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { doc, onSnapshot, collection, query, where,addDoc,updateDoc,setDoc,deleteDoc,getDocs,getDoc,documentId} from "firebase/firestore";
import { db2 } from '../firebase';
import { TYPES } from "../actions/userActions"
import { ActionType } from "../components/types";
import {
    userInitialState,
    userReducer,
  } from "../reducers/userReducer";
  import { Props2 } from '../components/types';
 import { useAuth } from '../context/authContext';
import { idText } from 'typescript';
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
import { FenceSharp } from '@mui/icons-material';

var today = new Date();
 
// obtener la fecha de hoy en formato `MM/DD/YYYY`
var now = today.toLocaleDateString('en-us');
//console.log(now);

const initialForm = {
  monto:0, 
  abono:0,
  fecha:now,
};

const Admin: React.FC<Props2> = ({state,dispatch}) => {
  
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [cantidad, setCantidad] = React.useState(0);
  const [recibidorId, setRecibidorId] = React.useState("");
  const [recibidorObjeto, setRecibidorObjeto] = React.useState("");
  


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDelete = (id:any) => {
    setRecibidorId(id);
    setOpenDelete(true);
  
  };
  const eliminar =()=>{
    deleteData(recibidorId);
  }

  const agregar =async()=>{
    console.log(recibidorId,"soy el id malo")
    const docRef = doc(db2, "Users",recibidorId);
    const docSnap = await getDoc(docRef);
    
   let resultado;
   let resultado2;
    if (docSnap.exists()) {
   
       resultado=docSnap.data().abono;
        resultado2=docSnap.data().monto;
        await addDoc(collection(db2,"Payments"),{
         abono:resultado,
         monto:resultado2-resultado,
         fecha:now,
         clienteid:recibidorId
        })
       
        

    } else {
    
      console.log("No such document!");
    }

    setOpen(false)
    
    setCantidad(resultado);
  }

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

 
  const{user,logout,login}:any=useAuth() //aca traemos el estado de usecontext
  const [form, setForm] = useState<UserRegistered2>(initialForm);
  
  // useEffect(() => {
 
  // }, [])
    const { db}:any = state;
    const {dbnote}:any =state;
    const {dbpayments}:any =state;
    
    
  //agregar usuario
    const addData = async (object:any,object2:any) => {
        const hola = await addDoc(collection(db2, "Users"), object);
        //setRecibidorObjeto(object2);
        // const id=hola.id
        // console.log(id,"soy el id");
      
        //console.log("nueva tarea guardada");
      };
      const addPayment = async (id:any,object:any) => {
        const hola2:any =  await setDoc(doc(db2, "Payments",id),object);
      }

      //agregar nota
      const addDataNote = async (object:any) => {
        const hola = collection(db2, "Notes");
        await addDoc(hola, object);
        console.log("nueva tarea guardada");
      };
      //agregar abono (consultar realmente. mejorar despues)
      const addPay = async (id:string) => {
        console.log(id,"soy el id bueno")
        setRecibidorId(id);
        
        const message="¿Quieres Abonar este valor?";
        const docRef = doc(db2, "Users",id);
        const docSnap = await getDoc(docRef);
        
       let resultado=0;
       let resultado2=0;
        if (docSnap.exists()) {
           resultado=docSnap.data().abono;
    
        } else {
        
          console.log("No such document!");
        }

        
        setOpen(true);
        setCantidad(resultado);
    

      };






      //obtener datos dependiendo de la busqueda
    const getData = async (busqueda:any) => {
      if(user){
        if(busqueda){
          const consulta=query(collection(db2, "Users"),where("propietario","==",user.email),where("nombre","==",busqueda));
          const querySnapshot = await getDocs(consulta);
    
          if (querySnapshot.docs) {
              dispatch({ type: TYPES.CONSULTAR_PRODUCTO, payload:querySnapshot.docs });
              
           
            } else {
              dispatch({ type: TYPES.SIN_DATOS });
            
            }
          
        return querySnapshot.docs
          }
        }if(busqueda==""){
          const consulta=query(collection(db2, "Users"),where("propietario","==",user.email))
          const querySnapshot = await getDocs(consulta);

   
          if (querySnapshot.docs) {
              dispatch({ type: TYPES.CONSULTAR_PRODUCTO, payload:querySnapshot.docs });
              
            
            } else {
              dispatch({ type: TYPES.SIN_DATOS });
             
            }
          
        return querySnapshot.docs
        }
        
      }
 
      //obtener los pagos de cada usuario
      const getDataPayments = async (id:any) => {
        setRecibidorId(id);
        if(user){
         
          const docRef = doc(db2, "Payments", id);
          const docSnap = await getDoc(docRef);
      
          // if (docSnap.exists()) {
          //     dispatch({ type: TYPES.CONSULTAR_PAGOS, payload:docSnap.data() });
              
          //     //setError(null);
          //   } else {
          //     dispatch({ type: TYPES.SIN_DATOS });
          //     //setError();
          //   }
     
        
        return docSnap
          
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
      //actualizar datos de usuario
       const updateData = async(id:any,data:any) => {
        await updateDoc(doc(db2,'Users',id),{
          tipo:data.tipo,
          monto:data.monto,
          direccion:data.direccion,
          nombre:data.nombre,
          apellido:data.apellido,
          celular:data.celular,
          alias:data.alias,
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
       //console.log(recibidorId);
        const eliminar= await deleteDoc(doc(db2, 'Users', recibidorId));
        setOpenDelete(false)
        
        
        //  let isDelete = window.confirm(
        //    `¿Estás seguro de eliminar el registro con el id '${id}'?`
        //  );
     };
     //eliminar nota del usuario
     const deleteDataNote = async(id:any) => {
      const eliminar= await deleteDoc(doc(db2, 'Notes', id));
       let isDelete = window.confirm(
         `¿Estás seguro de eliminar el registro con el id '${id}'?`
       );
   };
  

      
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>¿Deseas Abonar esta cantidad?</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Abono"
            type='number'
            fullWidth
            variant="standard"
            value={cantidad}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={agregar}>Aceptar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>¿Deseas eliminar este cliente?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancelar</Button>
          <Button onClick={eliminar}>Aceptar</Button>
        </DialogActions>
      </Dialog>
  
    <Outlet context={{db,dbnote,dbpayments,recibidorId,addPayment,addData, getData,updateData,deleteData,addPay,addDataNote,updateDataNote,deleteDataNote,getDataNote,handleClickOpenDelete,getDataPayments}} />
    </>
  )
}

export default Admin