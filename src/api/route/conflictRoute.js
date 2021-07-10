const router = require('express').Router();
const { ConflictController } = require('../controller/conflictController');

const conflictController = new ConflictController();

router.get('/:userId', conflictController.listAll);

module.exports = router;