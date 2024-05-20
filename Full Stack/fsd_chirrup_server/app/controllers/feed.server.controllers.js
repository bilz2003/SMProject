const feed = require('../models/feed.server.models');
const feeds=(req,res)=>{
    
    feed.getFeedForUser( (err, feed) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json(feed);
        }
    });
}

module.exports={
    feeds:feeds
}