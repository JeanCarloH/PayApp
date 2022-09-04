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

import { createTheme,ThemeProvider } from '@mui/material/styles';

import { doc, onSnapshot, collection, query, where,addDoc,updateDoc,setDoc,deleteDoc,getDocs,getDoc} from "firebase/firestore";
import { DataObjectSharp, ProductionQuantityLimits } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
  
  const temaNuevo = createTheme({
    palette: {
      primary: {
        main: '#1b5e20',
      },
      secondary: {
        main: '#b71c1c',
      },
    },
  }
  )
  
  
  const UserPaymentTable = ()=> {
    const { recibidorId}:any = useOutletContext();
    let db: any[]=[];
   
    
 //dbpayments.splice(0,14)
 const xd = async () => {
  
  const consulta=query(collection(db2, "Payments"),where("clienteid","==",recibidorId))
  const querySnapshot = await getDocs(consulta);
  
  // console.log(querySnapshot.docs.map((producto) =>  ({ id: producto.id, ...producto.data() })))
 
   return {
    ...db,
    db: [querySnapshot.docs]
   }
  }
console.log(db,"soy la db")
  useEffect(() => {
  
    xd();
  });

  
  
    return (
      <>
     
        <TableContainer sx={{ m: 3 }} component={Paper}>
          <Table sx={{ width:"100%" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                 <StyledTableCell align="left">Fecha</StyledTableCell>
                 <StyledTableCell align="left">abono</StyledTableCell>
                 <StyledTableCell align="left">Monto</StyledTableCell>
               </TableRow>
            </TableHead>
         
            <TableBody>
             {db.length>0 &&
             
            db.map((row:any) => ( 
             
              
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
                  </StyledTableRow>
      )) }
              
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
  export default  UserPaymentTable;