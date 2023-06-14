var express = require('express');
var router = express.Router();

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

/* POST contact form submission. */
router.post('/', function(req, res, next) {
    // Handle the form submission here
    console.log(req.body);
    
    // After you've processed the form data, render the confirmation page
    // Notice the additional 'title' property in the object
    res.render('confirmation', { 
      title: 'Confirmation', 
      message: 'Thanks for your message! We will get back to you soon.' 
    });
  });

module.exports = router;
