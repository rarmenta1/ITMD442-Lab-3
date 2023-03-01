const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const db = new Map();
const Contact = require('./Contact');

//db.set('a593c7cf-889d-4e81-bf0a-76cfd2d9810d', {firstName: 'John', lastName: "Doe", email: 'johndoe@gmail.com', notes: 'Sample Notes Text', id: 'a593c7cf-889d-4e81-bf0a-76cfd2d9810d'})
//db.set('7054c36e-d85e-41d3-8fd8-a996e0cac276', {firstName: 'Jodio', lastName: "Joestar", email: 'jjoestar@gmail.com', notes: 'This is a story about...', id: '7054c36e-d85e-41d3-8fd8-a996e0cac276'})

const loadData = () => {
  const jsonData = fs.readFileSync(path.join(__dirname, '../data/contacts.json'));
  const contactsArray = JSON.parse(jsonData);
  contactsArray.forEach(element => {
    const aContact = new Contact(element[1].id, element[1].firstName, element[1].lastName, element[1].email, element[1].notes,);
    db.set(aContact.id, aContact);
  });
  console.log(db);
};

const saveData = () => {
  const stringifyData = JSON.stringify(Array.from(db));
  fs.writeFileSync(path.join(__dirname, '../data/contacts.json'), stringifyData);
};



const repo = {
  findAll: () => Array.from(db.values()),
  findById: (uuid) => db.get(uuid),
  create: (contact) => {
    contact.id = crypto.randomUUID();
    db.set(contact.id, contact);
    saveData();
  },
  deleteByID: (uuid) => {
    db.delete(uuid)
    saveData();
  },
  update: (contact) => {
    db.set(contact.id, contact)
    saveData();
  },
};

loadData();

module.exports = repo;