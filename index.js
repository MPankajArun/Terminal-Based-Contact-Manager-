const mongoose = require('mongoose');
const asser = require('assert');
mongoose.Promise = global.Promise;

const db = mongoose.createConnection('mongodb://localhost:27017/contact-manager');

function toLower(str) {
    return str.toLowerCase();
}

// Define contact Schema
const contactSchema = mongoose.Schema({
    firstname: { type: String, set:toLower},
    lastname: {type:String, set:toLower},
    phone: {type:String, set:toLower},
    email: {type:String, set:toLower}
});

// Define model as an inteface with database
const Contact = mongoose.model('Contact', contactSchema);

/**
 * @function [addContact]
 * @returns {String} status
 * 
 */
const addContact = (contact) => {
    Contact.create(contact,(err) => {
        assert.equal(null, err);
        console.info('New contact added.');
        db.disconnect();    
    });
};

/**
 * @function [getContact]
 * @returns {Json} contacts
 * 
 */
const getContact = (name) => {
    // define search criteria
    const search = new RegExp(name,'i');

    Contact.find({$or: [{firstname: search}, {lastname: search}]})
            .exec((err,contact) => {
                assert.equal(null,err);
                console.info(contact);
                console.info(`${contact.length} matches`);
                db.disconnect();
            });
};

/**
 * @function [addMultipleContacts]
 * @returns {Array} contacts
 * 
 */
const addMultipleContacts = (contacts) => {
    Contact.create(contacts,(err,contacts) => {
        assert.equal(null,err);
        console.info(contacts,'contacts');
        db.disconnect();
    });
};

/**
 * @function  [getContactList]
 * @returns {Sting} status
 */
const updateContact = (_id, contact) => {
    Contact.update({ _id }, contact)
    .exec((err, status) => {
      assert.equal(null, err);
      console.info('Updated successfully');
      db.disconnect();
    });
};
  
/**
* @function  [deleteContact]
* @returns {String} status
*/
const deleteContact = (_id) => {
    Contact.remove({ _id })
    .exec((err, status) => {
      assert.equal(null, err);
      console.info('Deleted successfully');
      db.disconnect();
    });
};
  
/**
* @function  [getContactList]
* @returns [contactlist] contacts
*/
const getContactList = () => {
    Contact.find()
    .exec((err, contacts) => {
      assert.equal(null, err);
      console.info(contacts);
      console.info(`${contacts.length} matches`);
      db.disconnect();
    });
};
  
// export all methods
module.exports = {
    addContact,
    getContact,
    addMultipleContacts,
    getContactList,
    updateContact,
    deleteContact
};