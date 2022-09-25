import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    FormControl,
    Grid,
    InputLabel,
    Select,
    styled,
  } from "@mui/material";
import UserNoteAppBar from './UserNoteAppBar';
import NoteTable from './NoteTable'
import { Link } from "react-router-dom";
import { useOutletContext } from 'react-router-dom';
import { WindowSharp } from '@mui/icons-material';


export default function UserNote() {
    const {dbnote, getDataNote,agregadorTokens}:any = useOutletContext();
    React.useEffect(() => {
        getDataNote();
       // agregadorTokens();
    }
    , [1000])
 
 


  return (
    <>
   <UserNoteAppBar/>
   <Grid sx={{textAlign:"center"}}>
   <Link to="/Admin/AddUserNote">
   <Button variant="contained" color="success"  >
   Agregar Nueva Nota
    </Button>
    </Link>
   </Grid>
   <NoteTable/>

   
        </>
  );
}