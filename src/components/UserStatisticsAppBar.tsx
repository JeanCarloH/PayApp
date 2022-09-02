import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { grey } from "@mui/material/colors";
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import { teal } from "@mui/material/colors";

function appBarLabel(label:string,label2:string) {
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} >
        {label}
      </Typography>
      <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }} textAlign="right">
        {label2}
      </Typography>

        <Tooltip title="Regresar Inicio">
          <Link to="/Home">
            <IconButton sx={{flexGrow: 0, m: 1, color: grey[100]}}>
              <AssignmentReturnIcon/>
            </IconButton>
          </Link>
        </Tooltip>
    </Toolbar>
  );
}

const greenTheme = createTheme({
  palette: {
    primary: {
      main: teal[900],
    },
    secondary: {
      main: '#000000',
    },
  },
});

export default function EnableColorOnDarkAppBar() {
  return (
    <ThemeProvider theme={greenTheme}>

        
        <AppBar position="static" color="primary" >
        {appBarLabel("PayApp","Estadisticas de usuario")}
        
       
      </AppBar>
    </ThemeProvider>
  );
}
