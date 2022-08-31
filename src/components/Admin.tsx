import React from 'react'
import { Outlet } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { doc, onSnapshot, collection, query, where,addDoc,updateDoc,setDoc,deleteDoc,getDocs} from "firebase/firestore";
import { db2 } from '../firebase';
import { TYPES } from "../actions/userActions"
import { ActionType } from "../components/types";
import {
    userInitialState,
    userReducer,
  } from "../reducers/userReducer";
  import { Props2 } from '../components/types';
const Admin: React.FC<Props2> = ({state,dispatch}) => {

  useEffect(() => {
    

       getProducts();
        
        
     
  }, [])
    //const [state, dispatch] = useReducer(userReducer, userInitialState);
    const { db }:any = state;
    const add = async (object:any) => {
        const hola = collection(db2, "Users");
        await addDoc(hola, object);
        console.log("nueva tarea guardada");
      };

    const getProducts = async () => {
        const querySnapshot = await getDocs(collection(db2, "Users"));
        if (querySnapshot.docs) {
            dispatch({ type: TYPES.CONSULTAR_PRODUCTO, payload:querySnapshot.docs });
            
            //setError(null);
          } else {
            dispatch({ type: TYPES.SIN_DATOS });
            //setError();
          }
      
      }
    //   const updateData = async(id,data) => {
    //     await updateDoc(doc(db2,'product',id),{
    //       cantidad:data.cantidad,
    //       categoria:data.categoria,
    //       descripcion:data.descripcion,
    //       imagen:data.imagen,
    //       imagenData:data.imagenData,
    //       nombre:data.nombre,
    //       precio:data.precio,
    //       celular:data.celular,
    //     })
    //     console.log(id)
        
    //   };

    //   const deleteData = async(id) => {
    //     const eliminar= await deleteDoc(doc(db2, 'product', id));
    //      let isDelete = window.confirm(
    //        `¿Estás seguro de eliminar el registro con el id '${id}'?`
    //      );
     
    //          if (eliminar) {
     
    //            dispatch({ type: TYPES.ELIMINAR_PRODUCTO, payload: id });
    //          } 
         
   //    };

  return (
    <>
    <Outlet context={{db, add, getProducts}} />
    </>
  )
}

export default Admin