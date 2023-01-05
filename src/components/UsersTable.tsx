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
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { db2 } from "../firebase";
import SearchIcon from '@mui/icons-material/Search';
import {  serverTimestamp } from "firebase/firestore";
import { useAuth } from '../context/authContext';
import e from "express";

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
  const{user,logout,login}:any=useAuth() //aca traemos el estado de usecontext
  const { db,deleteData, addPay, getDataPayments,handleClickOpenDelete,getDataPaymentsReal}:any = useOutletContext();
  const [checked, setChecked] = useState(true);
  const [busquedaPagos, setBusquedaPagos] = React.useState<string|null>("");
  const [open, setOpen] = React.useState(false);
  const [nan, setNan] = React.useState();

  const {dispatch}:any = useOutletContext();

   React.useEffect(() => {
    const methodNan = async () => {
      console.log("entre una vezz a metodo nan")
      const consultaxd=query(collection(db2, "Payments"),where("clienteid","==",nan));
      const querySnapshotxd = await getDocs(consultaxd);
    
       let helperxd:any[]=querySnapshotxd.docs.map((doc:any) => doc.data());
     
        let helper2=helperxd.length
        let list=[];
        for (let i = 0; i < helper2; i++) {
        
          list.push(helperxd[i].monto)
        }
        list.sort();
        let montoxd=list[0];
    
      }

  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  let now:string;
  now=new Date().toLocaleDateString();
  
 
  console.log(now,"fecha de hoy")
  if(filtro2==1){
    filtro2=now;
  }
  const up = async(id0:any)=>{
    let fromIndex = db.map((object:any) => object.id).indexOf(id0); //guarda la posicion actual
    let toIndex = fromIndex - 1; //guarda la posicion siguiente
    console.log(toIndex,"toIndex")
    
    let element = db.splice(fromIndex, 1)[0]; //guarda el elemento
    console.log(element,"element")
    db.splice(toIndex, 0, element); //inserta el elemento en la posicion siguiente
    dispatch({type:"ORGANIZAR",payload:db});
    
   }
   const down = async(id0:any)=>{
    
    let fromIndex = db.map((object:any) => object.id).indexOf(id0);
    console.log(fromIndex,"id y entre a down")
    let toIndex = fromIndex + 1; //guarda la posicion anterior
    console.log(toIndex,"toIndex")
    
    console.log(fromIndex,"fromIndex")
    let element = db.splice(fromIndex, 1)[0]; //guarda el elemento
    console.log(element,"element")
    db.splice(toIndex, 0, element); //inserta el elemento en la posicion siguiente
    dispatch({type:"ORGANIZAR",payload:db});
   }

   const usuarioEnfilados = async () => {
    
    console.log(db,"soy la db ordenada dentro del metodo")
    db.map(async (obj:any)=>{
   
        await updateDoc(doc(db2, "Users",obj.id),{ 
          time:serverTimestamp(),
        }) 
      
  
    })}
  
    
      
  return (
    <>
        
         <Box sx={{display:'flex', justifyContent:'center', marginBottom:3,marginTop:3, textAlign:'center'}}>
    {/* <Button
                onClick={usuarioEnfilados}
                variant="contained"
                endIcon={< SearchIcon />}
                color="success"
               
              >
                Guardar
              </Button> */}
              </Box>
      <TableContainer sx={{ m: -0.1 }} component={Paper}>
        <Table sx={{ width:"100%" }} stickyHeader aria-label="sticky table">
          <TableHead>
         
            <TableRow>
            <StyledTableCell align="right">Info</StyledTableCell>
              <StyledTableCell align="right">Nombre</StyledTableCell>
              <StyledTableCell align="right">Apellido</StyledTableCell>
              <StyledTableCell align="right">Monto</StyledTableCell>
              
              {user.email=="jeancarlocj14@gmail.com" &&
              <StyledTableCell align="right"></StyledTableCell>
  }
              <StyledTableCell align="right" >Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
         

            
            { busqueda && filtro && filtro2==0&& //busqueda y filtro puestos
              db.filter((product:any) => (product.nombre.toLowerCase().includes(busqueda.toLowerCase()) || product.apellido.toLowerCase().includes(busqueda.toLowerCase()))&& (product.tipo==filtro && product.monto!=0)).map(((product:any) => (
               
                <StyledTableRow key={product.id}>
                <StyledTableCell align="right">
                <Link to={`/Admin/Information/${product.id}`}>
                  <HowToRegIcon
                
                   sx={{m:1}} 
                  />
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {product.nombre}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {product.apellido}
                </StyledTableCell>
              <StyledTableCell align="right">
                  
                  { product.monto }
                 
                </StyledTableCell>
             
                {user.email=="jeancarlocj14@gmail.com" &&
                <StyledTableCell align="right">
                <ArrowUpwardIcon
                  onClick={()=> up(product.id)}
                  />
                  
                  <ArrowDownwardIcon
                   onClick={()=> down(product.id)}
                  />
                   </StyledTableCell>
                    }
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
              { !busqueda && filtro &&  filtro2==0 && //no busqueda pero si filtro ACA
              db.filter((product:any) =>  (product.tipo==filtro && product.monto!=0)).map(((product:any) => (
                
              <StyledTableRow key={product.id}>
                  <StyledTableCell align="right">
                  <Link to={`/Admin/Information/${product.id}`}>
                    <HowToRegIcon
                  
                     sx={{m:1}} 
                    />
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.nombre}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {product.apellido}
                  </StyledTableCell>
                <StyledTableCell align="right">
                    {product.monto}
                  </StyledTableCell>
                  {user.email=="jeancarlocj14@gmail.com"  &&
                <StyledTableCell align="right">
                <ArrowUpwardIcon
                  onClick={()=> up(product.id)}
                  />
                  
                  <ArrowDownwardIcon
                   onClick={()=> down(product.id)}
                  />
                   </StyledTableCell>
                    }
                  
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
             
             { !busqueda&& filtro2 && // no busqueda y filtro2 1 puestos 
              db.filter((product:any) => (product.fecha==filtro2 )).map(((product:any) => (
                <StyledTableRow key={product.id}>
                <StyledTableCell align="right">
                <Link to={`/Admin/Information/${product.id}`}>
                  <HowToRegIcon
                
                   sx={{m:1}} 
                  />
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {product.nombre}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {product.apellido}
                </StyledTableCell>
              <StyledTableCell align="right">
                  {product.monto}
                </StyledTableCell>
          
                {user.email=="jeancarlocj14@gmail.com"  &&
                <StyledTableCell align="right">
                <ArrowUpwardIcon
                  onClick={()=> up(product.id)}
                  />
                  
                  <ArrowDownwardIcon
                   onClick={()=> down(product.id)}
                  />
                   </StyledTableCell>
                    }
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
                <Link to={`/Admin/Information/${product.id}`}>
                  <HowToRegIcon
                
                   sx={{m:1}} 
                  />
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {product.nombre}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {product.apellido}
                </StyledTableCell>
              <StyledTableCell align="right">
                  {product.monto}
                </StyledTableCell>
                {user.email=="jeancarlocj14@gmail.com" &&
                <StyledTableCell align="right">
                 
                </StyledTableCell>
}
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