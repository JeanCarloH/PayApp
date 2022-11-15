import React, { useRef } from 'react'
import { useOutletContext } from 'react-router-dom';
import CustomersAppBar from './CustomersAppBar';
import { Box, Card, CardContent, Dialog, DialogTitle, SelectChangeEvent, Typography } from "@mui/material";
import CustomersTable from './CustomersTable';
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
  import SaveIcon from "@mui/icons-material/Save";
const CustomerHelper = () => {
    const value:any= useRef();
    const { getDataBaseUser}:any = useOutletContext();
  //PAGINA PRINCIPAL DEL USUARIO
  return (
  <>
   
  <CustomersAppBar/>
  <Box sx={{textAlign:"center"}}>
  {<h4>Ingresa tu numero de celular</h4>}
  </Box>
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
    
      
    </Box>
    <Box sx={{display:'flex', justifyContent:'center', marginBottom:2}}>
    <Button
                onClick={() =>getDataBaseUser(value.current.value)}
                variant="contained"
                endIcon={< SaveIcon />}
                color="success"
               
              >
                consultar
              </Button>
              </Box>
  <CustomersTable/>
  </>
  )
}

export default CustomerHelper