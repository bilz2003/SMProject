const auth = require('../lib/middleware');
const users = require('../controllers/social.server.controllers');

module.exports = function(app){
    app.route('/users/:user_id')
        .get(users.getUser);

    app.route('/users/:user_id/follow')
        .post(auth.isAuthenticated, users.followUser)
        .delete(auth.isAuthenticated, users.unfollowUser);

    app.route('/search')
        .get(users.searchUsers)
};