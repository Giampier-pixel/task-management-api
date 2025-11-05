const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const { registerValidator, loginValidator } = require('../validators/auth.validator');

// POST /api/auth/register - Registrar usuario
router.post('/register', registerValidator, validate, authController.register);

// POST /api/auth/login - Iniciar sesión
router.post('/login', loginValidator, validate, authController.login);

// GET /api/auth/profile - Obtener perfil (requiere autenticación)
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;