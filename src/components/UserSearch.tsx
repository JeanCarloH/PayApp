import React from 'react'
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
import AddIcon from '@mui/icons-material/Add';

const UserSearch = () => {
    const [busqueda, setBusqueda] = React.useState<string|null>("");
    const handlechange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setBusqueda(e.target.value)
      
      }
      const handleChange3 =()=>{
        setBusqueda(null);
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
         <UsersTable/>
    </>
  )
}

export default UserSearch