const express = require('express');
const sequelize = require('./config/config');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static directory
app.use(express.static('public'));

// Session middleware
const sess = {
    secret: process.env.SESSION_SECRET, // Make sure to add SESSION_SECRET in your .env file
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  
  app.use(session(sess));

// Routes
// Note: You will need to require your route files at the top of this script
// const apiRoutes = require('./routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');

// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

// Syncing our sequelize models and then starting our Express app
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});