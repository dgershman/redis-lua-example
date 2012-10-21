var express = require('express'),
    semiStatic = require('semi-static'),
    thoonk = require('thoonk').createClient(),
    Post = require('./models/post'),
    config = require('getconfig');

// here's where we'll hold our initted thoonk interface
var postsGateway;

// set up thoonk interface
thoonk.registerInterface('Post', Post, function () {
    postsGateway = thoonk.objects.Post();
});

// developing without invalid cert complaints is just easier
var app = express();
  
app.configure(function () {
    app.use(express['static'](__dirname + '/public'));
    app.use(express.bodyParser());
});

// use jade
app.set('view engine', 'jade');

// app stuff
app.get('/', function (req, res) {
    postsGateway.getPosts(function (err, posts) {
        res.render('index', {posts: JSON.parse(posts)});
    });
});
app.post('/post', function (req, res) {
    postsGateway.createPost(req.body.author, req.body.title, req.body.body, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/');
        }
    });
});
app.post('/post/:id/comment', function (req, res) {
    postsGateway.commentOnPost(req.params.id, req.body.author, req.body.comment, function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/post/' + req.params.id);
        }
    });
});
app.get('/post/:id', function (req, res) {
    postsGateway.getPostAndComments(req.params.id, function (err, result) {
        var parsed,
            commentsArr;
        if (err) {
            res.send(err);
        } else {
            parsed = JSON.parse(result);
            commentsArr = (parsed.comments.length) ? parsed.comments : [];
            res.render('postDetail', {post: parsed.post, comments: commentsArr});
        }
    });
});

app.get('/*', semiStatic());

app.listen(config.http.port);
console.log('node server running on port: ' + config.http.port);
