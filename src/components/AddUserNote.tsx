
import React from 'react'
import { useState } from 'react';
import { NoteAdded } from './types';
import {Props5} from './types';
import { useOutletContext, useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from '@mui/material';
import { Link } from "react-router-dom";
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
  import UserNoteAppBar from './UserNoteAppBar';
  import { useAuth } from "../context/authContext";
  import { useEffect } from "react";
const initialForm = {
    titulo: "",
    recordatorio:"",
    fecha:"",
    propietario:"",

  };

const AddUserNote : React.FC<Props5>= ({edit}) => {
    const {user}:any = useAuth();
    const { id }:any = useParams();
    const {db, addDataNote, updateDataNote,dbnote}:any = useOutletContext();
    const [form, setForm] = useState<NoteAdded>(initialForm);
    useEffect(() => { if (edit) { const product = dbnote.find((item:any) => item.id == id); setForm(product); } }, []);
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
    const handleChange = (e: any ) => {
        e.preventDefault();
        setForm({
          ...form,
          [e.target.name]: e.target.value,
          ['propietario']: user.email,

        })};
        const handleReset = () => {
            setForm(initialForm);
          };
    
        const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (
                !form.titulo ||
                !form.recordatorio
    
              ) {
                alert("Datos incompletos.");
                return;
              } else {
                if(edit){
                    updateDataNote(id, form);
                    console.log("entre")
                } 
                else{
                    addDataNote(form)
                   
                }
              }
                handleReset();
              }

      
  return (
   <>
   <UserNoteAppBar/>
   <Grid container textAlign="center" sx={{ display: "inline-flex" }}>
        <Grid item xs={12} md={12}>
          <h2>Registre su Nota Acá</h2>
        </Grid>
        <Grid item xs={12} md={4} sx={{marginTop:1}}>
          <TextField
            name="titulo"
            onChange={handleChange}
            required
            label="Titulo de la nota"
            value={form.titulo}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{marginTop:1}}>
          <TextField
            name="recordatorio"
            onChange={handleChange}
            type="text"
            required
            label="Recordatorio"
            value={form.recordatorio}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{marginTop:1}}>
          <TextField
            name="fecha"
            onChange={handleChange}
            type="text"
            required
            label="fecha"
            value={form.fecha}
          />
        </Grid>
   
        <ThemeProvider theme={temaNuevo}>
          <Grid container textAlign="center">
          <Grid item xs={12} md={6} sx={{marginTop:1}} >
            <Link to="/Admin/UserNote">
              <Button variant="contained" color="secondary">
                regresar
              </Button>
            </Link>
          </Grid>

          <Grid item xs={12} md={6} sx={{marginTop:1}} >
            <Link to="/Admin/UserNote">
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
          </Grid>
        </ThemeProvider>
        </Grid>
   </>
  )
}

export default AddUserNote