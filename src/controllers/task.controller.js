const taskService = require('../services/task.service');

class TaskController {
  async createTask(req, res, next) {
    try {
      const task = await taskService.createTask(req.body, req.user.id);
      res.status(201).json({
        success: true,
        data: task
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllTasks(req, res, next) {
    try {
      const { status, priority, page, limit } = req.query;
      const filters = { status, priority };
      const pagination = { page, limit };
      
      const result = await taskService.getAllTasks(req.user.id, filters, pagination);
      res.json({
        success: true,
        data: result.tasks,
        pagination: result.pagination
      });
    } catch (error) {
      next(error);
    }
  }

  async getTaskById(req, res, next) {
    try {
      const task = await taskService.getTaskById(req.params.id, req.user.id);
      res.json({
        success: true,
        data: task
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const task = await taskService.updateTask(req.params.id, req.user.id, req.body);
      res.json({
        success: true,
        data: task
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const result = await taskService.deleteTask(req.params.id, req.user.id);
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TaskController();