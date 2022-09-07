import React , { ChangeEvent } from 'react'
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
import { Analytics, ConstructionOutlined, FenceSharp } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { useRef } from 'react';
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
  //const [cantidad, setCantidad] = React.useState(0);
  const [recibidorId, setRecibidorId] = React.useState("");
  const [recibidorObjeto, setRecibidorObjeto] = React.useState("");
  const inputref:any= useRef();
  
  useEffect(() => {
    getDataUserReady();
  
  }, []);

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
    deleteDataPayment(recibidorId);
  }


  const agregar =async()=>{
    const fecha2 = Date.now();
   console.log(inputref.current.value,"soy la cantidad")
    
    const docRef = doc(db2, "Users",recibidorId);
    const docSnap = await getDoc(docRef);
    
   let resultado;
   let resultado2;
    if (docSnap.exists()) {
   
       resultado=docSnap.data().abono;
        resultado2=docSnap.data().monto;
        await addDoc(collection(db2,"Payments"),{
         abono:parseInt(inputref.current.value),
         monto:resultado2-parseInt(inputref.current.value),
         fecha:now,
         fecha2:fecha2, //fecha en epoch
         clienteid:recibidorId,
         nombre:docSnap.data().nombre
        })
       
        

    } else {
    
      console.log("No such document!");
    }

    setOpen(false)
    
    // setCantidad(resultado);
    await updateDoc(doc(db2, "Users",recibidorId),{ monto:resultado2-parseInt(inputref.current.value), })
    const consulta=query(collection(db2, "Users"),where("propietario","==",user.email));
    const querySnapshot = await getDocs(consulta);
              if (querySnapshot.docs) {
              dispatch({ type: TYPES.CONSULTAR_PRODUCTO, payload:querySnapshot.docs });
              
           
            } else {
              dispatch({ type: TYPES.SIN_DATOS });
            
            }
          
        return querySnapshot.docs
  }

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };


 
  const{user,logout,login}:any=useAuth() //aca traemos el estado de usecontext
  //const [form, setForm] = useState<UserRegistered2>(initialForm);
  
  // useEffect(() => {
 
  // }, [])
    const { db}:any = state;
    const {dbnote}:any =state;
    const {dbpayments}:any =state;
    const {dbusersready}:any =state;
    const {dbstatistics}:any =state;
    const {dbmora}:any =state;

    const getDataUserReady = async () => {
    
   
      const consulta2=query(collection(db2, "Users")) //me trae6 
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
     
      };
      //agregar abono (consultar realmente. mejorar despues)
      const addPay = async (id:string) => {
     
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
       // setCantidad(resultado);
    

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
          const ref=collection(db2, "Payments")
          const consulta=query(ref,where("clienteid","==",id),orderBy("fecha"))
          const querySnapshot = await getDocs(consulta);
      
           console.log(querySnapshot.docs,"hola")
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

        // const getUserStatistics= async (value:any,value2:any) => {
        // console.log(value,value2,"somos las dos fechas")
        //   if(user){
        //      if(value && value2){
        //       const consulta=query(collection(db2, "Payments"),where("fecha",">=",value));
        //       const querySnapshot = await getDocs(consulta);
        //       const consulta2=query(collection(db2, "Payments"),where("fecha","<=",value2));
        //       const querySnapshot2 = await getDocs(consulta2);
        //       console.log(querySnapshot.docs,"rango mayor")
        //       console.log(querySnapshot2.docs,"rango menor")
        //        const pagoslistos= querySnapshot2.docs.filter(pago1 => 
        //          querySnapshot.docs.find(pago2=> pago1.id==pago2.id)===undefined
        //        );
        //       console.log(pagoslistos,"soy pagos listos")
        //       if (querySnapshot.docs) {
                
        //           dispatch({ type: TYPES.CONSULTAR_ESTADISTICAS, payload:pagoslistos });
                  
        //           //setError(null);
        //         } else {
        //           dispatch({ type: TYPES.SIN_DATOS });
        //           //setError();
        //         }
        //         return querySnapshot.docs
        //      }
             
        //       if(value){
        //         const consulta=query(collection(db2, "Payments"),where("fecha",">=",value));
        //         const querySnapshot = await getDocs(consulta);
        //         console.log(value)
        //         console.log( querySnapshot.docs)
        //         console.log(querySnapshot.docs.map((doc:any)=>(doc.data().fecha)))
                
        //         if (querySnapshot.docs) {
                
        //           dispatch({ type: TYPES.CONSULTAR_ESTADISTICAS, payload:querySnapshot.docs });
                  
        //           //setError(null);
        //         } else {
        //           dispatch({ type: TYPES.SIN_DATOS });
        //           //setError();
        //         }6/09/2022
        //         return querySnapshot.docs
        //      }
        //       }
           
              
        //     }
        
         const getUserStatistics= async (value:string,value2:string) => {
          "año-mes-dia"
          let fecha1 = new Date(value).getTime();
          let fecha2 = new Date(value2).getTime();
         let fecha11= fecha1.toString();
        let fecha22=fecha2.toString();
        var someDate = new Date("2022-09-06").getTime();
       
     console.log(someDate,"la que es")
              const consulta=query(collection(db2, "Payments"),where('fecha2','>=',fecha11),where('fecha2','<=',fecha22));
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
      
        const eliminar= await deleteDoc(doc(db2, 'Users', recibidorId));
        dispatch({ type: TYPES.ELIMINAR_USUARIO, payload: recibidorId });
        setOpenDelete(false)
        
   
     };
     
     const deleteDataPayment = async(recibidorId:any) => {
      //const eliminar= await deleteDoc(doc(db2, 'Payments'),where("clienteid","==",recibidorId));
     }
     //eliminar nota del usuario

  
   
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>¿Deseas Abonar esta cantidad?</DialogTitle>
        <DialogContent>
          <Grid>
          <input
            autoFocus={true}
            name='cantidad'
            id="name"
            type='number'
            ref={inputref}
           
          />
          </Grid>

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
  
    <Outlet context={{db,dbnote,dbpayments,dbusersready,dbstatistics,dbmora,recibidorId,getUserStatistics,getDataUserReady,addPayment,addData, getData,updateData,deleteData,addPay,addDataNote,updateDataNote,getDataNote,handleClickOpenDelete,getDataPayments,dispatch}} />
    </>
  )
}

export default Admin