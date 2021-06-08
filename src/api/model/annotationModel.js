var mongoose = require('mongoose');

// Setup schema
var annotationSchema = mongoose.Schema({
    userId: String,
    taskId: String,
    annotationProperties: [
        {
            labels: [ String ],
            endPosition: String,
            entity: String,
            startPosition: String
        }
    ]
});
// Export Contact model
const AnnotationModel = module.exports = mongoose.model('annotation', annotationSchema, 'annotations');
module.exports.get = function (callback, limit) {
    AnnotationModel.find(callback).limit(limit);
}