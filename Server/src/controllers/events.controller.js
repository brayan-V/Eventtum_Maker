import Event from "../models/event.model.js";

// Función para obtener todos los eventos del usuario con filtros opcionales
export const getEvents = async (req, res) => {
    const { date, location } = req.query; // Obtener parámetros de consulta (fecha y ubicación)
    const filter = { user: req.user.id }; // Filtro base: solo eventos del usuario autenticado

    try {
        // Aplicar filtros adicionales si se proporcionan
        if (date) {
            filter.date = new Date(date); // Filtrar por fecha exacta
        }
        if (location) {
            filter.location = { $regex: location, $options: "i" }; // Filtrar por ubicación (insensible a mayúsculas/minúsculas)
        }

        // Buscar eventos que coincidan con los filtros
        const events = await Event.find(filter);
        res.json(events); // Responder con los eventos filtrados
    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejar errores
    }
};

// Función para crear un nuevo evento
export const createEvent = async (req, res) => {
    const { name, date, time, location, description } = req.body;

    try {
        const newEvent = new Event({ name, date, time, location, description, user: req.user.id }); // Crear un nuevo evento
        const eventSaved = await newEvent.save(); // Guardar el evento en la base de datos
        res.status(201).json(eventSaved); // Responder con el evento creado
    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejar errores
    }
};

// Función para actualizar un evento existente
export const updateEvent = async (req, res) => {
    const { id } = req.params; // Obtener el ID del evento a actualizar
    const { name, date, time, location, description } = req.body; // Obtener los nuevos datos del evento

    try {
        // Buscar el evento por ID y verificar que pertenezca al usuario autenticado
        const event = await Event.findOne({ _id: id, user: req.user.id });
        if (!event) {
            return res.status(404).json({ message: "Event not found or unauthorized" }); // Si no se encuentra el evento o no pertenece al usuario
        }

        // Actualizar los campos del evento
        event.name = name || event.name;
        event.date = date || event.date;
        event.time = time || event.time;
        event.location = location || event.location;
        event.description = description || event.description;

        const updatedEvent = await event.save(); // Guardar los cambios
        res.json(updatedEvent); // Responder con el evento actualizado
    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejar errores
    }
};

// Función para eliminar un evento
export const deleteEvent = async (req, res) => {
    const { id } = req.params; // Obtener el ID del evento a eliminar

    try {
        // Buscar el evento por ID y verificar que pertenezca al usuario autenticado
        const event = await Event.findOne({ _id: id, user: req.user.id });
        if (!event) {
            return res.status(404).json({ message: "Event not found or unauthorized" }); // Si no se encuentra el evento o no pertenece al usuario
        }

        await event.deleteOne(); // Eliminar el evento
        res.sendStatus(204); // Responder con un código 204 (sin contenido)
    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejar errores
    }
};