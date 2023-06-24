const express = require('express');

const path = require('path');
const axios = require('axios');

const app = express();

const bodyParser = require('body-parser');
 require('dotenv').config();


var cookieParser = require('cookie-parser')
const port = process.env.Port|| 3000;
const connect = require('./controllers/connect');
const router = require('./router/index')
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const controllerError = require('./controllers/controllerError');
// app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main", handlebars: allowInsecurePrototypeAccess(exphbs )}));
app.engine('.hbs', exphbs.engine({
  extname: '.hbs',
  defaultLayout: 'main',
  // layoutDir: __dirname + '/views/layouts',
  // partialsDir:__dirname+'/views/partials/',
  runtimeOptions:{allowProtoPropertiesByDefault:true,
  allowedProtoMethodsByDefault:true}
}));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.set('view engine', '.hbs');
app.use(cookieParser());
bodyParser.urlencoded({ extended: true })


app.use(express.static('public'));
app.set('views', __dirname + '/views');

app.use(bodyParser.json());



connect();
router(app);
app.use(controllerError);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})