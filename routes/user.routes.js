module.exports = (app) => {
    const users = require('../controller/user.controller.js');
    const problems = require('../controller/problem.controller.js');

    app.post('/users', users.create);
    app.get('/users', users.findAll);
    app.get('/users/:userName', users.findOne);
    app.post('/', users.login);

    app.post('/create-problem', problems.createProblem);
    app.get('/problems', problems.findAllProblem);


}