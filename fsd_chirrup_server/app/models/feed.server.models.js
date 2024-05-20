
const db = require('../../database');
const getFeedForUser= (callback) => {
    const publicFeedQuery = `
        SELECT 
            posts.post_id, 
            posts.text, 
            posts.date_published, 
            posts.author_id, 
            users.first_name, 
            users.last_name 
        FROM posts
        INNER JOIN users ON posts.author_id = users.user_id
        ORDER BY posts.date_published DESC
        LIMIT 50
    `;

    db.all(publicFeedQuery, [], (err, rows) => {
        if (err) {
            callback(err);
        } else {
            callback(null, rows);
        }
    });
};


module.exports = {
    
    getFeedForUser
};
