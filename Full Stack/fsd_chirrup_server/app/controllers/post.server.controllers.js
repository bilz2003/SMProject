const posts = require('../models/posts.server.models');
const Joi = require('joi')
const users = require('../models/user.server.models')

const add_post = (req, res) => {

        const schema = Joi.object({
            text: Joi.string().required()
        })

        const { error } = schema.validate(req.body);
        if (error) return res.sendStatus(400);

        let post = Object.assign({}, req.body);

        posts.addNewPost(post, (err, id) => {
            if (err) {
                return res.sendStatus(500);
            }
            else {
                console.log(id.user_id)
                return res.status(201).send({ post_id: id })
                
            }
        })
};

const get_post = (req, res) => {
    let post_id = parseInt(req.params.post_id);

    posts.getSinglePost(post_id, (err, result) => {
        if (err === 404) return res.sendStatus(404)
        if (err) return res.sendStatus(500)

        return res.status(200).send(result)
    })
};

const update_post = (req, res) => {
    let post_id = parseInt(req.params.post_id);

    let token = req.get('X-Auhtorization');
    users.getIdFromToken(token, function (err, id) {
        if (err) {
            return res.sendStatus(500);
        }

        posts.getSinglePost(post_id, (err, post) => {
            if (err === 404) return res.sendStatus(404)
            if (err) return res.sendStatus(500);

            const schema = Joi.object({
                'text': Joi.string().required()
            })

            const { error } = schema.validate(req.body);
            if (error) return res.status(400).send({ 'error_message': error.details[0].message });

            posts.updatePost(post_id, req.body.text, (err) => {
                if (err) return res.sendStatus(500);
                return res.sendStatus(200);
            })
        })
    })
};

const delete_post = (req, res) => {
    let post_id = parseInt(req.params.post_id);

    posts.getSinglePost(post_id, (err) => {
        if (err === 404) return res.sendStatus(404)
        if (err) return res.sendStatus(500)

        posts.deletePost(post_id, (err) => {
            if (err) {
                return res.sendStatus(400);
            }
            else {
                return res.sendStatus(200);
            }
        })
    })
};

const add_like = (req, res) => {
    let post_id = parseInt(req.params.post_id);
    console.log(post_id)

    let token = req.get('X-Authorization');
    users.getIdFromToken(token, function (err, id) {
        if (err) {
            return res.sendStatus(500);
        }

        posts.getSinglePost(post_id, (err) => {
            if (err === 404) {
                return res.sendStatus(404)
            }
            if (err) return res.sendStatus(500)

            posts.likePost(post_id, id, function (err) {
                if (err) {
                    return res.sendStatus(400);
                }
                else {
                    return res.sendStatus(200);
                }
            })
        })
    })
};

const remove_like = (req, res) => {
    let post_id = parseInt(req.params.post_id);

    let token = req.get('X-Authorization');
    users.getIdFromToken(token, function (err, id) {
        if (err) {
            return res.sendStatus(500);
        }

        posts.getSinglePost(post_id, (err) => {
            if (err === 404) return res.sendStatus(404)
            if (err) return res.sendStatus(500)

            posts.unlikePost(post_id, id, function (err) {
                if (err) {
                    return res.sendStatus(400);
                }
                else {
                    return res.sendStatus(200);
                }
            })
        })
    })
};

module.exports = {
    add_post: add_post,
    get_post: get_post,
    update_post: update_post,
    delete_post: delete_post,
    add_like: add_like,
    remove_like: remove_like,
};
