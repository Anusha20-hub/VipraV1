/* eslint-disable linebreak-style */

require('./models/db');

const express = require('express');

const path = require('path');

const exphbs = require('express-handlebars');

const bodyparser = require('body-parser');


const contactController = require('./controllers/contactController');


const app = express();

app.use(bodyparser.urlencoded({

  extended: true,

}));

app.use(bodyparser.json());

app.set('views', path.join(__dirname, '/views/'));

app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}));

app.set('view engine', 'hbs');


app.listen(3000, () => {
  console.log('Express server started at port : 3000');
});


app.get('/', (req, res) => {
  console.log('hello');

  res.render('contact/addOrEdit', {

    viewTitle: 'Insert Contact',

  });
});


app.use('/contact', contactController);
