require('dotenv').config();

const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const customHelpers = require('./utils/helpers');
const path = require('path');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars setup with custom helpers
const hbs = exphbs.create({ helpers: customHelpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Session middleware setup
const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        // Add secure: true if HTTPS/SSL, maxAge for cookie expiration, etc.
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// Route handlers
app.use(routes);

// Error handling middleware (to be implemented)
// app.use((err, req, res, next) => {
//   // Error handling logic
// });

// Sync Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
