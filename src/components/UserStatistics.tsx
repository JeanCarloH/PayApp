import React from 'react'
import UserStatisticsAppBar from './UserStatisticsAppBar'
import { SelectChangeEvent } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
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
  const initialForm = {
    tipo:"",
    tipoMes:"",
  };
const UserStatistics = () => {
    const {dbuserstatistics,getUserStatistics}:any = useOutletContext();
    const [form, setForm] = useState<UserEstatistics>(initialForm);
    useEffect(() => {

      getUserStatistics();
    }, []);
    const handleChange = (e: SelectChangeEvent<unknown>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
  return (
    <>  
    <UserStatisticsAppBar/>
    <Grid container textAlign="center" sx={{ display: "inline-flex" }}>
    <Grid item xs={12} md={4}>
          <FormControl sx={{ m: 1, minWidth: 210,marginTop:2 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              estadistica a consultar
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={form.tipo}
              name="tipo"
              onChange={handleChange}
              label="Categoria"
            >
              <MenuItem value="1">Diario</MenuItem>
              <MenuItem value="2">Semanal</MenuItem>
              <MenuItem value="3">Quincenal</MenuItem>
              <MenuItem value="4">Mensual</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {form.tipo==4 &&
        
        <Grid item xs={12} md={4}>
        <FormControl sx={{ m: 1, minWidth: 210, marginTop:2}}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Mes a consultar 
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={form.tipoMes}
            name="tipoMes"
            onChange={handleChange}
            label="Categoria"
          >
            <MenuItem value="1">Enero</MenuItem>
            <MenuItem value="2">Febrero</MenuItem>
            <MenuItem value="3">Marzo</MenuItem>
            <MenuItem value="4">Abril</MenuItem>
            <MenuItem value="5">Mayo</MenuItem>
            <MenuItem value="6">Junio</MenuItem>
            <MenuItem value="7">Julio</MenuItem>
            <MenuItem value="8">Agosto</MenuItem>
            <MenuItem value="9">Septiembre</MenuItem>
            <MenuItem value="10">Octubre</MenuItem>
            <MenuItem value="11">Noviembre</MenuItem>
            <MenuItem value="12">Diciembre</MenuItem>

          </Select>
        </FormControl>
      </Grid>
 }
     
    </Grid>
    <UserStatisticsTable tipo={form.tipo} tipoMes={form.tipoMes}/>
    </>
  )
}

export default UserStatistics