-- get all our ids
local ids = redis.call('ZRANGE', 'posts', 0, -1);
local result = {};

-- loop through our objects and get our json blobs for each post
for index, value in ipairs(ids) do
    table.insert(result, cjson.decode(redis.call('GET', 'postattributes:'..value)));
end

-- error first for each checking
return {false, cjson.encode(result)};