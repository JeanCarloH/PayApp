import React, { useRef } from 'react'
import UserStatisticsAppBar from './UserStatisticsAppBar'
import { Box, Card, CardContent, SelectChangeEvent, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from "@mui/icons-material/Save";
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

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


  const initialForm = {
    tipo:"",
    tipoMes:"",
  };

const UserStatistics = () => {
  var today = new Date();
 

  var now = today.toLocaleDateString('en-GB');
 
    const {dbuserstatistics,getUserStatistics,getDataNote,db,getDataBase}:any = useOutletContext();
    const [form, setForm] = useState<UserEstatistics>(initialForm);
    const value:any= useRef();
    const value2:any= useRef();

  
   
    useEffect(() => {
      getDataBase();
      getUserStatistics();
      getDataNote();
    }, []);
    const bull = (
      <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
      >
        •
      </Box>
    );
   
  return (
    <>  
    
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
    <Card sx={{  m:1 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {bull} La cantidad de clientes totales son: {db.length}
        </Typography>
      </CardContent>
   </Card>
    <UserStatisticsTable tipo={form.tipo} tipoMes={form.tipoMes}/>
    </>
  )
}

export default UserStatistics