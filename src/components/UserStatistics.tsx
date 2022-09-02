import React from 'react'
import UserStatisticsAppBar from './UserStatisticsAppBar'
import { SelectChangeEvent } from "@mui/material";
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
  const initialForm = {
    tipo:"",
  };
const UserStatistics = () => {
    
    const [form, setForm] = useState<UserEstatistics>(initialForm);
    const handleChange = (e: SelectChangeEvent<unknown>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
  return (
    <>  
    <UserStatisticsAppBar/>
    <Grid item xs={12} md={3}>
          <FormControl sx={{ m: 1, minWidth: 210 }}>
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
    </>
  )
}

export default UserStatistics