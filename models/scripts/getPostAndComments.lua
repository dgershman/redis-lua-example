local postId = ARGV[1];
local post = redis.call('GET', 'postattributes:'..postId);
local comments = {};

if post then
    local decoded = cjson.decode(post);

    -- loop through our objects and get our json blobs for each comment
    for index, value in ipairs(redis.call('ZRANGE', 'post:'..postId..':comments', 0, -1)) do
        table.insert(comments, cjson.decode(redis.call('GET', 'post:'..postId..':comments:'..value)));
    end

    return {false, cjson.encode({post = decoded, comments = comments})};
else
    return {'Could not find post'};
end