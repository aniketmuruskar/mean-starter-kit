const router = require('express').Router()

var Post = require('../../models/post/post');

function getPosts(res){
    Post.find(function (err, posts) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(posts); // return all posts in JSON format
    });
};

// get all posts
router.get('/allposts', function (req, res) {
    getPosts(res);
});

// create post
router.post('/createpost', function (req, res) {
    
    Post.create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        status: req.body.status
    }, function (err) {
        if (err)
            res.send(err);

        getPosts(res);
    });

});

module.exports = router