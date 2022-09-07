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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// or for Luxon
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
// or for Moment.js
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
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
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
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
    <Button
                onClick={() =>getUserStatistics(value.current.value,value2.current.value)}
               // onClick={() => xd()}
                variant="contained"
                endIcon={<SaveIcon />}
                color="primary"
              >
                consultar
              </Button>
    <UserStatisticsTable tipo={form.tipo} tipoMes={form.tipoMes}/>
    </>
  )
}

export default UserStatistics