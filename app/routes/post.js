var express = require('express')
var router = express.Router()

var Post = require('../models/post/post');

function getPosts(res){
    Post.find(function (err, posts) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(posts); // return all posts in JSON format
    });
};

// get all todos
router.get('/allposts-list', function (req, res) {
    // use mongoose to get all posts in the database
    getPosts(res);
});

// create post
router.post('/createpost', function (req, res) {

    // create a todo, information comes from AJAX request from Angular
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