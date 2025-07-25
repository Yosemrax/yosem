const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false   //Deshabilita el logging de SQL en consola
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a MySQL establecida exitosamente.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos MySQL:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };