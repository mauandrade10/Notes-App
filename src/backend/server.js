/* Inicializa y configura el servidor de express */

/* Importar modulos en Node */
const express = require("express");
//politicas CORS de cross origin (permite comunicación desde la misma IP)
const cors = require("cors");

const morgan = require("morgan");

const cookieParser = require('cookie-parser')

/* Inicialización */
const app = express();

// Middlewares
app.use(cors({
    origin: 'http://localhost:5500',
    credentials: true
  }))
app.use(express.json());
app.use(morgan('dev'))
app.use(cookieParser())

/* Configuración inicial */
app.set("port", process.env.PORT || 3002);

/* Middleware */
app.use(express.urlencoded({ extended: true }));
//Permite el uso de request en formato json



/* Meramente un log de lo que estamos recibiendo como request */
// app.use((req, res, next) => {
//     // Registra la información de la solicitud en la consola
//     console.log(`Recibida solicitud ${req.method} en ${req.originalUrl}`);
//     console.log('Encabezados:', req.headers);
//     console.log('Cuerpo:', req.body); // Esto mostrará el cuerpo de la solicitud POST

//     // Continúa con el flujo normal de manejo de la solicitud
//     next();
// });

/* Rutas */
app.use(require("./routes/user.routes"));
app.use(require("./routes/notes.routes"));


module.exports = app;
