import React, { useEffect } from 'react'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import UserSearchAppBar from './UserSearchAppBar';
import { useState } from 'react';
import { Box } from '@mui/system';
import UsersTable from './UsersTable';
import Loader from './Loader';
import Admin from './Admin';
import {
  userInitialState,
  userReducer,
} from "../reducers/userReducer";
import { useReducer } from "react";
import { Outlet } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const UserSearch = () => {
  const {user}:any = useAuth();
  const [state, dispatch] = useReducer(userReducer, userInitialState);
  const {getData,getDataName,getDataNote,getDataBase}:any = useOutletContext();
  const [filtro, setFiltro] = useState("1");
  const [filtro2, setFiltro2] = useState("0");
    const [busqueda, setBusqueda] = React.useState<string|null>("");
    const handlechange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setBusqueda(e.target.value)
      
      }
      const handleChange3 =()=>{
        setBusqueda("");
      }
      useEffect(()=>{
      getDataBase()
  
      } ,[])
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
     
      const handleChange2 = (e: any) => { //clientes diarios, semanales, quincenales, mensuales
        
            setFiltro(e.target.value);
       
    }
    const handleChange4 = (e: any) => { //clientes nuevos y terminados
        
      setFiltro2(e.target.value);
 
}

  return (
    <>
      
        <UserSearchAppBar/>
       <Search sx={{display: { xs: "none", md: "flex"  }}}>
       <SearchIconWrapper>
         <SearchIcon />
       </SearchIconWrapper>
       
       <StyledInputBase
         placeholder="Busca un cliente"
         inputProps={{ "aria-label": "search" }}
         onChange={handlechange}
         value={busqueda}
         autoFocus
       />
        

        {busqueda &&
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
         value={busqueda}
         autoFocus
        
       />
        

        {busqueda &&
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
         <Grid container textAlign="center" sx={{ display: "inline-flex" }}>
         <Grid item xs={12} md={6}>
          <FormControl sx={{ m: 1, minWidth: 210 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              filtro
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={filtro}
              name="filtro"
              onChange={handleChange2}
              label="filtro"
            >
              
              <MenuItem value="1">Diario</MenuItem>
              <MenuItem value="2">Semanal</MenuItem>
              <MenuItem value="3">Quincenal</MenuItem>
              <MenuItem value="4">Mensual</MenuItem>
             
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl sx={{ m: 1, minWidth: 210 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              filtro2
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={filtro2}
              name="filtro2"
              onChange={handleChange4}
              label="filtro2"
            >
              <MenuItem value="0">Ningun Filtro</MenuItem>
              <MenuItem value="1">Clientes Nuevos</MenuItem>
              <MenuItem value="2">Clientes terminados</MenuItem>
             
            </Select>
          </FormControl>
        </Grid>
        </Grid>
         {user&&
          <UsersTable busqueda={busqueda} filtro={filtro} filtro2={filtro2}/>
         }
        
        

      
    </>
  )
}

export default UserSearch