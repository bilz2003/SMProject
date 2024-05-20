const { query } = require('express');
const db = require('../../database')

const isAlreadyFollowing = (user_id, following_Id, done) => {
    const sql = 'SELECT * FROM followers WHERE following_id = ? AND user_id = ?';
    db.get(sql, [user_id, following_Id], (err, row) => {
        if (err) return done(err);
    });
};

const removeFollow = (user_id, followed_id, done) => {
    const sql = 'DELETE FROM followers WHERE user_id = ? AND follower_id = ?';
    db.run(sql, [user_id, followed_id], (err) => {
        return done(err);
    });
};

const addFollow = (user_id, followed_id, done) => {
    const sql = 'INSERT INTO followers (user_id, follower_id) VALUES (?, ?)';
    db.run(sql, [user_id, followed_id], (err) => {
            return done(err);
    });
};

const getUserProfile = (id, done) => {
    const queryUserInfo = `SELECT u.user_id, u.first_name, u.last_name, u.username, p.post_id, p.date_published, p.text
             FROM users u
             LEFT JOIN posts p ON u.user_id=p.author_id
             WHERE u.user_id=?`;

    db.get(queryUserInfo, [id], (error, userDetails) => {
        if (error) {
            return done(error); // database error
        }
        if (!userDetails) {
            return done(404); // user not found exist
        }

        // Queries to get user interactions
        const queryUserLikes = `SELECT u.user_id, u.first_name, u.last_name, u.username
                        FROM users u, likes l
                        WHERE l.post_id=?
                        AND l.user_id=u.user_id`;

        const queryUserFollowing = `SELECT u.user_id, u.first_name, u.last_name, u.username
                        FROM users u, followers f
                        WHERE f.user_id=?
                        AND f.follower_id=u.user_id`;

        const queryUserFollowers = `SELECT u.user_id, u.first_name, u.last_name, u.username
                        FROM users u, followers f
                        WHERE f.follower_id=?
                        AND f.user_id = u.user_id`;

        // Arrays to store interactions
        const userFollowers = [];
        const userFollowing = [];
        const userLikes = [];

        // Fetching following details
        db.each(
            queryUserFollowing,
            [userDetails.user_id],
            (error, record) => {
                if (error) return done(error);

                userFollowing.push({
                    user_id: record.user_id,
                    first_name: record.first_name,
                    last_name: record.last_name,
                    username: record.username
                })
            },
            () => {
                // Fetching followers details
                db.each(
                    queryUserFollowers,
                    [userDetails.user_id],
                    (error, record) => {
                        if (error) return done(error);

                        userFollowers.push({
                            user_id: record.user_id,
                            first_name: record.first_name,
                            last_name: record.last_name,
                            username: record.username
                        })
                    },

                    () => {
                        // Fetching likes details
                        db.each(
                            queryUserLikes,
                            [userDetails.post_id],
                            (error, record) => {
                                if (error) return done(error);

                                userLikes.push({
                                    user_id: record.user_id,
                                    first_name: record.first_name,
                                    last_name: record.last_name,
                                    username: record.username
                                })
                            },
                            (error, numberOfRows) => {
                                if (error) return done(error);

                                return done(null, {
                                    user_id: userDetails.user_id,
                                    first_name: userDetails.first_name,
                                    last_name: userDetails.last_name,
                                    username: userDetails.username,
                                    followers: userFollowers,
                                    following: userFollowing,
                                    posts: {
                                        post_id: userDetails.post_id,
                                        timestamp: userDetails.date_published,
                                        text: userDetails.text,
                                        author: {
                                            user_id: userDetails.user_id,
                                            first_name: userDetails.first_name,
                                            last_name: userDetails.last_name,
                                            username: userDetails.username
                                        }
                                    },
                                    likes: userLikes
                                })
                            }
                        )
                    }
                )
            }
        )
    })
}

const searchUsers = (searchTerm, done) => {
    // Define the SQL query. Use '%' wildcards for partial matching.
    const sql = `
        SELECT user_id, first_name, last_name, username 
        FROM users 
        WHERE username LIKE ? OR first_name LIKE ? OR last_name LIKE ?`;

    // Use '%' to search for any records that contain the searchTerm.
    const searchTermWithWildcards = `%${searchTerm}%`;

    // Execute the SQL query.
    db.all(sql, [searchTermWithWildcards, searchTermWithWildcards, searchTermWithWildcards], (err, rows) => {
        if (err) {
            return done(err);
        }
        return done(null, rows);
    });
};


module.exports ={
    isAlreadyFollowing:isAlreadyFollowing,
    addFollow:addFollow,
    getUserProfile: getUserProfile,
    removeFollow:removeFollow,
    searchUsers:searchUsers
}