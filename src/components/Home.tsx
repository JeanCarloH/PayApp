import React from "react";
import HomeTable from "./HomeTable";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { db2 } from '../firebase';
import { TYPES } from "../actions/userActions"
import { doc, onSnapshot, collection, query, where,addDoc,updateDoc,setDoc,deleteDoc,getDocs,getDoc} from "firebase/firestore";
import { useEffect,useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { FenceSharp } from "@mui/icons-material";

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
  const {dispatch,dbmora}:any = useOutletContext();
  useEffect(()=>{
    getDataUserMora();
  },[])

  const getDataUserMora = async () => {
    
   
    const consulta2=query(collection(db2, "Users"))
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
    </>
    );
   
}
export default Home;