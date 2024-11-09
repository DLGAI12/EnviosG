const express = require("express")

const app = express()
const cors = require('cors');
const morgan = require("morgan")
const taskRoutes = require('./routes/tasks.routes.js')
app.use(morgan('dev'))
app.use(express.json())
app.use(taskRoutes)
app.listen(4000)
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use((err, req, res, next) => {
    res.status(404).json({
        message: err.message
    })
})