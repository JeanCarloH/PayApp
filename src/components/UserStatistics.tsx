import React, { useRef } from 'react'
import UserStatisticsAppBar from './UserStatisticsAppBar'
import { Box, Card, CardContent, Dialog, DialogTitle, SelectChangeEvent, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from "@mui/icons-material/Save";
import { useTheme } from '@mui/material';
import {
    Button,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    styled,
  } from "@mui/material";
  import { useState } from 'react';

  import {UserEstatistics} from './types'
import UserStatisticsTable from './UserStatisticsTable';
import { useOutletContext } from "react-router-dom";
import { useEffect } from 'react';
import { useAuth } from '../context/authContext';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


  const initialForm = {
    tipo:"",
    tipoMes:"",
  };

const UserStatistics = () => {
  var today = new Date();
 

  var now = today.toLocaleDateString('en-GB');
    const{user,logout,login}:any=useAuth()
    const {dbuserstatistics,getUserStatistics,getDataNote,db,getDataBase,getDataBaseDiarios}:any = useOutletContext();
    const [form, setForm] = useState<UserEstatistics>(initialForm);
    const value:any= useRef();
    const value2:any= useRef();
    const clave2:any= useRef();
    const [open, setOpen] = React.useState(false);
    const [validador2, setValidador2] = React.useState(false);
    const theme = useTheme();
  
   const validador = () => {
    if(clave2.current.value==1565 && (user.email=="efren@gmail.com" || user.email=="jeancarlocj14@gmail.com")){
      getDataBase();
      setValidador2(true);
    }
    if(clave2.current.value==9604 && user.email=="estiven@gmail.com" ){
      getDataBase();
      setValidador2(true);
    }
    setOpen(false);
   }
    useEffect(() => {
      
      getUserStatistics();
    
    }, []);
    const bull = (
      <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
      >
        •
      </Box>
    );
    
    const totalcobro= db.reduce((total:any,item:any)=>parseInt(item.monto)+total,0)
    const handleClose = () => {
      setOpen(false);
    }
   // const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <>  
        <Dialog open={open} onClose={handleClose} >
      
      <DialogTitle>Usa la clave para consultar</DialogTitle>
       
        <Box
    sx={{
     textAlign: 'center',
       height:50,
      size:"1000px",
       
    }}
  >
        <input
       //   autoFocus={true}
          name='cantidad'
          id="number"
          type='number'
          step="1000"
          ref={clave2}
         
        
          
        />
        </Box>
        

     <Box sx={{ textAlign:"center"}}>
      
        <Button onClick={handleClose}>Cancelar</Button>
     
        <Button onClick={validador}>Aceptar</Button>
      </Box>
      
    </Dialog>

    <UserStatisticsAppBar/>
    {<h4>Poner la fecha en el formato año-mes-dia</h4>}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'right',
        '& > :not(style)': { m: 1 },
        justifyContent:'center',
         height:50,
      }}
    >
      <input
     
        id="demo-helper-text-misaligned"
        
        ref={value}
      />
      <input
       
        id="demo-helper-text-misaligned"
        
        ref={value2}
      />
      
    </Box>
    <Box sx={{display:'flex', justifyContent:'center', marginBottom:2}}>
    <Button
                onClick={() =>getUserStatistics(value.current.value,value2.current.value)}
                variant="contained"
                endIcon={< SearchIcon />}
                color="success"
               
              >
                consultar
              </Button>
              </Box>
              <Box sx={{display:'flex', justifyContent:'center', marginBottom:2}}>
    <Button
                onClick={() =>setOpen(true)}
                variant="contained"
                endIcon={< SearchIcon />}
                color="success"
               
              >
                consultar clientes totales
              </Button>
              </Box>
    {validador2==true &&
      <Card sx={{  m:1 }}>
      <CardContent>
        <Typography variant="h5" component="div">
         
     
              {bull} La cantidad de clientes totales son: {db.length}
        </Typography>
      </CardContent>
   </Card>}

   {validador2==true &&
    <Card sx={{  m:1 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {bull} La cantidad total de dinero (CXC) es: {totalcobro}
        </Typography>
      </CardContent>
   </Card>}
   
    <UserStatisticsTable tipo={form.tipo} tipoMes={form.tipoMes}/>
    </>
  )
}

export default UserStatistics


