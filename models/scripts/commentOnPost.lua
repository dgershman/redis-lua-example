local postId, author, comment, time = unpack(ARGV);
local post = redis.call('GET', 'postattributes:'..postId);

if not post then
    return {'Couldn\'t find the post'};
end

if #author == 0 or #comment == 0 then
    return {'Comments must have an author and comment'};
end

-- get a new id
local id = redis.call('incr', 'post:'..postId..':comments:cid');

redis.call('SET', 'post:'..postId..':comments:'..id, cjson.encode({
    author = author, 
    comment = comment
}));

redis.call('ZADD', 'post:'..postId..':comments', time, id);

return {false, cjson.encode({success = true})};