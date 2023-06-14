var express = require('express');
var router = express.Router();

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

/* POST contact form submission. */
router.post('/', function(req, res, next) {
    // Extract form fields
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const message = req.body.message;

    // Handle the form submission here
    console.log("First Name: ", firstName);
    console.log("Last Name: ", lastName);
    console.log("Phone Number: ", phoneNumber);
    console.log("Email: ", email);
    console.log("Message: ", message);

    // After you've processed the form data, render the confirmation page
    // Notice the additional 'title' property in the object
    res.render('confirmation', { 
      title: 'Confirmation', 
      message: 'Thanks for your message! We will get back to you soon.' 
    });
});

module.exports = router;
