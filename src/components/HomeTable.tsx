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
import { TYPES } from "../actions/userActions"

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
  const HomeTable = ()=> {
    const {dispatch,dbmora}:any = useOutletContext();
    const [id, setId] = React.useState("");
    const {dbpayments, recibidorId}:any = useOutletContext();
    const [open, setOpen] = React.useState(false);
 
   

    return (
      <>
     
        <TableContainer sx={{ m: -0.1 }} component={Paper}>
          <Table sx={{ width:"100%" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                 <StyledTableCell align="left">USUARIOS EN MORA</StyledTableCell>

               </TableRow>
            </TableHead>
         
            <TableBody>
             {dbmora.length>0 &&
             
            dbmora.map((row:any) => ( 
            
              
              <StyledTableRow key={row.id}>
                  <StyledTableCell align="left">
                  {row.nombre}
                  </StyledTableCell>



                  </StyledTableRow>
            ))}  

     
              
            </TableBody>
          </Table>
        </TableContainer>

      </>
    );
  }
  export default  HomeTable;