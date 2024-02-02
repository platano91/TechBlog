const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Route to render the homepage
router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', { 
            posts, 
            loggedIn: req.session.loggedIn 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render the dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Fetch the user's posts if logged in
        const postData = await Post.findAll({
            where: {
                // Assuming you have a userId column to match the session's user id
                userId: req.session.userId 
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // Serialize data so the template can read it
        const posts = postData.map(post => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.redirect('/login');
    }
});

// Render the login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Render signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;
