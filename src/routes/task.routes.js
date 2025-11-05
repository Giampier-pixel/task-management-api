const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const { createTaskValidator, updateTaskValidator } = require('../validators/task.validator');

// Aplicar authMiddleware a todas las rutas
router.use(authMiddleware);

// POST /api/tasks - Crear tarea
router.post('/', createTaskValidator, validate, taskController.createTask);

// GET /api/tasks - Obtener todas las tareas (con filtros y paginación)
router.get('/', taskController.getAllTasks);

// GET /api/tasks/:id - Obtener tarea específica
router.get('/:id', taskController.getTaskById);

// PUT /api/tasks/:id - Actualizar tarea
router.put('/:id', updateTaskValidator, validate, taskController.updateTask);

// DELETE /api/tasks/:id - Eliminar tarea
router.delete('/:id', taskController.deleteTask);

module.exports = router;