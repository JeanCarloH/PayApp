import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useOutletContext, useParams } from "react-router-dom";
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
import { Props11 } from "./types";
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import UserPaymentAppBar from "./UserPaymentAppBar";


const UserInformationTable: React.FC<Props11> = ()=> {
const { db,deleteData, addPay, getDataPayments,handleClickOpenDelete,getDataPaymentsReal}:any = useOutletContext();
const [checked, setChecked] = useState(true);
const [busquedaPagos, setBusquedaPagos] = React.useState<string|null>("");
const [open, setOpen] = React.useState(false);

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setChecked(event.target.checked);
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
  const { id }:any = useParams();
  const list:any[] = db.find((item:any) => item.id == id);
return (
  <>
 <UserPaymentAppBar/>
    <TableContainer sx={{ m: -0.1 }} component={Paper}>
      <Table sx={{ width:"100%" }} stickyHeader aria-label="sticky table">
        <TableHead>
       
          <TableRow>
         
            <StyledTableCell align="right">Nombre</StyledTableCell>
            <StyledTableCell align="right">Apellido</StyledTableCell>
            <StyledTableCell align="right">Celular</StyledTableCell>
            <StyledTableCell align="right">Direccion</StyledTableCell>
            <StyledTableCell align="center">Monto</StyledTableCell>
            <StyledTableCell align="center">Tipo abono</StyledTableCell>
            <StyledTableCell align="center">Abono</StyledTableCell>
            <StyledTableCell align="center" >Fecha</StyledTableCell>
            <StyledTableCell align="right">Total abonos</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          
       

          
          { db.length>0 &&
            db.filter((item:any) => item.id == id).map((product:any) => (
          
            
           <StyledTableRow key={product.id}>
               
             
                <StyledTableCell align="right">
                  {product.nombre}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {product.apellido}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {product.celular}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {product.direccion}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {product.monto}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {product.tipo==1 &&
                  'Diario'
                  }
                  {product.tipo==2 &&
                  'semanal'
                  }
                   {product.tipo==3 &&
                  'Quincenal'
                  }
                   {product.tipo==4 &&
                  'Mensual'
                  }
                </StyledTableCell>
                <StyledTableCell align="right">
                  {product.abono}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {product.fecha}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {product.totalabonos}
                </StyledTableCell>
   
                
              </StyledTableRow>
            
            ))}

</TableBody>
        </Table>
      </TableContainer>
      
    </>
  );
}
export default  UserInformationTable;