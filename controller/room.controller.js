const Room = require('../model/room.model');

exports.createRoom = (req, res) => {
    const room = new Room({
        roomName: req.body.roomName,
        problemId: req.body.problemId,
        setterName: req.body.userName
    });
    room.save()
        .then(roomData => {
            res.send(roomData);
        }).catch(err => {
            res.status(400).send({
                message: err.message || "Some error occurred while creating the Room."
            });
        });
};