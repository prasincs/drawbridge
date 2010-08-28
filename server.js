require.paths.push('/home/node/.node_libraries');
var express = require('express'),
    server = express.createServer(
    	express.logger(),
	express.bodyDecoder()
    ),
    app = require('./app');

server.get('/', function(req,res) {
	res.sendfile('/home/node/views/test.html');
});

server.get('/public/:path', function(req,res) {
	res.sendfile(__dirname+'/public/'+req.params.path);
});

server.get('/drawing', function(req,res){
	res.sendfile(__dirname+'/public/drawing.html');
});

server.get('/boo', function(req,res){
	res.send(__dirname);
});

server.listen(80);
