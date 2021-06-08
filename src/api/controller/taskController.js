const TaskModel = require('../model/taskModel');
const { APIError } = require('../../util/ApiError');
const { ObjectId } = require('mongodb')

class TaskController {

    // Get all tasks available
    listAll(req, res, next) {
        TaskModel.find({}, 'createdAt description maxUsers type', (err, tasks) => {
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