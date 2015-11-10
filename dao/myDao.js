var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'totec',
  password: 'totec',
  database : 'piyo_db'
});

var myDao = function() {
  this.init = function() {
    return new Promise(function(resolve, rejecrt) {
      connection.connect(function(err) {
        if (err) {
          throw err;
        }
        console.log('connected as id ' + connection.threadId);
        resolve();
      });
    }).catch(function(error) {
      console.error('error connecting: ' + error.stack);
      reject(error)
    });
  }

  this.findAll = function(callback) {
    connection.query('SELECT * FROM `books` WHERE `author` = "David"', function(error, results, fields) {
      if (error) {
        callback(error, null, null);
      }

    });
  }
}

// var co = require('co');
// var dao = new myDao();
// co(function*() {
//   console.log(1);
//   yield dao.init();
//   console.log(2);
// }).catch(function(error) {
//   console.log(error);
// })

module.exports = new myDao();
