var tm = require('thoonk');

var Posts = function (thoonk) {
    tm.ThoonkBaseInterface.call(this, thoonk);
};

// inherit from base object
Posts.prototype = Object.create(tm.ThoonkBaseInterface.prototype);
Posts.prototype.objtype = 'post';
Posts.prototype.scriptdir = __dirname + '/scripts';
Posts.prototype.event_content_type = 'json';
Posts.prototype.version = '1';


(function () {
    this.createPost = function (author, title, body, cb) {
        this.runscript('createPost', [author, title, body, Date.now().toString()], cb);
    };

    this.getPosts = function (cb) {
        this.runscript('getPosts', [], cb);
    };

    this.commentOnPost = function (postId, author, comment, cb) {
        this.runscript('commentOnPost', [postId, author, comment, Date.now().toString()], cb);
    };

    this.getPostAndComments = function (postId, cb) {
        this.runscript('getPostAndComments', [postId], cb);
    };

}).call(Posts.prototype);

module.exports = Posts;