var express = require('express');
var rp = require('request-promise');
var co = require('co');
var router = express.Router();

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

    var response = yield rp(options);
    res.render('index', response);
    // res.render('index', {
    //   title: 'Hello, ECT!',
    //   metas: [{
    //     property: 'og:title',
    //     contents: '「Love Letter To Chopin」 Release Tour | RYO SONODA Piano Trio, The Longing'
    //   }, {
    //     property: 'og:type',
    //     contents: 'website'
    //   }, {
    //     property: 'og:site_name',
    //     contents: '「Love Letter To Chopin」 Release Tour | RYO SONODA Piano Trio, The Longing'
    //   }, {
    //     property: 'og:image',
    //     contents: 'http://static.tumblr.com/trjt0cv/rkFnvac6r/tour2015_ogp.jpg'
    //   }, {
    //     property: 'fg:app_id',
    //     contents: '167032296969125'
    //   }, {
    //     property: 'og:url',
    //     contents: 'http://sonodaryo.com/love-letter-to-chopin'
    //   }, {
    //     property: 'og:description',
    //     contents: 'クラシックの名曲を大胆な解釈でアレンジした、自身初のピアノトリオアルバム「Love Letter To Chopin」リリース記念ツアーが決定！'
    //   }],
    //   links: [{
    //     url: '//static.tumblr.com/trjt0cv/okvnebj55/normalize.css',
    //     rel: 'stylesheet'
    //   }, {
    //     url: '//static.tumblr.com/trjt0cv/7hFnebnif/owl.carousel.css',
    //     rel: 'stylesheet',
    //     type: 'text/css'
    //   }, {
    //     url: 'http://static.tumblr.com/trjt0cv/sbEnvbntv/style.css',
    //     rel: 'stylesheet'
    //   }]
    // });
  }).catch(function(error) {
    next(error);
  });

});

module.exports = router;
