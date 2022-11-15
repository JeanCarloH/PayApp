import * as React from "react";
import { createContext, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { usuario } from "./types";
import { color, rgbToHex } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { useOutletContext } from "react-router-dom";
import Customers from "./CustomersAppBar";
import CustomerHelper from "./CustomerHelper";
const Login: React.FC = () => {
  
  const [user, setUser] = useState<usuario>({
    email: "",
    password: "",
  });
  const [celular, setCelular] = useState<any>({
   Celular: "",
  });

  const { login }: any = useAuth();
  const [error, setError] = useState<String>("");
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      primary: {
        main: teal[900],
      },
      secondary: {
        main: teal[900],
      },
    },
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/Admin/Home");
    } catch (error: any) {
      setError(error.message);
    }
    if(user.email=="invitado@gmail.com"){
      navigate("/Admin/CustomerHelper");
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, [e.target.name]: e.target.value });


    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCelular({ ...celular, [e.target.name]: e.target.value });

    

  return (
    <>
      <Grid item xs={12} md={12} sx={{ textAlign: "center", color: teal[900] }}>
        <h2>Inicie Sesión en PayApp</h2>
        <img src="./PayApp_picture.png" height={200}></img>
      </Grid>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, textAlign: "center" },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid>
          <TextField
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            name="email"
            onChange={handleChange}
          />
        </Grid>

        <Grid>
          <TextField
            id="outlined-basic"
            type="password"
            label="Contraseña"
            name="password"
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>

        {/* <Grid>
          <TextField
            id="outlined-basic"
            label="Celular"
            variant="outlined"
            name="Celular"
            onChange={handleChange2}
          />
        </Grid> */}
        <ThemeProvider theme={theme}>
          <Grid >
            <Link to="/">
              <Typography  sx={{textDecoration: "none" , color:"white"}}>
              <Button variant="contained" onClick={handleSubmit}>
                Entrar
              </Button>
              
              </Typography>
            </Link>
          </Grid>
        </ThemeProvider>
      </Box>
        

    </>
  );
};

export default Login;
