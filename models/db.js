/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://anusha123:anusha123@cluster0.vfe87.mongodb.net/contactsDatabase?retryWrites=true&w=majority', {useNewUrlParser: true}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});
require('./contact.model');
