const AnnotationModel = require('../model/annotationModel');
const TaskModel = require('../model/taskModel');
const { APIError } = require('../../util/ApiError');
const { ObjectId } = require('mongodb')

class AnnotationController {
    // Create new annotation
    async create(req, res, next) {
        const annotation = new AnnotationModel();
        const { userId, taskId, annotationProperties } = req.body;
        annotation.userId = userId
        annotation.taskId = taskId;
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

}

module.exports.AnnotationController = AnnotationController;