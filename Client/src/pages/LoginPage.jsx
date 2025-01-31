import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { TextField, Button, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const { signin, errors } = useContext(AuthContext);
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await signin(user);
        if (success) {
            navigate("/events"); // Redirigir a EventPage si está autenticado
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Iniciar Sesión
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Iniciar Sesión
                </Button>
            </form>
            {errors && <Typography color="error">{errors}</Typography>}
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
            </Typography>
        </Container>
    );
};

export default LoginPage;