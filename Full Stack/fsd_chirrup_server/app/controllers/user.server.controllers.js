const users = require('../models/user.server.models')

const login = (req,res) =>{
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send({'error_message': 'Invalid Credentials'});

    users.authenticateUser(req.body.username, req.body.password,(err, id) =>{
        if(err === 404) return res.status(400).send({'error_message': 'Invalid email/password'})
        if (err) return res.sendStatus(500)
    
        users.getToken(id, (err, token) => {
            if(err) return res.sendStatus(500)
    
            if(token){
                return res.status(200).send({user_id: id, session_token: token})
            }
            else{
                users.setToken(id, (err,token) => {
                    if(err) return res.sendStatus(500)
                    return res.status(200).send({user_id: id, session_token: token})
                })
            }
        })
    })
}

const logout = (req,res) =>{
    let token = req.get('X-Authorization');

    users.removeToken(token,(err) => {
        if(err){
            return res.sendStatus(401);
        }
        else{
            return res.sendStatus(200);
        }
    });
}

const Joi = require('joi');

const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)

const createUser = (req,res) => {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().pattern(regex).required() // Example: minimum 6 characters
    // You can add more rules to password for complexity, like regex for including numbers, uppercase letters, etc.
    });

    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send({'error_message':error.details[0].message});
    let user = Object.assign({}, req.body);

    users.addNewUser(user, (err,id) => {
        if(err === 400){
            return res.status(400).send({'error_message': 'User exists'});
        }
        else if(err) {
            return res.sendStatus(500);
        }
        else{ return res.status(201).send({user_id:id});
        }
    })
}

module.exports = {
    createUser: createUser,
    login:login,
    logout:logout
}
