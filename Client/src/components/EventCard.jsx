import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const EventCard = ({ event, onEdit, onDelete }) => {
    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {event.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {event.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Fecha: {dayjs(event.date).utc().format("DD/MM/YY")}
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
