const mongoose = require('mongoose');

const ProblemSchema = mongoose.Schema({
    problemTitle: String,
    timeLimit: Number,
    memoryLimit: Number,
    problemDetails: String,
    sampleInput: String,
    sampleOutput: String,
    input: String,
    output: String,
    setterName: String
});

module.exports = mongoose.model('Problem', ProblemSchema);