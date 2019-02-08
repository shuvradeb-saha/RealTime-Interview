const Problem = require('../model/problem.model');

exports.createProblem = (req, res) => {
    const problem = new Problem(
        {
            problemTitle: req.body.problemTitle,
            timeLimit: req.body.timeLimit,
            memoryLimit: req.body.memoryLimit,
            problemDetails: req.body.problemDetails,
            sampleInput: req.body.sampleInput,
            sampleOutput: req.body.sampleOutput,
            input: req.body.input,
            output: req.body.output,
            setterName: req.body.userName
        },{
            timestamps: true
        }
    );

    problem.save()
    .then(data => {
        res.send(data);
    }).catch(err =>{
        res.status(400).send({
            message : err.message || "Some error occurred while creating the Problem."
        });
    });
};

exports.findAllProblem = (req, res) => {
    Problem.find()
    .then(problem => {
        res.send(problem);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};
