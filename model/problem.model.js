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
    setterName: String,
    status: {
        type: Boolean,
        default: true
    }
},{timestamps: true});

module.exports = mongoose.model('Problem', ProblemSchema);