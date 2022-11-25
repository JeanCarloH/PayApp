import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useOutletContext } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box } from "@mui/system";
import { IconButton, Tooltip,Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../context/authContext';
import { createTheme,ThemeProvider } from '@mui/material/styles';

import { doc, onSnapshot, collection, query, where,addDoc,updateDoc,setDoc,deleteDoc,getDocs,getDoc} from "firebase/firestore";
import { DataObjectSharp, ProductionQuantityLimits } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import Checkbox from '@mui/material/Checkbox';
import PaidIcon from '@mui/icons-material/Paid';
import { db2 } from '../firebase';
import { useEffect,useState } from "react";
import { useRef } from 'react';
import { Props8 } from "./types";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  

  
  //para eliminar un pago (recien agregado.. pendiente de probar)
  const UserPaymentTable: React.FC<Props8> = ({busquedaPagos})=> {
    const clave:any= useRef();
    const{user,logout,login}:any=useAuth()
    const {dispatch}:any = useOutletContext();
    const [id, setId] = React.useState("");
    const {dbpayments, recibidorId}:any = useOutletContext();
    const [open, setOpen] = React.useState(false);
 
    const handleClickOpen = (id:any) => {
      setId(id);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const deletePayment = async () => {
      console.log(recibidorId, id,"somos el recibidor id y el id del pago a eliminar");
      if(clave.current.value==1565 && (user.email=="efren@gmail.com" || user.email=="jeancarlocj14@gmail.com")){
        console.log(id,"si entre y soy el id")
        const docRef = doc(db2, "Payments",id);
        const docSnap = await getDoc(docRef);
        const docRef2 = doc(db2, "Users",recibidorId);
        const docSnap2 = await getDoc(docRef2);
        let resultado2;
         let resultado3;
        if (docSnap2.exists()) {
          resultado2=parseInt(docSnap2.data().monto);
          resultado3=docSnap2.data().totalabonos;
        }
        
       let resultado;
       
        if (docSnap.exists()) {
       console.log("entre al 1 mas importantes")
           resultado=docSnap.data().abono;
          
           await deleteDoc(doc(db2, "Payments", id));
          dispatch({type:"ELIMINAR_PAGO",payload:id});
    
        } else {
        
          console.log("No such document!");
        }
        setOpen(false)
        let montoxd=resultado2+resultado;
        await updateDoc(doc(db2, "Users",recibidorId),{ monto:montoxd.toString()})
        const consultaxd=query(collection(db2, "Payments"),where("clienteid","==",recibidorId));
        const querySnapshotxd = await getDocs(consultaxd);
        
        let contador=querySnapshotxd.docs.length;
        await updateDoc(doc(db2, "Users",recibidorId),{ totalabonos:contador}) 
      }
      else if(clave.current.value==1234 &&  user.email=="alejandra@gmail.com"){
        console.log(id,"si entre y soy el id")
        const docRef = doc(db2, "Payments",id);
        const docSnap = await getDoc(docRef);
        const docRef2 = doc(db2, "Users",recibidorId);
        const docSnap2 = await getDoc(docRef2);
        let resultado2;
         let resultado3;
        if (docSnap2.exists()) {
          resultado2=docSnap2.data().monto;
          resultado3=docSnap2.data().totalabonos;
        }
        
       let resultado;
       
        if (docSnap.exists()) {
       console.log("entre al 1 mas importantes")
           resultado=docSnap.data().abono;
          
           await deleteDoc(doc(db2, "Payments", id));
          dispatch({type:"ELIMINAR_PAGO",payload:id});
    
        } else {
        
          console.log("No such document!");
        }
        setOpen(false)
        await updateDoc(doc(db2, "Users",recibidorId),{ monto:resultado2+resultado })
        const consultaxd=query(collection(db2, "Payments"),where("clienteid","==",recibidorId));
        const querySnapshotxd = await getDocs(consultaxd);
        
        let contador=querySnapshotxd.docs.length;
        await updateDoc(doc(db2, "Users",recibidorId),{ totalabonos:contador}) 
      }
       setOpen(false)
    }
   

    return (
      <>
     
        <TableContainer sx={{ m: -0.1 }} component={Paper}>
          <Table sx={{ width:"100%" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Nombre</StyledTableCell>
                 <StyledTableCell align="left">Fecha</StyledTableCell>
                 <StyledTableCell align="left">abono</StyledTableCell>
                 <StyledTableCell align="left">Hora</StyledTableCell>
                 <StyledTableCell align="left">Monto</StyledTableCell>
                 <StyledTableCell align="center" >Acciones</StyledTableCell>
               </TableRow>
            </TableHead>
         
            <TableBody>
             {busquedaPagos &&
             
             dbpayments.filter((row:any) => (row.fecha.includes(busquedaPagos)) ).map(((row:any) => (
            
              
              <StyledTableRow key={row.id}>
                  <StyledTableCell align="left">
                  {row.nombre  +" "+ row.apellido}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                  {row.fecha}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                  {row.abono}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                  {row.hora}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                  {row.monto}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                  <DeleteIcon
                  sx={{m:1}}
                  onClick={() =>handleClickOpen(row.id)}
                  />
                   </StyledTableCell>

                  </StyledTableRow>
            )))}  
            {!busquedaPagos &&
             
             dbpayments.map((row:any) => ( 
             
               
               <StyledTableRow key={row.id}>
                   <StyledTableCell align="left">
                   {row.nombre +" "+ row.apellido}
                   </StyledTableCell>
                   <StyledTableCell align="left">
                   {row.fecha}
                   </StyledTableCell>
                   <StyledTableCell align="left">
                   {row.abono}
                   </StyledTableCell>
                   <StyledTableCell align="left">
                   {row.hora}
                   </StyledTableCell>
                   <StyledTableCell align="left">
                   {row.monto}
                   </StyledTableCell>
 
                   <StyledTableCell align="center">
                   <DeleteIcon
                   sx={{m:1}}
                   onClick={() =>handleClickOpen(row.id)}
                   />
                    </StyledTableCell>
 
                   </StyledTableRow>
             ))}  
  
     
              
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>¿Deseas eliminar este abono?</DialogTitle>
    
        <Box
        sx={{
       
          textAlign:"center",
         height:40,
       
         
      }}
    >
        <input
            //autoFocus={true}
            name='cantidad'
            id="name"
            type='number'
            ref={clave}
           
          />
          </Box>
        
          <Box sx={{textAlign:"Center"}}>
         
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={deletePayment}>Aceptar</Button>
          
          
        
          </Box>
       
      </Dialog>
      </>
    );
  }
  export default  UserPaymentTable;