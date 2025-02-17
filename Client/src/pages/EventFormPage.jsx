import { useState, useEffect } from "react";
import { createEventRequest, updateEventRequest, getEventsRequest } from "../api/events";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { eventSchema } from "../validation/eventValidation"; // Importa el esquema de validación
dayjs.extend(utc);

const EventFormPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState({ name: "", date: "", time: "", location: "", description: "" });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const formatEventData = (data) => ({
        ...data,
        date: dayjs.utc(data.date).format(),
    });

    useEffect(() => {
        if (id) {
            // Si hay un ID, cargar los datos del evento para editar
            const fetchEvent = async () => {
                try {
                    const res = await getEventsRequest();
                    const eventToEdit = res.data.find((event) => event._id === id);
                    if (eventToEdit) setEvent({
                        ...eventToEdit,
                        date: dayjs.utc(eventToEdit.date).format("YYYY-MM-DD")
                    });
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
            // Validar datos del evento con zod
            eventSchema.parse(event);
            if (id) {
                await updateEventRequest(id, formatEventData(event));
            } else {
                await createEventRequest(formatEventData(event));
            }
            navigate("/events");
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

    const handleCancel = () => {
        navigate("/events");
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
                    error={Boolean(errors.name)}
                    helperText={errors.name}
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
                    error={Boolean(errors.date)}
                    helperText={errors.date}
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
                    error={Boolean(errors.time)}
                    helperText={errors.time}
                />
                <TextField
                    label="Ubicación"
                    value={event.location}
                    onChange={(e) => setEvent({ ...event, location: e.target.value })}
                    fullWidth
                    margin="normal"
                    required
                    error={Boolean(errors.location)}
                    helperText={errors.location}
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
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    {id ? "Guardar Cambios" : "Crear Evento"}
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ marginTop: 2, marginLeft: 2 }}>
                    Cancelar
                </Button>
            </form>
        </Container>
    );
};

export default EventFormPage;
