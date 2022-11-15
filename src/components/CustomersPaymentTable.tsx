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
import { Props10 } from "./types";

  

  
  //para eliminar un pago (recien agregado.. pendiente de probar)
  const CustomersPaymentTable: React.FC<Props10> = ({busquedaPagos})=> {
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
      console.log("entre a los pagos ")
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
 
      
 
                   </StyledTableRow>
             ))}  
  
         
              
            </TableBody>
          </Table>
        </TableContainer>

    
      </>
    );
  }
  export default  CustomersPaymentTable;