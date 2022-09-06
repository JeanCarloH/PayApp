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

import { createTheme,ThemeProvider } from '@mui/material/styles';

import { doc, onSnapshot, collection, query, where,addDoc,updateDoc,setDoc,deleteDoc,getDocs,getDoc} from "firebase/firestore";
import { DataObjectSharp, ProductionQuantityLimits } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import Checkbox from '@mui/material/Checkbox';
import PaidIcon from '@mui/icons-material/Paid';
import { db2 } from '../firebase';
import { useEffect,useState } from "react";


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
  const UserPaymentTable = ()=> {
    const {dbpayments, recibidorId}:any = useOutletContext();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const deletepayment = async () => {

      const docRef = doc(db2, "Payments",recibidorId);
      const docSnap = await getDoc(docRef);
      const docRef2 = doc(db2, "Users",recibidorId);
      const docSnap2 = await getDoc(docRef);
      let resultado2;
      if (docSnap2.exists()) {
        resultado2=docSnap2.data().monto;
      }
      
     let resultado;
     
      if (docSnap.exists()) {
     
         resultado=docSnap.data().abono;
        
         await deleteDoc(doc(db2, "payments", recibidorId));
          
  
      } else {
      
        console.log("No such document!");
      }
      
      await updateDoc(doc(db2, "Users",recibidorId),{ monto:resultado2+resultado, })
    }
   

    return (
      <>
     
        <TableContainer sx={{ m: 3 }} component={Paper}>
          <Table sx={{ width:"100%" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                 <StyledTableCell align="left">Fecha</StyledTableCell>
                 <StyledTableCell align="left">abono</StyledTableCell>
                 <StyledTableCell align="left">Monto</StyledTableCell>
                 <StyledTableCell align="center" >Acciones</StyledTableCell>
               </TableRow>
            </TableHead>
         
            <TableBody>
             {dbpayments.length>0 &&
             
            dbpayments.map((row:any) => ( 
             
              
              <StyledTableRow key={row.id}>
                  <StyledTableCell align="left">
                  {row.fecha}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                  {row.abono}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                  {row.monto}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                  <DeleteIcon
                  sx={{m:1}}
                  //onClick={() =>handleClickOpenDelete(product.id)}
                  />
                   </StyledTableCell>

                  </StyledTableRow>
            ))}  

     
              
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>¿Deseas eliminar este cliente?</DialogTitle>
        <DialogActions>
          <Button >Cancelar</Button>
          <Button >Aceptar</Button>
        </DialogActions>
      </Dialog>
      </>
    );
  }
  export default  UserPaymentTable;