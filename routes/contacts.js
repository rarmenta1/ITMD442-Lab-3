var express = require('express');
var router = express.Router();
//const contactsRepo = require('../src/contactsMemoryRepository');
const contactsRepo = require('../src/contactsFileRepository');



/* GET users listing. */
router.get('/', function(req, res, next) {
  const data = contactsRepo.findAll();
  res.render('contacts', {title: 'Express Contacts', contacts: data });
});

/* GET create contacts form. */
router.get('/add', function(req, res, next) {
  res.render('contacts_add', {title: 'Add a contact' });
});

/* POST create contacts. */
router.post('/add', function(req, res, next) {
  //console.log(req.body);
  if (req.body.firstName.trim() === '' || req.body.lastName.trim() === '')  {
      res.render('contacts_add', { title: 'Add a contact', msg: 'First Name and Last Name text fields can NOT be empty!'});
  } else  {
    contactsRepo.create({firstName: req.body.firstName.trim(), lastName: req.body.lastName.trim(), email: req.body.email, notes: req.body.notes})

    res.redirect('/contacts');
  }
});

/* GET single contacts. */
router.get('/:uuid', function(req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  if(contact) {
    res.render('contact', {title: 'Contact Information', contact: contact });
  } else {
    res.redirect('/contacts');
  }
});

/* GET delete contacts form. */
router.get('/:uuid/delete', function(req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  res.render('contacts_delete', {title: 'Delete Contact', contact: contact });
});

/* POST delete contacts. */
router.post('/:uuid/delete', function(req, res, next) {
  contactsRepo.deleteByID(req.params.uuid);
  res.redirect('/contacts');
});

/* GET edit contacts form. */
router.get('/:uuid/edit', function(req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  res.render('contacts_edit', {title: 'Edit contact', contact: contact });
});

/* POST edit contacts. */
router.post('/:uuid/edit', function(req, res, next) {
  //console.log(req.body);
  if (req.body.firstName.trim() === '' || req.body.lastName.trim() === '')  {
    const contact = contactsRepo.findById(req.params.uuid);
    res.render('contacts_edit', { title: 'Edit contact', msg: 'First Name and Last Name text fields can NOT be empty!', contact: contact});
  } else  {
    const updatedContact = {id: req.params.uuid, firstName: req.body.firstName.trim(), lastName: req.body.lastName.trim(), email: req.body.email, notes: req.body.notes, notes: req.body.notes };
    contactsRepo.update(updatedContact);
    res.redirect('/contacts/' + req.params.uuid);
  }
});


module.exports = router;
