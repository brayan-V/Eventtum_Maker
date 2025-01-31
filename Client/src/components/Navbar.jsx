import { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

const Navbar = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate(); 
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setLogoutModalOpen(false); // Cierra la modal
        navigate("/"); 
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ flexGrow: 1, cursor: 'pointer' }} 
                    onClick={() => navigate("/")}
                >
                    Eventtum Maker
                </Typography>
                {isAuthenticated ? (
                    <>
                        <Button color="inherit" component={Link} to="/create-event">
                            Crear Evento
                        </Button>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="subtitle2" sx={{ fontSize: '0.875rem' }}>
                                Hola, {user.username}!
                            </Typography>
                            <Button color="inherit" onClick={() => setLogoutModalOpen(true)} sx={{ fontSize: '0.75rem' }}>
                                Cerrar Sesión
                            </Button>
                        </Box>
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
            <ConfirmationModal
                open={logoutModalOpen}
                handleClose={() => setLogoutModalOpen(false)}
                handleConfirm={handleLogout}
                title="Confirmar Cierre de Sesión"
                description="¿Estás seguro de que deseas cerrar sesión?"
            />
        </AppBar>
    );
};

export default Navbar;
