'use strict';

var path = require('path');
var fs = require('fs');
var os = require('os');
var mkdirp = require('mkdirp');
var copy = require('copy-to');

fs.existsSync = fs.existsSync || path.existsSync;
var version = require('../package.json').version;

var root = path.dirname(__dirname);

var config = {
  version: version,
  serverPort: 8888,
  bindingHost: '127.0.0.1', // only binding on 127.0.0.1 for local access
  enableCluster: false,
  numCPUs: os.cpus().length,
  debug: true, // if debug
  logdir: path.join(root,'logs'),
  viewCache: false,

  sessionSecret: 'test session secret',
  jsonLimit: '10mb', // max request json body size
  uploadDir: path.join(root, '.dist'),
  redis: {
    // host: 'pub-redis-19533.us-east-1-4.3.ec2.garantiadata.com',
    // port: 19533,
    // pass: 'cnpmjs_dev'
  }
};

// load config/config.js, everything in config.js will cover the same key in index.js
var customConfig = path.join(root, 'config/config.js');
if (fs.existsSync(customConfig)) {
  copy(require(customConfig)).override(config);
}

mkdirp.sync(config.logdir);
mkdirp.sync(config.uploadDir);

module.exports = config;

config.loadConfig = function (customConfig) {
  if (!customConfig) {
    return;
  }
  copy(customConfig).override(config);
};