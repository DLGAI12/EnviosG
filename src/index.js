require('dotenv').config();

const express = require("express")
const WebSocket = require('ws');
const app = express()
const cors = require('cors');
const morgan = require("morgan")
const taskRoutes = require('./routes/tasks.routes.js')
const server = require('http').createServer(app);
const wss = new WebSocket.Server({
    server
});
wss.on('connection', (ws) => {
    console.log('Nuevo cliente conectado');

    // Enviamos un mensaje al cliente
    ws.send('¡Bienvenido al servidor WebSocket!');

    // Escuchamos mensajes del cliente
    ws.on('message', (message) => {

        const decodeMessage = message.toString();

        console.log('Mensaje recibido del cliente:', decodeMessage);

        // Enviamos una respuesta al cliente
        ws.send(`Mensaje recibido: ${decodeMessage}`);
    });

    // Manejar el cierre de la conexión
    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

// Definimos una ruta HTTP simple
app.get('/', (req, res) => {
    res.send('Servidor Express con WebSocket');
});
const corsOptions = {
    origin: '*', // Aquí pones la URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
};

app.use(cors(corsOptions)); // Habilita CORS con las opciones que configuraste

app.use(morgan('dev'))
app.use(express.json())
app.use(taskRoutes)


app.use((err, req, res, next) => {
    res.status(404).json({
        message: err.message
    })
})
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor Express con WebSocket escuchando en http://localhost:${PORT}`);
});