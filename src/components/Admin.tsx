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
const Admin: React.FC<Props2> = ({state,dispatch}) => {
  
  
  var today = new Date();
 
  // obtener la fecha de hoy en formato `MM/DD/YYYY`
  var now = today.toLocaleDateString('en-us');
  //console.log(now);
 
  const{user,logout,login}:any=useAuth() //aca traemos el estado de usecontext
  
  // useEffect(() => {
 
  // }, [])
    const { db}:any = state;
    const {dbnote}:any =state;
    
  //agregar usuario
    const addData = async (object:any) => {
        const hola = collection(db2, "Users");
        await addDoc(hola, object);
        console.log("nueva tarea guardada");
      };
      //agregar nota
      const addDataNote = async (object:any) => {
        const hola = collection(db2, "Notes");
        await addDoc(hola, object);
        console.log("nueva tarea guardada");
      };
      //agregar abono
      const addPay = async (id:any) => {
        const message="¿Quieres Abonar este valor?";
        const docRef = doc(db2, "Users",id);
        const docSnap = await getDoc(docRef);
       let resultado="";
        if (docSnap.exists()) {
           resultado=docSnap.data().abono;
    
        } else {
        
          console.log("No such document!");
        }
      const  result = window.prompt(message, resultado);
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
      const s="";
      const getId = async () => {
        getData(s);

      }
      //obtener los pagos de cada usuario
      const getDataPayments = async (id:any) => {
       // const consulta=collection(db2, "Users").doc(id).collection(db2,'payments').doc('abono')
        const docRef = doc(db2, "Users",id,"payments","qU3Oi1cChA20DyAkdaMH");
        const docSnap = await getDoc(docRef);
       let resultado="";
        if (docSnap.exists()) {
           console.log(resultado=docSnap.data().abono,"soy yooo")
    
        } else {
        
          console.log("No such document!");
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
      const deleteData = async(id:any) => {
        const eliminar= await deleteDoc(doc(db2, 'Users', id));
         let isDelete = window.confirm(
           `¿Estás seguro de eliminar el registro con el id '${id}'?`
         );
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
    
  
    <Outlet context={{db,dbnote,addData, getData,updateData,deleteData,addPay,addDataNote,updateDataNote,deleteDataNote,getDataNote, getDataPayments}} />
    </>
  )
}

export default Admin