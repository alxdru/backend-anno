const ConflictModel = require('../model/conflictModel');
const AnnotationModel = require('../model/annotationModel');
const { APIError } = require('../../util/ApiError');
const { ObjectId } = require('mongodb')

class ConflictController {

    // Get all conflicts found
    async listAll(req, res, next) {

        const { userId } = req.body;

        // Get user's annotations which conflict
        const annotations = await AnnotationModel.find({ userId }).exec();
        const taskIds = annotations.map(annotation => annotation.taskId);

        const possibleConflicts = await AnnotationModel.find({ taskId: {$in: taskIds}, userId: {$ne: userId} }).exec();

        const conflicts = possibleConflicts.map(item => {
            const annotationToCheck = annotations.find(a => a.taskId === item.taskId);

            const annotationProperties = annotationToCheck.annotationProperties;

            const values = annotationProperties.map(prop => {
                const conflict = item.annotationProperties.find(iprop => {
                    return (prop.endPosition === iprop.endPosition &&
                    prop.startPosition === iprop.startPosition && 
                    prop.entity === iprop.entity &&
                    JSON.stringify(prop.labels) !== JSON.stringify(iprop.labels));
                });

                if (conflict) {
                    return {
                        conflictedEntity: conflict.entity,
                        conflictedStartPos: conflict.startPosition,
                        conflictedEndPos: conflict.endPosition
                    };
                } 
            });

            if (values) {
                const newConflict = new ConflictModel();
                
                newConflict.conflictedUser = item.userId;
                newConflict.annotationId = annotationToCheck._id;
                newConflict.taskId = item.taskId;
                newConflict.conflictedProperties = values.filter(v => v);

                return newConflict;
            }

        });

        if (!conflicts) res.json({
            values: []
        });
        res.json({
            values: conflicts
        });
    }

}

module.exports.ConflictController = ConflictController;