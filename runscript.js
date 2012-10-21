#!/usr/bin/env node
var fs = require('fs'),
    redis = require('redis'),
    argv = require('optimist').usage("$0 filename.lua [#keys] [arg1] ...")
            .describe('d', 'show redis client debug')
            .demand(1).argv;
    client = redis.createClient('6379', '127.0.0.1');

if (argv.d) {
    redis.debug_mode = true;
}

var script = fs.readFileSync(argv._[0]);
argv._[0] = script.toString();

if (argv._.length === 1) {
    argv._.push(0);
}

client.send_command('EVAL', argv._, function (err, reply) {
    console.log(arguments);
    process.exit();
});

