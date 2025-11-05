const Task = require('../models/Task.model');

class TaskService {
  async createTask(taskData, userId) {
    const task = await Task.create({
      ...taskData,
      userId
    });
    return task;
  }

  async getAllTasks(userId, filters = {}, pagination = {}) {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    // Construir query
    const query = { userId };
    if (filters.status) query.status = filters.status;
    if (filters.priority) query.priority = filters.priority;

    // Ejecutar query con paginación
    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Task.countDocuments(query);

    return {
      tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getTaskById(taskId, userId) {
    const task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      throw new Error('Tarea no encontrada');
    }
    return task;
  }

  async updateTask(taskId, userId, updateData) {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      { ...updateData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!task) {
      throw new Error('Tarea no encontrada');
    }
    return task;
  }

  async deleteTask(taskId, userId) {
    const task = await Task.findOneAndDelete({ _id: taskId, userId });
    if (!task) {
      throw new Error('Tarea no encontrada');
    }
    return { message: 'Tarea eliminada correctamente' };
  }
}

module.exports = new TaskService();