var cluster = require('cluster');
var numOfCpu = require('os').cpus().length;
var memcache = require('./util/memcache.js');
var co = require('co');


if (cluster.isMaster) {
  co(function*() {
    // プロセスが死んだら作り直す
    cluster.on('exit', function(worker, code, signal) {
      console.log('worker ' + worker.process.pid + ' died');
      cluster.fork();
    });

    // memcache に接続
    yield memcache.init();
    // memcache test
    yield memcache.set("key", "jowjeoiajfoijo");

    for (var i = 0; i < numOfCpu; i++) {
      var worker = cluster.fork();
      console.log(i);
    }
  }).catch(function(error) {
    console.error(error);
  });

} else {
  //ここにエントリーポイントとなるファイルを指定する。
  require("./bin/www");
}
