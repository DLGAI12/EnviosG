const express = require("express")

const app = express()
const cors = require('cors');
const morgan = require("morgan")
const taskRoutes = require('./routes/tasks.routes.js')
const corsOptions = {
    origin: 'http://localhost:5173', // Aquí pones la URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
};

app.use(cors(corsOptions)); // Habilita CORS con las opciones que configuraste

app.use(morgan('dev'))
app.use(express.json())
app.use(taskRoutes)
app.listen(4000)


app.use((err, req, res, next) => {
    res.status(404).json({
        message: err.message
    })
})