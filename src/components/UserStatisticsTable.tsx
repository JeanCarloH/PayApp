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
import { useAuth } from '../context/authContext';
import { createTheme,ThemeProvider } from '@mui/material/styles';

import { doc, onSnapshot, collection, query, where,addDoc,updateDoc,setDoc,deleteDoc,getDocs} from "firebase/firestore";
import { ProductionQuantityLimits } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";
import PaidIcon from '@mui/icons-material/Paid';
import { Props6 } from "./types";

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
  
  
  const UserStatisticsTable: React.FC<Props6> = ({tipo, tipoMes})=> {
    var today = new Date();
 
    const{user,logout,login}:any=useAuth()
  var now = today.toLocaleDateString('en-GB');
    const { dbstatistics,dbpayments2}:any = useOutletContext();

   
    const total2=20000;
  const totalcobro= dbstatistics.reduce((total:any,item:any)=>parseInt(item.abono)+total,0)
  
    return ( 
      <>
     
        <TableContainer sx={{  m: -1 }} component={Paper}>
          <Table sx={{ width:"100%" }} aria-label="customized table">
            <TableHead>
              <TableRow>
               
                <StyledTableCell>Total cobro  </StyledTableCell>
   
                
                
               </TableRow>
            </TableHead>
         
            <TableBody>
            
             
              <StyledTableRow >
                  <StyledTableCell align="left">
                   
                   {dbstatistics.length>0 && user.email=="efren@gmail.com" ?
                   totalcobro-total2:
                   totalcobro
                   }
                     

                   
                 
                  </StyledTableCell>
                  </StyledTableRow>
         
              
            </TableBody>
            
          </Table>
        </TableContainer>

        <TableContainer sx={{  m: -1 }} component={Paper}>
          <Table sx={{ width:"100%" }} aria-label="customized table">
            <TableHead>
              <TableRow>
               
                <StyledTableCell>Lista Clientes  </StyledTableCell>
                <StyledTableCell>abono  </StyledTableCell>
                
                
               </TableRow>
            </TableHead>
         
            <TableBody>
            
                  
                  
                  {dbstatistics.length>0 &&
             
             dbstatistics.map((row:any) => (
            
              
              <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">
                  {row.nombre  +" "+ row.apellido}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                  {row.abono}
                  </StyledTableCell>
                    </StyledTableRow>

     ))}
          
            </TableBody>
            
          </Table>
        </TableContainer>
      </>
    );
  }
  export default  UserStatisticsTable;