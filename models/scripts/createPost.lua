local author, title, body, time = unpack(ARGV);

if #author == 0 or #title == 0 or #body == 0 then
    return {'Must have an author, title and body'};
end

-- get a new id
local id = redis.call('incr', 'posts:cid');

redis.call('SET', 'postattributes:'..id, cjson.encode({
    author = author, 
    title = title, 
    body = body,
    id = id
}));

redis.call('ZADD', 'posts', time, id);

return {false, {id = id, success = true}};