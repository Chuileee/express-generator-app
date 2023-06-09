var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome ' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home' });
});
/* GET about us page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});
/* GET home page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});
/* GET home page. */
router.get('/project', function(req, res, next) {
  res.render('project', { title: 'Project' });
});
/* GET home page. */
router.get('/service', function(req, res, next) {
  res.render('service', { title: 'Service' });
});

module.exports = router;
