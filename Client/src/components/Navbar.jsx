// client/src/components/Navbar.jsx
import { useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Mover useNavigate aquí

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirigir al usuario a la página de inicio
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
          EVENT MANAGER
        </Typography>
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/create-event">
              Crear Evento
            </Button>
            <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
              Hola, {user.username}!
              <Button color="inherit" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </Typography>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Iniciar Sesión
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Registrarse
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
