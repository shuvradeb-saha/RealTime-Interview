const User = require('../model/user.model.js');

exports.create = (req, res) => {
    if(!req.body.userName) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    const user = new User({
        fullName: req.body.fullName, 
        userName: req.body.userName,
        password: req.body.password
    });

    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

exports.findAll = (req, res) => {
    User.find()
    .then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

exports.findOne = (req, res) => {
    console.log('User name '+req.params.userName);
    if(!req.params.userName){
        console.log("Not found");
    }
    User.findOne({'userName':req.params.userName})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Note not found with user name " + req.params.userName
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userName
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.userName
        });
    });
};

exports.login = (req, res) =>{
    if(!req.body.userName){
        return res.status(400).send(
            {
                message : "Enter all info correctly"
            }
        );
    }
    User.findOne({'userName':req.body.userName})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with user name " + req.body.userName
            });            
        }
        console.log(req.body.password + "user = " +user.password) ;
        if(user.password !== req.body.password){
            console.log("error ");                
            res.send("error ");
        }else{
            res.render("welcome",{name:user.userName});
            //res.send(user+req.body.userRole);
        }
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.body.userName
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.body.userName
        });
    });
    console.log("hello login");
};