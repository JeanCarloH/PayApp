import React from 'react'
import UserPaymentAppBar from './UserPaymentAppBar'
import { useState } from "react";

import { Link, useOutletContext } from "react-router-dom";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled, alpha } from '@mui/material/styles';
import UserPaymentTable from './UserPaymentTable';
import {useEffect} from 'react';
import InputBase from '@mui/material/InputBase';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';



const UserPayment = () => {
  const { addPayment,dbpayments,getDataPayments,recibidorId}:any = useOutletContext();
  const [busquedaPagos, setBusquedaPagos] = React.useState<string|null>("");
  useEffect(()=>{
    getDataPayments(recibidorId,busquedaPagos);
  } ,[busquedaPagos])
  const handlechange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setBusquedaPagos(e.target.value)
  
  }
  const handleChange3 =()=>{
    setBusquedaPagos("");
  }
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(210,210,252,.3)",
    '&:hover': {
      backgroundColor: "rgba(0,0,0,.3)",
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '100%',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({  //para computador
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(3, 0, 3 , 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      paddingRight: `calc(1em + ${theme.spacing(130)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '100%',
        '&:focus': {
          width: '100%',
        },
      },
    },


  }));
  const StyledInputBase2 = styled(InputBase)(({ theme }) => ({  //para computador
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(3, 0, 3 , 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      paddingRight: `calc(1em + ${theme.spacing(20)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '100%',
        '&:focus': {
          width: '100%',
        },
      },
    },


  }));
  return (
    <>


    <UserPaymentAppBar/>
    <Search sx={{display: { xs: "none", md: "flex"  }}}>
       <SearchIconWrapper>
         <SearchIcon />
       </SearchIconWrapper>
       
       <StyledInputBase
         placeholder="Busca una pago"
         inputProps={{ "aria-label": "search" }}
         onChange={handlechange}
         value={busquedaPagos}
         autoFocus
       />
        

        {busquedaPagos &&
            <IconButton
            size="large"
            edge="start"
            color="inherit"
          //  aria-label="open drawer"
            sx={{ 
             textAlign:'center'
            }}
            onClick={handleChange3}

          >
            
            
            <CloseIcon 
            />
           
         
          </IconButton>
          

        }
         </Search>

        
       <Search sx={{display: { xs: "flex", md: "none"  }}}>
       <SearchIconWrapper>
         <SearchIcon />
       </SearchIconWrapper>
       
       <StyledInputBase2
         placeholder="Busca un cliente"
         inputProps={{ "aria-label": "search" }}
         onChange={handlechange}
         value={busquedaPagos}
        autoFocus
       />
        

        {busquedaPagos &&
            <IconButton
            size="large"
            edge="start"
            color="inherit"
          //  aria-label="open drawer"
            sx={{ 
             textAlign:'center'
            }}
            onClick={handleChange3}

          >
            
            
            <CloseIcon 
            />
           
         
          </IconButton>
          

        }
        </Search>
    <UserPaymentTable />
    </>
  )
}

export default UserPayment