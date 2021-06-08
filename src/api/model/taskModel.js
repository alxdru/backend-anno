var mongoose = require('mongoose');

// Setup schema
var taskSchema = mongoose.Schema({
    createdAt: Date,
    description: {
        type: String
    },
    maxUsers: {
        type: Number,
        min: [0, 'Task exceeded number of users permitted!']
    },
    type: String,
    parameters: {
        labels: [ { name: String, display_name: String } ],
        text: String
    }
});
// Export Contact model
const TaskModel = module.exports = mongoose.model('task', taskSchema, 'tasks');
module.exports.get = function (callback, limit) {
    TaskModel.find(callback).limit(limit);
}