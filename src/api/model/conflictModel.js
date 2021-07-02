var mongoose = require('mongoose');

// Setup schema
var conflictSchema = mongoose.Schema({
    conflictedUser: String,
    annotationId: String,
    taskId: String,
    conflictedProperties: [
        {
            conflictedEntity: String,
            conflictedStartPos: String,
            conflictedEndPos: String
        }
    ]
});
// Export Contact model
const ConflictModel = module.exports = mongoose.model('conflict', conflictSchema);
module.exports.get = function (callback, limit) {
    ConflictModel.find(callback).limit(limit);
}