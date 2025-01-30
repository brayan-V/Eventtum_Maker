import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { TextField, Button, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const { signup, errors } = useContext(AuthContext);
    const [user, setUser] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(user);
        navigate("/events");
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Registrarse
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nombre de usuario"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    fullWidth
                    margin="normal"
                />
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
                    Registrarse
                </Button>
            </form>
            {errors && <Typography color="error">{errors}</Typography>}
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </Typography>
        </Container>
    );
};

export default RegisterPage;