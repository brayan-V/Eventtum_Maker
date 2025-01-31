import { useEffect, useState } from "react";
import { getEventsRequest, deleteEventRequest } from "../api/events";
import { Container, Typography, Button, TextField, Grid } from "@mui/material";
import EventCard from "../components/EventCard";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [search, setSearch] = useState({ location: "", date: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await getEventsRequest();
                setEvents(res.data);
                setFilteredEvents(res.data); // Inicializar filteredEvents
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []); // Agregar array de dependencias vacío

    useEffect(() => {
        filterEvents();
    }, [search, events]); // Array de dependencias adecuado

    const filterEvents = () => {
        const filtered = events.filter(event =>
            (!search.location || event.location.toLowerCase().includes(search.location.toLowerCase())) &&
            (!search.date || event.date.startsWith(search.date))
        );
        setFilteredEvents(filtered);
    };

    const handleDelete = async () => {
        try {
            await deleteEventRequest(selectedEventId);
            setEvents(events.filter((event) => event._id !== selectedEventId));
            setDeleteModalOpen(false);
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-event/${id}`);
    };

    const handleSearchChange = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Mis Eventos
            </Typography>
            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Buscar por Ubicación"
                        name="location"
                        value={search.location}
                        onChange={handleSearchChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Buscar por Fecha"
                        name="date"
                        type="date"
                        value={search.date}
                        onChange={handleSearchChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
            </Grid>
            {filteredEvents.length === 0 ? (
                <Typography variant="body1">No hay eventos creados.</Typography>
            ) : (
                <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {filteredEvents.map((event) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex' }} key={event._id}>
                            <EventCard
                                event={event}
                                onEdit={() => handleEdit(event._id)}
                                onDelete={() => { setSelectedEventId(event._id); setDeleteModalOpen(true); }}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/create-event"
                sx={{ marginTop: 2 }}
            >
                Crear Nuevo Evento
            </Button>
            <ConfirmationModal
                open={deleteModalOpen}
                handleClose={() => setDeleteModalOpen(false)}
                handleConfirm={handleDelete}
                title="Confirmar Eliminación"
                description="¿Estás seguro de que deseas eliminar este evento?"
            />
        </Container>
    );
};

export default EventPage;
