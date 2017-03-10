const router = require('express').Router()

var Post = require('../../models/post/post');

function getPosts(res){
    
    var skipValue = 0;
    var limitValue = 5;

    Post.find()
        .limit(limitValue)
        .skip(skipValue)
        .sort({
            _id: 'desc'
        })
        .exec(function(err, posts) {
            Post.count().exec(function(err, count) {
                res.json({
                    rows: posts,
                    page: 1,
                    pages: 6,
                    total: count
                });
            })
        })
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