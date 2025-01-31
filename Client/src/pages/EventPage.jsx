import { useEffect, useState } from "react";
import { getEventsRequest, deleteEventRequest } from "../api/events";
import { Container, Typography, Button } from "@mui/material";
import EventCard from "../components/EventCard";
import { Link, useNavigate } from "react-router-dom";

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await getEventsRequest();
                setEvents(res.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteEventRequest(id);
            setEvents(events.filter((event) => event._id !== id));
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };
    const handleEdit = (id) => {
        navigate(`/edit-event/${id}`);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Mis Eventos
            </Typography>
            {events.length === 0 ? (
                <Typography variant="body1">No hay eventos creados.</Typography>
            ) : (
                events.map((event) => (
                    <EventCard
                        key={event._id}
                        event={event}
                        onEdit={() => handleEdit(event._id)}
                        onDelete={handleDelete}
                    />
                ))
            )}
            <Button variant="contained" color="primary" component={Link} to="/create-event" sx={{ marginTop: 2 }}>
                Crear Nuevo Evento
            </Button>
        </Container>
    );
};

export default EventPage;