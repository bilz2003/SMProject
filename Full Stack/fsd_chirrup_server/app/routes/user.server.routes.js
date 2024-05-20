const users = require('../controllers/user.server.controllers')
const auth = require('../lib/middleware');
const  authenticateUser  = require('../models/user.server.models');


module.exports = function(app){

    app.route('/users')
        .post(users.createUser);
    
    app.route('/login')
        .post(users.login);
    
    app.route('/logout')
        .post(auth.isAuthenticated, users.logout);



};

