import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../validation/authValidation"; // Importa el esquema de validación

const RegisterPage = () => {
    const { signup, errors: authErrors } = useContext(AuthContext);
    const [user, setUser] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validar datos del registro con zod
            registerSchema.parse(user);
            const success = await signup(user);
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
                Registrarse
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nombre de usuario"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    fullWidth
                    margin="normal"
                    required
                    error={Boolean(errors.username)}
                    helperText={errors.username}
                />
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
                <TextField
                label="Confirmar Contraseña"
                type="password"
                value={user.confirmPassword}
                onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
                fullWidth
                margin="normal"
                required
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
                />
                <Button type="submit" variant="contained" color="primary">
                    Registrarse
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
                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </Typography>
        </Container>
    );
};

export default RegisterPage;
