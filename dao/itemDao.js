var mysql = require('mysql');
var connection = mysql.createConnection({
  host: '172.30.2.114',
  user: 'root',
  database : 'totec'
});

var itemDao = function() {

 this.findByItemId = function(id) {
    return new Promise(function(resolve, reject) {
      connection.query('SELECT * FROM items WHERE item_id = ' + id, function(error, results, fields) {
        if (error) {
          reject(error);
        }

        resolve(results);
      });
    });
  }
}

// var co = require('co');
// var dao = new myDao();
// co(function*() {
//   console.log(1);
 //  yield dao.init();
//   console.log(2);
// }).catch(function(error) {
//   console.log(error);
// })

module.exports = new itemDao();
