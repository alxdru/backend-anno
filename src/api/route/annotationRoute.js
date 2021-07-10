const router = require('express').Router();
const { AnnotationController } = require('../controller/annotationController');

const annotationController = new AnnotationController();

router.post('', annotationController.create);
router.get('/:id', annotationController.findById);
router.put('/:id', annotationController.update);

module.exports = router;