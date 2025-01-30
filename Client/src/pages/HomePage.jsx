import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import  {AuthContext } from '../context/AuthContext'
import { useContext } from "react";
const HomePage = () => {
    const { user, isAuthenticated} = useContext(AuthContext);
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>
                    {isAuthenticated ? `Hola ${user.username}`: " Bienvenido a Event Manager"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {isAuthenticated ? " ":"Gestiona tus eventos de manera sencilla y eficiente."}
                </Typography>
                {isAuthenticated ? <Button variant="contained" color="primary" component={Link} to="/events" sx={{ mt: 3, mb: 2 }}>
                    ¡Mis Eventos!
                </Button> : <Button variant="contained" color="primary" component={Link} to="/login" sx={{ mt: 3, mb: 2 }}>
                    ¡Empieza Ahora!
                </Button>}
            </Box>
        </Container>
    );
};

export default HomePage;
