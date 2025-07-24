require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db'); // Importar connectDB de la nueva configuración
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const db = require('./models'); // Importar para inicializar modelos y sincronizar

const app = express();

// Conectar a la base de datos (Sequelize se encarga de la sincronización en models/index.js)
connectDB();

// Middleware para parsear JSON en el cuerpo de la solicitud
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: `No se encontró la ruta: ${req.originalUrl}` });
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});