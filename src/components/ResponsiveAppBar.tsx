import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
//import MainFeaturedPost from "./MainFeaturedPost";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from "../context/authContext";
import PostAddIcon from '@mui/icons-material/PostAdd';
import { teal } from "@mui/material/colors";
import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  styled,
} from "@mui/material";


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
    url: "/AgregarNota",
  },
  {
    nombre: "Usuarios Restantes",
    url: "/UsuariosListos",
  },
  {
    nombre: "Dinero Cobrado",
    url: "/DineroCobrado",
  },
];

// const mainFeaturedPost = {
//   title: "Jean Carlo Herrera Delgado",
//   description: "A continuación se podrán ver diferentes cosas personales 🤠.",
//   image: "./assets/img/Bienvenidos.png",
//   imageText: "main image description",
//   linkText: "Continue reading…",
// };

const post={
  image:"logo/Bienvenidos.png",
  imagetext:"bienvenida",

}





const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const{user,logout}:any=useAuth() //aca traemos el estado de usecontext
  


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(null);
  };
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

  return (
    <>

    <ThemeProvider theme={greenTheme}>
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AttachMoneyIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link to="/Home">
          <Typography
            variant="h6"
            noWrap
            
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            PayApp
          </Typography>
          </Link>
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
          </Box>

          <AttachMoneyIcon sx={{ display: { xs: "flex", md: "none" }, mr: -0.1}} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            PayApp
          </Typography> 
          
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex"  } }}>
            {pages.map((page) => (
              <Link key={page.nombre} to={page.url} >
                <Button
                  key={page.nombre}
                  sx={{ my: 2, color:'#000000', display: "block"}}
                >
                  {page.nombre}
                </Button>
               </Link>
              
            ))}
          </Box>

          
          {user&&
          user.email=="sofia@gmail.com"&&
           <h4> Hola Sofia</h4>}
           <Box sx={{ display: { xs: "flex", md: "none" }, mr: -4 }} >
           {user&&
          user.email=="jeancarlocj14@gmail.com"&&
           <h4> Hola Jean Carlo</h4>}
             </Box>

             <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2}} >
           {user&&
          user.email=="jeancarlocj14@gmail.com"&&
           <h4> Hola Jean Carlo</h4>}
             </Box>

         


          <Box sx={{display: { xs: "flex", md: "flex" }, mr: -0.5 }}>
            {user&&
              <Tooltip title="Administrador">
              <Link to="/admin">
                <IconButton sx={{ p: 0, color: grey[50], m: 1 }}>
                  <SupervisorAccountIcon />
                </IconButton>
              </Link>
            </Tooltip>
            }
          
            
            
            {user?
              <Tooltip title="Cerrar Sesión">
                <Link to="/">
                  <IconButton sx={{ p: 0, color: grey[50], m: 1 }} onClick={logout}>
                  <LogoutIcon />
                    
                  </IconButton>
                </Link>
                </Tooltip>
                
                :
                <Tooltip title="Iniciar Sesión">
                <Link to="/login">
                  <IconButton sx={{ p: 0, color: grey[50], m: 1 }}>
                  <LoginIcon />
                  </IconButton>
                </Link>
              </Tooltip>
            
            }
           
          </Box>
        </Toolbar>
      </Container>
     
    </AppBar>
    </ThemeProvider>
    </>
  );
 
  
};

export default ResponsiveAppBar;
