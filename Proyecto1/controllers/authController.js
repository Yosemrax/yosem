const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Importar desde models/index.js

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
    });
};

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
    });
};

// @desc    Registrar un nuevo usuario
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const user = await User.create({
            username,
            email,
            password,
            role
        });

        const accessToken = generateToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        user.refreshToken = refreshToken;
        await user.save(); // Sequelize guarda automáticamente si el hook está configurado para hashear

        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            accessToken,
            refreshToken
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor al registrar usuario' });
    }
};

// @desc    Autenticar usuario y obtener token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (user && (await user.matchPassword(password))) {
            const accessToken = generateToken(user.id);
            const refreshToken = generateRefreshToken(user.id);

            user.refreshToken = refreshToken;
            await user.save();

            res.json({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                accessToken,
                refreshToken
            });
        } else {
            res.status(401).json({ message: 'Email o contraseña inválidos' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor al iniciar sesión' });
    }
};

// @desc    Renovar token de acceso usando refresh token
// @route   POST /api/auth/refresh
// @access  Public
const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: 'No se proporcionó refresh token' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const user = await User.findByPk(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Refresh token inválido o no encontrado' });
        }

        const newAccessToken = generateToken(user.id);
        const newRefreshToken = generateRefreshToken(user.id);

        user.refreshToken = newRefreshToken;
        await user.save();

        res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });

    } catch (error) {
        console.error(error);
        res.status(403).json({ message: 'Refresh token inválido o expirado' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    refreshAccessToken
};