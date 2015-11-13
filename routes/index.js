var express = require('express');
var rp = require('request-promise');
var bodyParser = require('body-parser');
var co = require('co');
var memcache = require('../util/memcache.js');
var router = express.Router();

var userDao = require('../dao/userDao.js');
var itemDao = require('../dao/itemDao.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res, next) {
  co(function*() {
    var options = {
      uri: 'http://localhost:4000',
      headers: {
        'Content-Type': 'application/json',
      },
      json: true
    };

    console.log('This process is pid ' + process.pid);
    var response = yield rp(options);
    res.render('index', response);

  }).catch(function(error) {
    next(error);
  });
});
router.get('/user/:id', function(req, res, next) {
  co(function*() {

    // DBにアクセス
    var response = yield userDao.findByUserId(req.params.id);
    // フレンド情報を配列に格納
    var friendsListStr = response[0].userFriends;
    var friendsListArray = friendsListStr.split(',');
    response.userFriends = friendsListArray;

    res.render('user', response[0]);

  }).catch(function(error) {
    next(error);
  });
});
router.get('/item/:id', function(req, res, next) {
  co(function*() {

    // DBにアクセス
    var response = yield itemDao.findByItemId(req.params.id);
    // フレンド情報を配列に格納
    var friendsListStr = response[0].item_tags;
    var friendsListArray = friendsListStr.split(',');
    response.item_tags = friendsListArray;

    res.render('item', response);

  }).catch(function(error) {
    next(error);
  });
});
router.get('/post', function(req, res, next) {
  co(function*() {
    var options = {
      uri: 'http://localhost:4000/review',
      headers: {
        'Content-Type': 'application/json',
      },
      json: true
    };

    var response = yield rp(options);
    res.render('review', response);

  }).catch(function(error) {
    next(error);
  });
});

router.get('/get', function(req, res, next) {
  try {
    if (req.query) {
      var obj = req.query;
      Object.keys(obj).forEach(function(key) {
        console.log(key + " : " + obj[key]);
      });
    }
    res.send('get')
  } catch (error) {
    next(error);
  }
});

router.post('/post/:id', function(req, res, next) {
  try {
    if (req.body) {
      console.log('req.body: '+ req.body.test);
      var obj = req.body;
      Object.keys(obj).forEach(function(key) {
        console.log(key + " : " + obj[key]);
      });
    }
    res.send('post: ' + req.body);
  } catch (error) {
    next(error)
  }
});

router.put('/put', function(req, res, next) {
  try {
    if (req.body) {
      var obj = req.body;
      Object.keys(obj).forEach(function(key) {
        console.log(key + " : " + obj[key]);
      });
    }
    res.send('put');
  } catch (error) {
    next(error)
  }
});

router.delete('/delete', function(req, res, next) {
  try {
    if (req.body) {
      var obj = req.body;
      Object.keys(obj).forEach(function(key) {
        console.log(key + " : " + obj[key]);
      });
    }
    res.send('delete');
  } catch (error) {
    next(error)
  }
});

router.post('/param/:id/add', function(req, res, next) {
  try {
    if (req.body) {
      var obj = req.body;
      Object.keys(obj).forEach(function(key) {
        console.log(key + " : " + obj[key]);
      });
    }
    res.send('/param/:id/add: [id] = ' + req.params.id);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
