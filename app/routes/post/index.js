const router = require('express').Router()

var Post = require('../../models/post/post');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

function getPosts(req, res, next){
    
    var perPage = Math.abs(req.query.count) || 5,
        pageValue = Math.abs(req.query.page) || 1,
        headerValue = [],
        query = {'user':req.payload._id, 'status':true}

    Post.find(query)
        .limit(perPage)
        .skip((pageValue - 1) * perPage)
        .sort({
            _id: 'desc'
        })
        .exec(function(err, posts) {

            if(err) { return next(err); }
            Post.count(query).exec(function(err, count) {
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
router.get('/allposts', auth, function (req, res, next) {
    getPosts(req, res, next);
});

// create post
router.post('/createpost', auth, function (req, res, next) {
    var post = new Post(req.body);
    post.user = req.payload._id;

    post.save(function(err, post) {
        if(err) { return next(err); }

        getPosts(req, res, next);
    });
});

// update post
router.post('/updatepost', auth, function (req, res, next) {
    
    var query = {'_id':req.body._id};
    var payload = {
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    };

    Post.findOneAndUpdate(query, payload, {new:true}, function (err, post) {
        if(err) { return next(err); }

        return res.json({result:1, post:post});
    });
});

router.get('/dashboard', function (req, res, next) {
    var perPage = Math.abs(req.query.count) || 5,
        pageValue = Math.abs(req.query.page) || 1,
        headerValue = [],
        query = {'status':true}

    Post.find(query)
        .limit(perPage)
        .skip((pageValue - 1) * perPage)
        .sort({
            _id: 'desc'
        })
        .exec(function(err, posts) {

            if(err) { return next(err); }
            Post.count(query).exec(function(err, count) {
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
});

router.get('/edit/:post_id', function (req, res, next) {

    Post.findOne({
        _id: req.params.post_id
    }, function (err, post) {
        if(err) { return next(err); }
        return res.json({result:1, post:post});
    });
});

router.use(function (err, req, res, next) {
  if (err.status === 401) {
    res.status(401).json({ result:0, statusMsg:'Invalid Token Expire'});
  } else if (err.status === 400) {
    res.status(400).json({ result:0, statusMsg:'Bad request'});
  } else {
    res.status(403).json({ result:0, statusMsg:'Forbidden request'});
  }
});

module.exports = router
