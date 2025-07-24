const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT, // Para descripciones más largas
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2), // Ejemplo: hasta 99,999,999.99
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    }, {
        tableName: 'products', // Opcional: Define el nombre de la tabla en MySQL
        timestamps: true // Crea `createdAt` y `updatedAt` automáticamente
    });

    return Product;
};