const express = require('express');
const sequelize = require('./config/config.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static directory
app.use(express.static('public'));

// Routes
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

// Syncing our sequelize models and then starting our Express app
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});