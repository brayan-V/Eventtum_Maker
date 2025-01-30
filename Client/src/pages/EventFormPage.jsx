import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { createEventRequest, updateEventRequest, getEventsRequest } from "../api/events";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const EventFormPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [event, setEvent] = useState({ name: "", date: "", time: "", location: "", description: "" });
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Si hay un ID, cargar los datos del evento para editar
            const fetchEvent = async () => {
                try {
                    const res = await getEventsRequest();
                    const eventToEdit = res.data.find((event) => event._id === id);
                    if (eventToEdit) setEvent(eventToEdit);
                } catch (error) {
                    console.error("Error fetching event:", error);
                }
            };
            fetchEvent();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateEventRequest(id, event);
            } else {
                await createEventRequest({ ...event, user: user._id });
            }
            navigate("/events");
        } catch (error) {
            console.error("Error saving event:", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                {id ? "Editar Evento" : "Crear Evento"}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nombre del evento"
                    value={event.name}
                    onChange={(e) => setEvent({ ...event, name: e.target.value })}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Fecha"
                    type="date"
                    value={event.date}
                    onChange={(e) => setEvent({ ...event, date: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    label="Hora"
                    type="time"
                    value={event.time}
                    onChange={(e) => setEvent({ ...event, time: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    label="Ubicación"
                    value={event.location}
                    onChange={(e) => setEvent({ ...event, location: e.target.value })}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Descripción"
                    value={event.description}
                    onChange={(e) => setEvent({ ...event, description: e.target.value })}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    {id ? "Guardar Cambios" : "Crear Evento"}
                </Button>
            </form>
        </Container>
    );
};

export default EventFormPage;