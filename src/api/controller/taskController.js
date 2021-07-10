const TaskModel = require('../model/taskModel');
const AnnotationModel = require('../model/annotationModel');
const { APIError } = require('../../util/ApiError');
const { ObjectId } = require('mongodb')

class TaskController {

    // Get all tasks available
    async listAll(req, res, next) {
        const { userId } = req.params;
        const annotations = await AnnotationModel.find({ "user.id": userId }).exec();
        const taskIds = annotations.map(annotation => annotation.taskId);

        TaskModel.find({_id: {$nin: taskIds}}, 'createdAt description maxUsers type', (err, tasks) => {
            if (err) next(new APIError(error));

            res.json({
                values: tasks
            })
        })
    }

    // Get parameters for task by id
    getParams(req, res, next) {
        const { id } = req.params;
        if (ObjectId.isValid(id)) {
            TaskModel.findById(id, 'parameters', (err, param) => {
                if (err) next(new APIError(error));
    
                res.json({
                    values: param
                })
            });
        } else {
            next(new APIError("Please specify a valid ObjectID."));
        }

    }

}

module.exports.TaskController = TaskController;