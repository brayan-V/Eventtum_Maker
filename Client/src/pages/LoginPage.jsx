import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../validation/authValidation"; // Importa el esquema de validación

const LoginPage = () => {
    const { signin, errors: authErrors } = useContext(AuthContext);
    const [user, setUser] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validar datos del login con zod
            loginSchema.parse(user);
            const success = await signin(user);
            if (success) navigate("/events");
        } catch (error) {
            if (error.errors) {
                const errorMessages = error.errors.reduce((acc, err) => {
                    acc[err.path[0]] = err.message;
                    return acc;
                }, {});
                setErrors(errorMessages);
            }
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
                    required
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    fullWidth
                    margin="normal"
                    required
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                />
                <Button type="submit" variant="contained" color="primary">
                    Iniciar Sesión
                </Button>
            </form>
            {authErrors.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    {authErrors.map((err, index) => (
                        <Typography key={index} color="error">
                            {err}
                        </Typography>
                    ))}
                </Box>
            )}
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
            </Typography>
        </Container>
    );
};

export default LoginPage;
