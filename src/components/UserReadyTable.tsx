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
import { db2 } from '../firebase';
import { doc, onSnapshot, collection, query, where,addDoc,updateDoc,setDoc,deleteDoc,getDocs,getDoc} from "firebase/firestore";
import { ProductionQuantityLimits } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";
import PaidIcon from '@mui/icons-material/Paid';
import { Props7 } from "./types";

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
  
  
  const UserReadyTable = ()=> {

    var today = new Date();
 
    // obtener la fecha de hoy en formato `MM/DD/YYYY`
    var now = today.toLocaleDateString('en-US');
    const { dbusersready,getDataUserReady}:any = useOutletContext();


        console.log(dbusersready)
 
    return (
      <>
     
        <TableContainer sx={{ m:-0.05 }} component={Paper}>
          <Table sx={{ width:"100%" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                
                 <StyledTableCell align="left">Usuarios Faltantes hoy</StyledTableCell>
                 </TableRow>
                 </TableHead>
                 <TableBody>
             {dbusersready.length>0 &&
             
            dbusersready.map((row:any) => ( 
             
              
              <StyledTableRow key={row.id}>
                  <StyledTableCell align="left">
                  {row.nombre}
                  </StyledTableCell>
                  </StyledTableRow>
      )) }
              
            </TableBody>
  
            
          </Table>
        </TableContainer>
      </>
    );
  }
  export default  UserReadyTable;