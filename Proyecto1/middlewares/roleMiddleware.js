const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'No autenticado, usuario no encontrado en la solicitud.' });
        }

        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Acceso denegado, no tienes los permisos necesarios.' });
        }

        next();
    };
};

module.exports = authorize;