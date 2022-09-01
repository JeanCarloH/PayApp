import React from 'react'
import { Outlet } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { doc, onSnapshot, collection, query, where,addDoc,updateDoc,setDoc,deleteDoc,getDocs,getDoc} from "firebase/firestore";
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
const Admin: React.FC<Props2> = ({state,dispatch}) => {
  var today = new Date();
 
  // obtener la fecha de hoy en formato `MM/DD/YYYY`
  var now = today.toLocaleDateString('en-us');
  //console.log(now);
 
  const{user,logout,login}:any=useAuth() //aca traemos el estado de usecontext
  useEffect(() => {


       getData();
        
     //   console.log(getProducts())
       
    
     
  }, [])
    //const [state, dispatch] = useReducer(userReducer, userInitialState);
    const { db }:any = state;
    const addData = async (object:any) => {
        const hola = collection(db2, "Users");
        await addDoc(hola, object);
        console.log("nueva tarea guardada");
      };
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

    const getData = async () => {
      const consulta=query(collection(db2, "Users"),where("propietario","==",user.email));
        const querySnapshot = await getDocs(consulta);
      //  const consulta=collection(db2, "Users");
      //  const q=query(consulta,where("propietario","==",user));
        if (querySnapshot.docs) {
            dispatch({ type: TYPES.CONSULTAR_PRODUCTO, payload:querySnapshot.docs });
            
            //setError(null);
          } else {
            dispatch({ type: TYPES.SIN_DATOS });
            //setError();
          }
      return querySnapshot.docs
      }
       const updateData = async(id:any,data:any) => {
        await updateDoc(doc(db2,'product',id),{
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

      const deleteData = async(id:any) => {
        const eliminar= await deleteDoc(doc(db2, 'Users', id));
         let isDelete = window.confirm(
           `¿Estás seguro de eliminar el registro con el id '${id}'?`
         );
     
   
         
      };
      
  

      
  return (
    <>
    
  
    <Outlet context={{db, addData, getData,updateData,deleteData,addPay}} />
    </>
  )
}

export default Admin