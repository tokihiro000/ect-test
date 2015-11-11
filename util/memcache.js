var mc = require('memcache');
var client = new mc.Client(11211, 'localhost');

var memcache = function() {
  this.init = function() {
    return new Promise(function(resolve, reject) {
      client.on('close', function() {
        // no arguments - connection has been closed
        console.log('close');
        reject(new Error('memcache close'));
      });

      client.on('timeout', function() {
        // no arguments - socket timed out
        console.log('timeout');
        reject(new Error('memcache timeout'));
      });

      client.on('error', function(error) {
        // there was an error - exception is 1st argument
        console.log("error");
        reject(error);
      });

      client.on('connect', function() {
        // no arguments - we've connected
        resolve();
      });

      // 接続開始
      client.connect();
    });
  }

  this.set = function(key, value) {
    return new Promise(function(resolve, reject) {
      client.set(key, value, function(err, res) {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  this.get = function(key) {
    return new Promise(function(resolve, reject){
      client.get(key, function(err, val){
        if(err) {
          reject(err);
        }

        resolve(val);
      });
    });
  }
}

module.exports = new memcache();
