const Problem = require('../model/problem.model');

exports.createProblem = (req, res) => {
    const problem = extractProblem(req, res);
    problem.save()
    .then(data => {
        return res.redirect("ddfd");
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

exports.getProblemToEdit = (req, res) => {
    Problem.findOne({_id:req.params.problemId,setterName: req.params.userName,status: true},{input:0,output:0}).
    then(
        problem => {
            //console.log("problem == "+problem)
            res.render("viewProblem",{problem:problem});
        }
    ).catch(
        err => {
            return res.status(404).send({
                message: "problem not found with id " + req.params.problemId
            }); 
        }
    ); 
};

exports.editProblem =(req, res) => {
    const problem = extractProblem(req, res);
    problem.findByIdAndUpdate(req.body._id)
    .then({
        //return res.status(201).redirect("ddfd");
    }).catch({

    });

};


function extractProblem(req,res){
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
        }
    );

    return problem;
}