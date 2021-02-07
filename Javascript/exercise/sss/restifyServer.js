var restify = require('restify');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
// handling uncaught exceptions
server.on('uncaughtException', function (request, response, route, error, cb) {
  logger.error('[Server] Internal error (uncaughtException)',
    {error: error.stack});
  console.log(error);
  // Policy for uncaughtExceptions. Exit inmediately.
  process.exit(1);
});