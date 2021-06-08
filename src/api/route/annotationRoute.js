const router = require('express').Router();
const { AnnotationController } = require('../controller/annotationController');

const annotationController = new AnnotationController();

router.post('', annotationController.create);
router.get('/:id', annotationController.findById);

module.exports = router;