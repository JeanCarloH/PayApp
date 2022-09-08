import React, { useRef } from 'react'
import UserStatisticsAppBar from './UserStatisticsAppBar'
import { Box, SelectChangeEvent } from "@mui/material";
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
 
    const {dbuserstatistics,getUserStatistics}:any = useOutletContext();
    const [form, setForm] = useState<UserEstatistics>(initialForm);
    const value:any= useRef();
    const value2:any= useRef();

  
   
    useEffect(() => {

      getUserStatistics();
    }, []);
 
   
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
    <UserStatisticsTable tipo={form.tipo} tipoMes={form.tipoMes}/>
    </>
  )
}

export default UserStatistics