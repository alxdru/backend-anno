const AnnotationModel = require('../model/annotationModel');
const TaskModel = require('../model/taskModel');
const { APIError } = require('../../util/ApiError');
const { ObjectId } = require('mongodb')

class AnnotationController {
    // Create new annotation
    async create(req, res, next) {
        const annotation = new AnnotationModel();
        const { 
            userId, 
            userName, 
            userEmail, 
            taskId, 
            taskText, 
            annotationProperties 
        } = req.body;
        annotation.user = {
            id: userId,
            name: userName,
            email: userEmail
        };
        annotation.taskId = taskId;
        annotation.taskText = taskText;
        annotation.annotationProperties = annotationProperties;

        const exists = await AnnotationModel.findOne({ userId, taskId }).exec();

        if (!exists) {
            TaskModel.findById(annotation.taskId, (err, task) => {
                if(err) res.json(err);

                if (task.maxUsers > 0) {
                    annotation.save((error) => {
                        if(error) next(new APIError(error));
            
                        res.json({    
                            message: 'New annotation was created!',
                            values: annotation
                        })
                    });
                    task.maxUsers = task.maxUsers-1;
                    task.save();
                } else {
                    next(new APIError("Sorry, user limit was exceeded for this task!"));
                }
            });
        } else {
            next(new APIError("There's already an annotation by user for the task"));
        }

    }

    async findById(req, res, next) {
        const { id } = req.params;

        if (ObjectId.isValid(id)) {
            const annotation = await AnnotationModel.findById(id).exec();
            if (annotation) {
                res.json(annotation);
            } else {
                next(new APIError(`Annotation was not found with given id!`));
            }
        } else {
            next(new APIError("Please specify a valid ObjectID."));
        }
    }

    async update(req, res, next) {
        const { id } = req.params
        const { annotationProperties } = req.body;

        if (ObjectId.isValid(id)) {
            const annotation = await AnnotationModel.findById(id).exec();
            if (annotation) {
                annotation.annotationProperties = annotationProperties;
                annotation.save()
                          .then((updatedAnnotation) => {
                            res.json({    
                                message: 'Annotation has been updated successfully!',
                                values: updatedAnnotation
                            });
                        });
            } else {
                next(new APIError(`Annotation was not found with given id!`));
            }
        } else {
            next(new APIError("Please specify a valid ObjectID."));
        }
    }

}

module.exports.AnnotationController = AnnotationController;