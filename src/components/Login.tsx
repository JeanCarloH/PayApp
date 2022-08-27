
import * as React from 'react';
import { createContext, useContext} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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
import { useState, useEffect} from 'react';
import {  useLocation } from "react-router-dom"
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useNavigate } from 'react-router-dom';
import { usuario } from './types';







const Login: React.FC=() =>{

 
    const [user,setUser]=useState<usuario>({
      
        email:"",
        password:"",
    });

   const {login}:any=useAuth();
    const [error, setError] = useState<String>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/Home");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, [e.target.name]: e.target.value });
 
  
 
    return(
        <>
         <Grid item xs={12} md={12} sx={{textAlign:'center'}}>
         <h2>Inicie Sesión en PayApp</h2>

          </Grid>
     
            
           <Box
           component="form"
           sx={{
               '& > :not(style)': { m: 1 , textAlign:'center'},
           }}
           noValidate
           autoComplete="off"
           >
                {/* <Grid >
               <TextField id="outlined-basic" label="Nombre" variant="outlined" name='name'  onChange={ handleChange}/>
                </Grid> */}

               <Grid >
               <TextField id="outlined-basic" label="Nombre" variant="outlined" name='email'  onChange={ handleChange}/>
                </Grid>

                <Grid >
               <TextField id="outlined-basic" type="password" label="Contraseña" name='password' variant="outlined"  onChange={ handleChange} />
                </Grid>

               
                <Grid >
                <Link to="/">
                <Button variant="contained" color="success" onClick={ handleSubmit} >
                   Success
               </Button>
               </Link>
                </Grid>
                
            

           </Box> 
     
          
               
                </>

    );
}

export default Login;
