const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const path = require('path');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize');
const { Sequelize } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create ({ helpers })

const cookieSession = {
    secret: '0',
    cookie: {
        maxAge: 1000 * 60 * 15
    },
    resave:false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(cookieSession))
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false}).then (() => {
    app.listen(PORT, () => console.log(`Now listening to localhost:${PORT}`))
})