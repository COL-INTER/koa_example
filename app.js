var path = require('path');
var koa = require('koa');
var http = require('http');
var moment = require('moment');
var config = require('./config');
var middlewares = require('koa-middlewares');
var app = koa();

var rootdir = path.dirname(__dirname);

app.use(middlewares.rt({headerName: 'X-ReadTime'}));

app.use(middlewares.rewrite('/favicon.ico', '/public/favicon.ico'));

app.use(middlewares.staticCache(path.join(__dirname, 'public'), {
  buffer: !config.debug,
  maxAge: config.debug ? 0 : 60 * 60 * 24 * 7,
  dir: path.join(rootdir, 'public')
}));

app.keys = ['todokey', config.sessionSecret];
app.outputErrors = true;
app.proxy = true;

app.use(function *() {

  this.body = 'Hello World!';
});
console.log('start app');
app.listen(8888);
\