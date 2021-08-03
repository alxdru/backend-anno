const router = require('express').Router();
const { StatisticController } = require('../controller/statisticController');

const statisticController = new StatisticController();
router.get('/:userId', statisticController.get);

module.exports = router;