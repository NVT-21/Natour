const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const axios = require('axios');

const app = express();

const bodyParser = require('body-parser');
 require('dotenv').config();

 var pug = require('pug');
 var cookieParser = require('cookie-parser')
const port = process.env.Port|| 3000;
const connect = require('./controllers/connect');
const router = require('./router/index')

const controllerError = require('./controllers/controllerError');
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));

app.set('view engine', '.hbs');

bodyParser.urlencoded({ extended: true })

app.use(cookieParser());

app.use(express.static('public'));
app.set('views', __dirname + '/views');

app.use(bodyParser.json());



connect();
router(app);
app.use(controllerError);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})