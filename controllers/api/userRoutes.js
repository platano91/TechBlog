const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// Handle user registration form submission
router.post('/signup', async (req, res) => {
    try {
        // Attempt to create a new user with the provided data
        const newUser = await User.create({
            ...req.body, // Spread operator to get all user data (username, password, etc.)
        });

        // Save the user's information in the session
        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;

            // Respond with the new user data
            res.status(200).json(newUser);
        });
    } catch (error) {
        // If an error occurs, respond with the error
        res.status(500).json(error);
    }
});

// User login route
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        console.log("user", user)
        console.log(req.body)
        if (!user) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            res.json({ user: user, message: 'You are now logged in!' });
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// User logout route (handles both GET and POST)
router.all('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            // Respond with a success message or redirect to another page
            res.status(204).end(); // 204 No Content (or other appropriate status code)
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
