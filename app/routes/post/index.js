const router = require('express').Router()

var Post = require('../../models/post/post');

function getPosts(req, res){
    
    var perPage = Math.abs(req.query.count) || 5,
        pageValue = Math.abs(req.query.page) || 1,
        headerValue = []

    Post.find()
        .limit(perPage)
        .skip((pageValue - 1) * perPage)
        .sort({
            _id: 'desc'
        })
        .exec(function(err, posts) {
            Post.count().exec(function(err, count) {
                res.json({
                    rows: posts,
                    header: headerValue,
                    pagination: { 
                        count: perPage,
                        page: pageValue,
                        pages: Math.ceil(count/perPage),
                        size: count
                    },
                    
                    sort_by: '_id',
                    sort_order: 'dsc'
                });
            })
        })
};

// get all posts
router.get('/allposts', function (req, res) {
    getPosts(req, res);
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

        getPosts(req, res);
    });

});

module.exports = router