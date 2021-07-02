const router = require('express').Router();
const { ConflictController } = require('../controller/conflictController');

const conflictController = new ConflictController();

router.get('', conflictController.listAll);

module.exports = router;