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
import {useState} from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function appBarLabel(label:any,label2:any) {
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

        <Tooltip title="Regresar">
          <Link to="/Admin/Home">
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
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(null);
  };

const pages = [
  {
    nombre: "Registrar usuario",
    url: "/Admin/UserRegister",
  },
  {
    nombre: "Buscar Usuario",
    url: "/Admin/UserSearch",
  },
  {
    nombre: "Agregar Nota",
    url: "/Admin/UserNote",
  },
  {
    nombre: "Usuarios Restantes",
    url: "/Admin/UserReady",
  },
  {
    nombre: "Dinero Cobrado",
    url: "/Admin/UserStatistics",
  },
];
  return (
    

      
    <ThemeProvider theme={greenTheme}>
      <Box sx={{ flexGrow: 1, display:{xs:"none", md:"flex"} }}>
        
        
             
        <AppBar position="sticky" color="primary" >
        {appBarLabel("PayApp","Clientes Pendientes")}
  
  
        </AppBar>
        
      
        </Box>

        <AppBar position="static" color="primary" >
      
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none"},mr:-0.5}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit" //nada
              href=""
            >
              <MenuIcon />
            </IconButton>

            <Menu 
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none"},
                 
              }}
            >
              {pages.map((page) => (
                <Link to={page.url} key={page.nombre}>
                  <MenuItem sx={{color:'#000000'}}>
                    <Typography textAlign="center">{page.nombre}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, marginTop:1.4 }} >
                PayApp
            </Typography>
            <Tooltip title="Regresar Inicio">
          <Link to="/Admin/Home">
            <IconButton sx={{flexGrow: 0, m: 1, color: grey[100]}}>
              <AssignmentReturnIcon/>
            </IconButton>
          </Link>
        </Tooltip>
          </Box>
       

       
      </AppBar>
    </ThemeProvider>
  );
}