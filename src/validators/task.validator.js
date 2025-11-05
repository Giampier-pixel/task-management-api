const { body } = require('express-validator');

const createTaskValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('El título es requerido')
    .isLength({ min: 3 }).withMessage('El título debe tener al menos 3 caracteres'),
  
  body('description')
    .optional()
    .trim(),
  
  body('status')
    .optional()
    .isIn(['pending', 'in_progress', 'completed'])
    .withMessage('Estado inválido'),
  
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Prioridad inválida'),
  
  body('dueDate')
    .optional()
    .isISO8601().withMessage('Fecha inválida')
];

const updateTaskValidator = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage('El título debe tener al menos 3 caracteres'),
  
  body('description')
    .optional()
    .trim(),
  
  body('status')
    .optional()
    .isIn(['pending', 'in_progress', 'completed'])
    .withMessage('Estado inválido'),
  
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Prioridad inválida'),
  
  body('dueDate')
    .optional()
    .isISO8601().withMessage('Fecha inválida')
];

module.exports = {
  createTaskValidator,
  updateTaskValidator
};