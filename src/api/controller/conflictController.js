const ConflictModel = require('../model/conflictModel');
const AnnotationModel = require('../model/annotationModel');
const { APIError } = require('../../util/ApiError');
const { ObjectId } = require('mongodb')

class ConflictController {
    /** 
     * Can be optimized with indexes for each entity in annotation
     * TBH this is not the scope atm
     */
    // Get all conflicts found
    async listAll(req, res, next) {

        const { userId } = req.params;

        // Get user's annotations which conflict
        const annotations = await AnnotationModel.find({ "user.id": userId }).exec();
        const taskIds = annotations.map(annotation => annotation.taskId);

        const possibleConflicts = await AnnotationModel.find({ taskId: {$in: taskIds}, "user.id": {$ne: userId} }).exec();

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

            if (values.filterNulls().length) {
                const newConflict = new ConflictModel();
                
                newConflict.conflictedUser = {
                    name: item.user.name,
                    id: item.user.id,
                    email: item.user.email
                };
                newConflict.annotationId = annotationToCheck._id;
                newConflict.taskId = item.taskId;
                newConflict.taskText = item.taskText;
                newConflict.conflictedProperties = values.filter(v => v);

                return newConflict;
            }

        });
        const filteredConflicts = conflicts.filterNulls();
        if (!filteredConflicts.length) {
            res.json({
                values: []
            });
        } else {
            res.json({
                values: filteredConflicts
            });
        }
    }

}

module.exports.ConflictController = ConflictController;