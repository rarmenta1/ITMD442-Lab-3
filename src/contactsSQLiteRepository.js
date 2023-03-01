const path = require('path');
const betterSqlite3 = require('better-sqlite3');
const Contact = require('./Contact');

const db = new betterSqlite3(path.join(__dirname, '../data/contacts.sqlite'), { verbose: console.log });

const createStmt = db.prepare("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, notes TEXT)");
createStmt.run();

const repo = {
  findAll: () => {
    const stmt = db.prepare("SELECT * FROM contacts");
    const rows = stmt.all();
    let contacts = [];
    rows.forEach((row) => {
      const aContact = new Contact(row.id, row.firstName, row.lastName, row.email, row.notes);
      contacts.push(aContact);
    });
    return contacts;
  },
  findById: (uuid) => {
    const stmt = db.prepare("SELECT * FROM contacts WHERE id = ?");
    const row = stmt.get(uuid);
    return new Contact(row.id, row.firstName, row.lastName,  row.email, row.notes);
  },
  create: (contact) => {
    const stmt = db.prepare("INSERT INTO contacts (firstName, lastName, email, notes) VALUES (?, ?, ?, ?)");
    const info = stmt.run(contact.firstName, contact.lastName, contact.email, contact.notes);
    console.log(` Contact Created with id: ${info.lastInsertRowid}`);
  },
  deleteByID: (uuid) => {
    const stmt = db.prepare("DELETE FROM contacts WHERE id = ?");
    const info = stmt.run(uuid);
    console.log(`rows affected: ${info.changes}`);
  },
  update: (contact) => {
   const stmt = db.prepare("UPDATE contacts SET firstName = ?, lastName = ?, email = ?, notes = ? WHERE id = ?");
   const info = stmt.run(contact.firstName, contact.lastName, contact.email, contact.notes, contact.id);
   console.log(`rows affected: ${info.changes}`);
  },
};


module.exports = repo;