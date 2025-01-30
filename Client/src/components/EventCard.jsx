import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";

const EventCard = ({ event, onEdit, onDelete }) => {
    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {event.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {event.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Fecha: {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Hora: {event.time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Ubicación: {event.location}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => onEdit(event._id)}>
                    Editar
                </Button>
                <Button size="small" color="error" onClick={() => onDelete(event._id)}>
                    Eliminar
                </Button>
            </CardActions>
        </Card>
    );
};

export default EventCard;