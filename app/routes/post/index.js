const router = require('express').Router()

var Post = require('../../models/post/post');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

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
router.get('/allposts', auth, function (req, res) {
    getPosts(req, res);
});

// create post
router.post('/createpost', auth, function (req, res, next) {
    /*
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
    */
    var post = new Post(req.body);
    post.user = req.payload._id;

    post.save(function(err, post){
        if(err){ return next(err); }

        getPosts(req, res);
    });

});

router.get('/:post_id', function (req, res) {

    Post.findOne({
        _id: req.params.post_id
    }, function (err, post) {
        if (err)
            return res.json({result:0, data:[]});

        return res.json({result:1, data:post});
        
    });
});

module.exports = router