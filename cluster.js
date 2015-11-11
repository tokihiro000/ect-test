var cluster = require('cluster');
var numOfCpu = require('os').cpus().length;

if (cluster.isMaster) {
  for (var i = 0; i < numOfCpu; i++) {
    var worker = cluster.fork();
    cluster.on('exit', function(worker, code, signal) {
      console.log('worker ' + worker.process.pid + ' died');
      // プロセスが死んだら作り直す
      cluster.fork();
    });
    console.log(i);
  }
} else {
  //ここにエントリーポイントとなるファイルを指定する。
  require("./bin/www");
}
