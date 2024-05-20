const social = require('../models/social.server.models')

const db = require('../../database')
const users = require('../models/user.server.models')

const followUser = (req, res) => {

    let user_id = parseInt(req.params.user_id);

    let token = req.get('X-Authorization');
    users.getIdFromToken(token, function (err, id) {
        if (err) {
            return res.sendStatus(500);
        }

        social.getUserProfile(user_id, (err) => {
            if (err === 404) {
                return res.sendStatus(404)
            }
            if (err) return res.sendStatus(500)

            social.addFollow(id, user_id, function (err) {
                if (err) {
                    return res.sendStatus(400);
                }
                else {
                    return res.status(200).send({ message: 'User followed' });
                }
            })
        })
    })
};


const unfollowUser = (req, res) => {

    let user_id = parseInt(req.params.user_id);

    let token = req.get('X-Authorization');
    users.getIdFromToken(token, function (err, id) {
        if (err) {
            return res.sendStatus(500);
        }

        social.getUserProfile(user_id, (err) => {
            if (err === 404) {
                return res.sendStatus(404)
            }
            if (err) return res.sendStatus(500)

            social.removeFollow(id, user_id, function (err) {
                if (err) {
                    return res.sendStatus(400);
                }
                else {
                    return res.status(200).send({ message: 'User Unfollowed' });
            }
        })
    })
})

};

const getUser = (req, res) => {
    let user_id = parseInt(req.params.user_id);

    social.getUserProfile(user_id, (err, result) => {
        if (err === 404) return res.sendStatus(404)
        if (err) return res.sendStatus(500)

        return res.status(200).send(result)
    })
};

const searchUsers = (req, res) => {
    let q = req.query.q // Assuming you're passing the search term as a query parameter

    if (!q) {
        return res.status(400).send("Search term is required.");
    }

    social.searchUsers(q, (err, result) => {
        if (err) return res.sendStatus(500); // Internal Server Error

        return res.status(200).send(result); // Send the result back to the client
    });
};


module.exports = {
    followUser: followUser,
    unfollowUser: unfollowUser,
    getUser: getUser,
    searchUsers:searchUsers
};