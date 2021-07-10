const router = require('express').Router();
const { TaskController } = require('../controller/taskController');

const taskController = new TaskController();
router.get('/user=:userId', taskController.listAll);
router.get('/:id', taskController.getParams);

module.exports = router;