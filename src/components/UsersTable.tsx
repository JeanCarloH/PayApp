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
import { Props4 } from "./types";

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


const UsersTable: React.FC<Props4> = ({busqueda,filtro,filtro2})=> {
  const { db,deleteData, addPay, getDataPayments,handleClickOpenDelete,getDataPaymentsReal}:any = useOutletContext();
  const [checked, setChecked] = useState(true);
  const [busquedaPagos, setBusquedaPagos] = React.useState<string|null>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  let now:string;
  now=new Date().toLocaleDateString();
  
 
  console.log(now,"fecha de hoy")
  if(filtro2==1){
    filtro2=now;
  }
  

  return (
    <>
   
      <TableContainer sx={{ m: -0.1 }} component={Paper}>
        <Table sx={{ width:"100%" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">Nombre</StyledTableCell>
              <StyledTableCell align="right">Apellido</StyledTableCell>
              <StyledTableCell align="right">Celular</StyledTableCell>
              <StyledTableCell align="right">Direccion</StyledTableCell>
              <StyledTableCell align="center">Monto</StyledTableCell>
              <StyledTableCell align="center">Tipo de pago</StyledTableCell>
              <StyledTableCell align="center">Abono</StyledTableCell>
              <StyledTableCell align="center">Fecha Prestamo</StyledTableCell>
              <StyledTableCell align="center">Total abonos</StyledTableCell>
             <StyledTableCell align="center" >Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            

            
            { busqueda && filtro && filtro2==0&& //busqueda y filtro puestos
              db.filter((product:any) => (product.nombre.toLowerCase().includes(busqueda.toLowerCase()) || product.apellido.toLowerCase().includes(busqueda.toLowerCase()))&& (product.tipo==filtro && product.monto!=0)).map(((product:any) => (
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
                  <StyledTableCell align="center">
                    {product.totalabonos}
                  </StyledTableCell>
     
                  <StyledTableCell align="right">
                  <Link to="/Admin/Payment">
                    <PaidIcon
                    onClick={()=> getDataPaymentsReal(product.id,busquedaPagos)}
                     sx={{m:1}} 
                    />
                    </Link>
                    <AddIcon 
                     onClick={()=> addPay(product.id)}
                    sx={{m:1}} 
                    />
                  <ThemeProvider theme={temaNuevo}>
                    <Link to={`/Admin/Edit/${product.id}`}>
                   <EditIcon 
                    sx={{m:1}}
                    />
                    </Link>
                   <DeleteIcon
                    sx={{m:1}}
                    onClick={() =>handleClickOpenDelete(product.id)}
                    />
                       </ThemeProvider>
                  </StyledTableCell>
                </StyledTableRow>
              
             )) )}
              { !busqueda && filtro &&  filtro2==0 && //no busqueda pero si filtro
              db.filter((product:any) =>  (product.tipo==filtro && product.monto!=0)).map(((product:any) => (
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
                  <StyledTableCell align="center">
                    {product.totalabonos}
                  </StyledTableCell>
     
                  <StyledTableCell align="right">
                  <Link to="/Admin/Payment">
                    <PaidIcon
                    onClick={()=> getDataPaymentsReal(product.id,busquedaPagos)}
                     sx={{m:1}} 
                    />
                    </Link>
                    <AddIcon 
                     onClick={()=> addPay(product.id)}
                    sx={{m:1}} 
                    />
                  <ThemeProvider theme={temaNuevo}>
                    <Link to={`/Admin/Edit/${product.id}`}>
                   <EditIcon 
                    sx={{m:1}}
                    />
                    </Link>
                   <DeleteIcon
                    sx={{m:1}}
                    onClick={() =>handleClickOpenDelete(product.id)}
                    />
                       </ThemeProvider>
                  </StyledTableCell>
                </StyledTableRow>
              
             )) )}
             
             { !busqueda&& filtro2 && //busqueda y filtro2 puestos  (FILTRO 2)
              db.filter((product:any) => (product.fecha==filtro2 )).map(((product:any) => (
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
                  <StyledTableCell align="center">
                    {product.totalabonos}
                  </StyledTableCell>
     
                  <StyledTableCell align="right">
                  <Link to="/Admin/Payment">
                    <PaidIcon
                    onClick={()=> getDataPaymentsReal(product.id,busquedaPagos)}
                     sx={{m:1}} 
                    />
                    </Link>
                    <AddIcon 
                     onClick={()=> addPay(product.id)}
                    sx={{m:1}} 
                    />
                  <ThemeProvider theme={temaNuevo}>
                    <Link to={`/Admin/Edit/${product.id}`}>
                   <EditIcon 
                    sx={{m:1}}
                    />
                    </Link>
                   <DeleteIcon
                    sx={{m:1}}
                    onClick={() =>handleClickOpenDelete(product.id)}
                    />
                       </ThemeProvider>
                  </StyledTableCell>
                </StyledTableRow>
              
             )) )}
             { !busqueda&& filtro2==2 && //busqueda y filtro2 puestos  (FILTRO 2)
              db.filter((product:any) => (product.monto==0 )).map(((product:any) => (
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
                  <StyledTableCell align="center">
                    {product.totalabonos}
                  </StyledTableCell>
     
                  <StyledTableCell align="right">
                  <Link to="/Admin/Payment">
                    <PaidIcon
                    onClick={()=> getDataPaymentsReal(product.id,busquedaPagos)}
                     sx={{m:1}} 
                    />
                    </Link>
                    <AddIcon 
                     onClick={()=> addPay(product.id)}
                    sx={{m:1}} 
                    />
                  <ThemeProvider theme={temaNuevo}>
                    <Link to={`/Admin/Edit/${product.id}`}>
                   <EditIcon 
                    sx={{m:1}}
                    />
                    </Link>
                   <DeleteIcon
                    sx={{m:1}}
                    onClick={() =>handleClickOpenDelete(product.id)}
                    />
                       </ThemeProvider>
                  </StyledTableCell>
                </StyledTableRow>
              
             )) )}
            
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default  UsersTable;