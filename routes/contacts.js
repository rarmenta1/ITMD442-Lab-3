var express = require('express');
var router = express.Router();
const contactsController = require('../controllers/contactController');
const { body } = require('express-validator');



/* GET users listing. */
router.get('/', contactsController.contacts_list);

/* GET create contacts form. */
router.get('/add', contactsController.contacts_create_get);

/* POST create contacts. */
router.post('/add', 
body('firstName').trim().notEmpty().withMessage('First Name can NOT be empty!'),
body('lastName').trim().notEmpty().withMessage('Last Name can NOT be empty!'),
contactsController.contacts_create_post);

/* GET single contacts. */
router.get('/:uuid', contactsController.contacts_detail);

/* GET delete contacts form. */
router.get('/:uuid/delete', contactsController.contacts_delete_get);

/* POST delete contacts. */
router.post('/:uuid/delete', contactsController.contacts_delete_post);

/* GET edit contacts form. */
router.get('/:uuid/edit', contactsController.contacts_edit_get);

/* POST edit contacts. */
router.post('/:uuid/edit',
body('firstName').trim().notEmpty().withMessage('First Name can NOT be empty!'),
body('lastName').trim().notEmpty().withMessage('Last Name can NOT be empty!'),
contactsController.contacts_edit_post);


module.exports = router;
