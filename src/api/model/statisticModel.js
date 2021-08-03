var mongoose = require('mongoose');

// Setup schema
var statisticSchema = mongoose.Schema({
    tasks: {
        labels: [String],
        dataset: [Number],
        backgroundColors: [String],
        total: Number
    },
});
// Export Contact model
const StatisticModel = module.exports = mongoose.model('statistic', statisticSchema);
module.exports.get = function (callback, limit) {
    StatisticModel.find(callback).limit(limit);
}