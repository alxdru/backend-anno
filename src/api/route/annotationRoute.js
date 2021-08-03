const router = require('express').Router();
const { AnnotationController } = require('../controller/annotationController');

const annotationController = new AnnotationController();

router.post('', annotationController.create);
router.get('/:id', annotationController.findById);
router.get('/list/:userId', annotationController.findAllByUser);
router.put('/:id', annotationController.update);
router.get('/file/:userId', annotationController.getFile);

module.exports = router;