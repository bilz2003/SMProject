const crypto = require('crypto');
const db = require('../../database')

const addNewUser = (user, done) => {
    const salt = crypto.randomBytes(64);
    const hash = getHash(user.password, salt);

    const sql = 'INSERT INTO users (first_name, last_name, username, password, salt) VALUES (?,?,?,?,?)'
    let values = [user.first_name, user.last_name, user.username, hash, salt.toString('hex')];

    db.run(sql, values, function (err) {
        if (err) return done(err);
        return done(null, this.lastID)
    })
};

const getHash = function (password, salt) {
    return crypto.pbkdf2Sync(password, salt, 100000, 256, 'sha256').toString('hex');
};

const authenticateUser = (username, password, done) => {
    const sql = 'SELECT user_id, password, salt FROM users WHERE username=?'

    db.get(sql, [username], (err, row) => {
        if (err) return done(err)
        if (!row) return done(404)

        if (row.salt === null) row.salt = ''

        let salt = Buffer.from(row.salt, 'hex')

        if (row.password === getHash(password, salt)) {
            return done(false, row.user_id)
        }
        else {
            return done(404)
        }
    })
};

const getIdFromToken = (token, done) => {
    const sql = 'SELECT user_id FROM users WHERE session_token=?'

        db.get(sql, [token], (err, row) => {
            if (err) return done(err, null);
            if (row) return done(null, row.user_id);

            return done(err, null);
        });
};

const setToken = (id, done) => {
    let token = crypto.randomBytes(16).toString('hex');

    const sql = 'UPDATE users SET session_token=? WHERE user_id=?'

    db.run(sql, [token, id], (err) => {
        return done(err, token)
    })
}

const getToken = function (id, done) {
    const sql = 'SELECT session_token FROM users WHERE user_id=?'
    db.get(sql, [id], function (err, row) {
        if (row && row.session_token) {
            return done(null, row.session_token);
        }
        else {
            return done(err);
        }
    })
}

const removeToken = (token, done) => {
    const sql = 'UPDATE users SET session_token=null WHERE session_token=?'

    db.run(sql, [token], (err) => {
        return done(err)
    })
}

module.exports = {
    addNewUser: addNewUser,
    getHash: getHash,
    authenticateUser: authenticateUser,
    getIdFromToken: getIdFromToken,
    setToken: setToken,
    removeToken: removeToken,
    getToken: getToken
}