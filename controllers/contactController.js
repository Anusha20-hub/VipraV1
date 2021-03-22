/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');
router.get('/', (_req, res) => {
  res.render('contact/addOrEdit', {

    viewTitle: 'Insert Contact',

  });
});
router.post('/', (req, res) => {
  if (req.body._id == '') {
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }
});

// eslint-disable-next-line require-jsdoc
function insertRecord(req, res) {
  const contact = new Contact();

  contact.name = req.body.name;

  contact.email = req.body.email;

  contact.mobile = req.body.mobile;

  contact.save((err, _doc) => {
    if (!err) {
      res.redirect('contact/list');
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);

        res.render('contact/addOrEdit', {

          viewTitle: 'Insert Contact',

          contact: req.body,

        });
      } else {
        console.log('Error during record insertion : ' + err);
      }
    }
  });
}
function updateRecord(req, res) {
  Contact.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, _doc) => {
    if (!err) {
      res.redirect('contact/list');
    } else {
      if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);

        res.render('contact/addOrEdit', {

          viewTitle: 'Update Contact',

          contact: req.body,

        });
      } else {
        console.log('Error during record update : ' + err);
      }
    }
  });
}


router.get('/list', (_req, res) => {
  Contact.find((err, docs) => {
    if (!err) {
      res.render('contact/list', {

        list: docs,

      });
    } else {
      console.log('Error in retrieving contact list :' + err);
    }
  });
});


function handleValidationError(err, body) {
  // eslint-disable-next-line guard-for-in
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case 'name':

        body['fullNameError'] = err.errors[field].message;

        break;

      case 'email':

        body['emailError'] = err.errors[field].message;

        break;

      default:

        break;
    }
  }
}


router.get('/:id', (req, res) => {
  Contact.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render('contact/addOrEdit', {

        viewTitle: 'Update Contact',

        contact: doc,

      });
    }
  });
});


router.get('/delete/:id', (req, res) => {
  Contact.findByIdAndRemove(req.params.id, (err, _doc) => {
    if (!err) {
      res.redirect('/contact/list');
    } else {
      console.log('Error in contact delete :' + err);
    }
  });
});


module.exports = router;
