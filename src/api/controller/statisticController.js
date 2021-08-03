const TaskModel = require('../model/taskModel');
const AnnotationModel = require('../model/annotationModel');
const StatisticModel = require('../model/statisticModel');
const { APIError } = require('../../util/ApiError');
const { ObjectId } = require('mongodb')

class StatisticController {

    // Get all statistics available
    async get(req, res, next) {
        const { userId } = req.params;

        const labels = ['Annotated tasks', 'Open tasks'];
        const backgroundColors = ['rgb(50,205,50)', 'rgb(222,184,135)'];

        try {
            const annotations = await AnnotationModel.find({ "user.id": userId }).exec();
            const taskIds = annotations.map(annotation => annotation.taskId);
            const tasks = await TaskModel.find({_id: {$nin: taskIds}}).exec();
    
            const indicators = [annotations.length, tasks.length];
            const total = await TaskModel.count().exec();
            
            const statistics = new StatisticModel();
            statistics.tasks.labels = labels;
            statistics.tasks.dataset = indicators;
            statistics.tasks.backgroundColors = backgroundColors;
            statistics.tasks.total = total;
    
            res.json({
                values: statistics
            });
        } catch (e) {
            next(new APIError("Error when building statistics: " + e));
        }
    }

}

module.exports.StatisticController = StatisticController;