const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Importar desde models/index.js

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Buscar usuario por ID y excluir la contraseña y refresh token
            req.user = await User.findByPk(decoded.id, {
                attributes: { exclude: ['password', 'refreshToken'] }
            });

            if (!req.user) {
                return res.status(401).json({ message: 'Usuario no encontrado' });
            }
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'No autorizado, token fallido' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No autorizado, no hay token' });
    }
};

module.exports = protect;