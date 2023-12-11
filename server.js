const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const mysql = require ('mysql2');
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers')

// Sets up the server app
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'user_db'
//     }
// )

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes)

// Starts Server
sequelize.sync({force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});