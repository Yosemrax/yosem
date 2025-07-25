const { sequelize } = require('../config/db');
const User = require('./User');
const Product = require('./Product');

// Definir relaciones si las hay (ej: un usuario puede tener muchos productos, etc.)
// En este ejemplo, User y Product no tienen una relación directa,
// pero si la tuvieras, se definiría aquí.
// User.hasMany(Product, { foreignKey: 'userId' });
// Product.belongsTo(User, { foreignKey: 'userId' });

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize; // Para acceso a tipos de datos y operadores

db.User = User(sequelize);
db.Product = Product(sequelize);

// Sincronizar todos los modelos con la base de datos.
// { force: true } eliminará las tablas existentes y las recreará (usar con precaución en producción).
// { alter: true } intentará cambiar las tablas existentes para que coincidan con el modelo.
db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('Tablas sincronizadas con la base de datos.');
    })
    .catch(err => {
        console.error('Error al sincronizar tablas:', err);
    });

module.exports = db;