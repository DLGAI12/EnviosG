require('dotenv').config();

const express = require("express");
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');
const morgan = require("morgan");
const taskRoutes = require('./routes/tasks.routes.js');

const app = express();
const server = http.createServer(app); // Crear servidor HTTP
const wss = new WebSocket.Server({
    server
}); // Configurar WebSocket como servidor

// Configuración del servidor WebSocket
wss.on('connection', (ws) => {
    console.log('Nuevo cliente conectado');

    // Enviar mensaje inicial al cliente


    // Escuchar mensajes del cliente
    ws.on('message', (message) => {
        const decodedMessage = message.toString();
        console.log('Mensaje recibido del cliente:', decodedMessage);

        // Responder al cliente
        ws.send(`Mensaje recibido: ${decodedMessage}`);
    });

    // Manejar desconexión del cliente
    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

// Configuración de CORS
const corsOptions = {
    origin: '*', // Permitir conexiones desde cualquier dominio
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Middlewares de Express
app.use(morgan('dev'));
app.use(express.json());
app.use(taskRoutes);

// Ruta HTTP simple
app.get('/', (req, res) => {
    res.send('Servidor Express con WebSocket');
});

// Manejo de errores
app.use((err, req, res, next) => {
    res.status(404).json({
        message: err.message,
    });
});

// Usar el puerto asignado por Render o 8080
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});