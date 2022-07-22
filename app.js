const express = require('express');
const { engine } = require('express-handlebars');
const bodyparser = require('body-parser');
const { createPool } = require("mysql");
const Connection = require('mysql/lib/Connection');

require('dotenv').config();


const app = express();

const port = 8080;

//parshing middleware
//parse appliction 

app.use(bodyparser.urlencoded({ extended: false }));

//parse appliction /json
app.use(bodyparser.json());
//static files
app.use(express.static('public'));

//templating engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');



//connection  pool
const pool = createPool({

    connectionLimit: 100,
    host: process.env.DB_HOST,

    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

});

// connect to db
pool.getConnection((err,Connection) =>{

    if(err) throw err ; //not connected

    console.log("connect as id"+Connection.threadId);

});




const routes=require('./server/routes/user');
app.use('/',routes)

app.listen(port, () => console.log(`listining on port ${port}`));
