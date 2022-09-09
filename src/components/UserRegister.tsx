import React, { ChangeEvent } from 'react'
import { SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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
import { UserRegistered } from './types';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useOutletContext, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import UserRegisteredAppBar from "./UserRegisteredAppBar";
import { Props3 } from './types';
import { useEffect } from 'react';

    // // crea un nuevo objeto `Date`
    // var today = new Date();
 

    // var now = today.toLocaleDateString('en-US');
    
  const initialForm = {
    nombre: "",
    apellido: "",
    celular:0,
    direccion:"",
    monto:0, 
    tipo:"", 
    abono:0,
    propietario:"",
    totalabonos:0,
  };


const UserRegister: React.FC<Props3> = ({edit}) => {

 
    const {db, addData, updateData,addPayment}:any = useOutletContext();
    const { user }: any = useAuth();
    const { id }:any = useParams();
    let ruta="";
   
    if(edit==false){
      ruta="/Admin/home";
    }else{
      ruta="/Admin/UserSearch";
    }

    useEffect(() => {
      if (edit) {
        const product = db.find((item:any) => item.id == id);
        setForm(product);
      }
    }, []);
    const temaNuevo = createTheme({
        palette: {
          primary: {
            main: "#1b5e20",
          },
          secondary: {
            main: "#b71c1c",
          },
        },
      });


    const [form, setForm] = useState<UserRegistered>(initialForm);
  
  

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>  ) => {
        e.preventDefault();
        setForm({
          ...form,
          [e.target.name]: e.target.value,
          ['propietario']: user.email,

        });
        // setForm2({
        //   ...form2,
        //   ['monto']: form.monto,
        //   ['abono']: form.abono,
         

        // });

      };


      const handleChange2 = (e: SelectChangeEvent<unknown>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
    const handleReset = () => {
        setForm(initialForm);
      };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
     
        if (
            !form.nombre ||
            !form.apellido ||
            !form.celular ||
            !form.monto ||
            !form.tipo ||
            !form.abono
          ) {
            alert("Datos incompletos.");
            return;
          } else {
            if(edit){
                updateData(id, form);
                console.log("entre")
            } 
            else{
                addData(form);
                //addPayment(form2)
                console.log("entre a registrar")
            }
          }
            handleReset();
          }
    

  return (
    <>
    <UserRegisteredAppBar />
     <Grid container textAlign="center" sx={{ display: "inline-flex" }}>
        <Grid item xs={12} md={12}>
          <h2>Registre su cliente acá</h2>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            name="nombre"
            onChange={handleChange}
            required
            label="Nombre"
            value={form.nombre}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            name="apellido"
            onChange={handleChange}
            required
            label="apellido"
            value={form.apellido}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            name="celular"
            onChange={handleChange}
            required
            type='number'
            label="Celular"
            value={form.celular}
          />
        </Grid>
        <Grid item xs={12} md={3} sx={{marginTop:1}}>
          <TextField
            name="direccion"
            onChange={handleChange}
            required
            label="direccion"
            value={form.direccion}
          />
        </Grid>
        <Grid item xs={12} md={3} sx={{marginTop:1}}>
          <TextField
            name="monto"
            onChange={handleChange}
            required
            type='number'
            label="monto"
            value={form.monto}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl sx={{ m: 1, minWidth: 210 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              tipo de prestamo
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={form.tipo}
              name="tipo"
              onChange={handleChange2}
              label="Categoria"
            >
              <MenuItem value="1">Diario</MenuItem>
              <MenuItem value="2">Semanal</MenuItem>
              <MenuItem value="3">Quincenal</MenuItem>
              <MenuItem value="4">Mensual</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3} sx={{marginTop:1}}>
          <TextField
            name="abono"
            onChange={handleChange}
            required
            type="number"
            label="abono"
            value={form.abono}
          />
        </Grid>
        <Grid item xs={12} md={12} sx={{marginTop:1}}>
          <TextField
            name="propietario"
            onChange={handleChange}
            required
            label="propietario"
            value={user.email}
          />
        </Grid>
        <ThemeProvider theme={temaNuevo}>
          <Grid item xs={12} md={6}>
            <Link to={ruta}>
              <Button variant="contained" color="secondary">
                regresar
              </Button>
            </Link>
          </Grid>

          <Grid item xs={12} md={6}>
            <Link to={ruta}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                endIcon={<SaveIcon />}
                color="primary"
              >
                guardar
              </Button>
            </Link>
          </Grid>
        </ThemeProvider>
        </Grid>
        </>
     
  );
 }
export default UserRegister