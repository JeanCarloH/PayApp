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
    //const { db,deleteData, addPay, getDataPayments}:any = useOutletContext();
    
  


  
  
    return (
      <>
     
        <TableContainer sx={{ m: 3 }} component={Paper}>
          <Table sx={{ width:"100%" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {tipo==1 &&
                 <StyledTableCell align="left">Total pagos del dia</StyledTableCell>
                }
                {
                 tipo==2 &&
                 <StyledTableCell align="left">Total pagos de la semana</StyledTableCell>
                }
                {
                 tipo==3 &&
                 <StyledTableCell align="left">Total pagos de la quincena</StyledTableCell>
                }
                {
                  tipo==4 && tipoMes==1 &&
                 <StyledTableCell align="left">Total pagos del mes de enero</StyledTableCell>
                }
                {
                  tipo==4 && tipoMes==2 &&
                 <StyledTableCell align="left">Total pagos del mes de febrero</StyledTableCell>
                }
                {
                  tipo==4 && tipoMes==3 &&
                 <StyledTableCell align="left">Total pagos del mes de marzo</StyledTableCell>
                }
                {
                  tipo==4 && tipoMes==4 &&
                 <StyledTableCell align="left">Total pagos del mes abril</StyledTableCell>
                }
                {
                  tipo==4 && tipoMes==5 &&
                 <StyledTableCell align="left">Total pagos del mes de mayo</StyledTableCell>
                }
                {
                  tipo==4 && tipoMes==6 &&
                 <StyledTableCell align="left">Total pagos del mes de junio</StyledTableCell>
                }
                {
                  tipo==4 && tipoMes==7 &&
                 <StyledTableCell align="left">Total pagos del mes de julio</StyledTableCell>
                }
                {
                  tipo==4 && tipoMes==8 &&
                 <StyledTableCell align="left">Total pagos del mes de agosto</StyledTableCell>
                }
                {
                  tipo==4 && tipoMes==9 &&
                 <StyledTableCell align="left">Total pagos del mes de septiembre</StyledTableCell>
                }
                {
                  tipo==4 && tipoMes==10 &&
                 <StyledTableCell align="left">Total pagos del mes de octubre</StyledTableCell>
                }
                {
                  tipo==4 && tipoMes==11 &&
                 <StyledTableCell align="left">Total pagos del mes de noviembre</StyledTableCell>
                }
                {
                  tipo==4 && tipoMes==12 &&
                 <StyledTableCell align="left">Total pagos del mes de diciembre</StyledTableCell>
                }

               </TableRow>
            </TableHead>
         
                
            
          </Table>
        </TableContainer>
      </>
    );
  }
  export default  UserStatisticsTable;