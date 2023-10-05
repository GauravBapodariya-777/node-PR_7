const express = require('express');
let port = 8080;
const path = require('path');
const fs = require('fs');
const app = express();

const Database = require('./config/mongoose');
const TableSchema = require('./models/schema');
const BlogSchema = require("./models/blogschema");

const passport = require('passport');
const session = require('express-session');
const passportLocal = require('./config/passport-stretegy');

app.use(express.static(path.join(__dirname, '/public')));
 
app.set('view engine', 'ejs');
app.use(express.urlencoded());

 

app.use('/', require('./routes/routes'));

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Done " + port);
    }
})