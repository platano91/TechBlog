const express = require('express');
const sequelize = require('./config/config');
const session = require('express-session');
const db = require('./models');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers'); // Import helpers
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static directory
app.use(express.static('./public'));

// Extend helpers with a custom 'extend' helper
const combinedHelpers = {
  ...helpers,
  extend: function (name, context) {
    // Placeholder for custom 'extend' logic
    return context.fn(this);
  },
  block: function (name, options) {
    // Placeholder for custom 'block' logic
    // Implement what 'block' should do based on your requirements
    return null;
  },
  // ... other custom helpers you might have
};

// Set up Handlebars with helpers
const hbs = exphbs.create({ helpers: combinedHelpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Session middleware
const sess = {
    secret: process.env.SESSION_SECRET, 
    cookie: {
        // Consider setting cookie security options here
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};

app.use(session(sess));

// Routes
const apiRoutes = require('./controllers/api/index');
const htmlRoutes = require('./controllers/homeRoutes');
const userRoutes = require('./controllers/api/userRoutes'); 

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
app.use('/', userRoutes);


// Error handling middleware (to be implemented)
// app.use((err, req, res, next) => {
//   // Error handling logic
// });

// Syncing our sequelize models and then starting our Express app
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});
