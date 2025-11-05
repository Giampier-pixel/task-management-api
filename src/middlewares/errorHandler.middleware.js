const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      error: 'Error de validación',
      details: errors
    });
  }

  // Error de cast de Mongoose (ID inválido)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'ID inválido'
    });
  }

  // Error de clave duplicada
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: 'Ya existe un registro con esos datos'
    });
  }

  // Error genérico
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Error interno del servidor'
  });
};

module.exports = errorHandler;