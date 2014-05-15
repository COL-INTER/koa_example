
var koa = require('koa');

var app = koa();
app.use(function *() {

  this.body = 'Hello World!';
});
console.log('start app');
app.listen(8888);
 