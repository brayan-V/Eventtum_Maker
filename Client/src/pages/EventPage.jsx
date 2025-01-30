import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getEventsRequest, deleteEventRequest } from "../api/events";
import { Container, Typography, Button } from "@mui/material";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";

const EventPage = () => {
    const { user, isAuthenticated } = useContext(AuthContext);
    const [events, setEvents] = useState([]);

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
                        onEdit={() => console.log("Editar evento:", event._id)}
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