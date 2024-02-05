const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Route to render the homepage
router.get('/', async (req, res) => {
    try {
        console.log("getting here")
        // Get all posts and JOIN with user data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        console.log(postData)
        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log("posts", posts)
        // Pass serialized data and session flag into template
        res.render('homepage', { 
            posts, 
            loggedIn: req.session.loggedIn 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Render the login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
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
        console.log(postData)
        console.log(req.session)
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

// Route to render the create or edit post page
router.get('/createOrEdit', withAuth, async (req, res) => {
    try {
        // Check if an ID is provided for editing
        if (req.params.id) {
            // Fetch the post by its ID and include the associated user
            const postData = await Post.findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                ],
            });

            // Redirect to the homepage if the post doesn't exist
            if (!postData) {
                res.redirect('/');
                return;
            }

            // Serialize the post data
            const post = postData.get({ plain: true });

            // Render the page with the post data for editing
            res.render('createOrEditPost', {
                post,
                editing: true,
                loggedIn: req.session.loggedIn
            });
        } else {
            // Render the page for creating a new post
            res.render('createOrEditPost', {
                editing: false,
                loggedIn: req.session.loggedIn
            });
        }
    } catch (err) {
        console.log(err);
        res.redirect('/login');
    }
});

// Route to render a specific blog post
router.get('/blog-post/:id', async (req, res) => {
    try {
        // Fetch the specific post by ID and JOIN with user data
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        if (postData) {
            // Serialize data so the template can read it
            const post = postData.get({ plain: true });

            // Pass serialized data into template
            res.render('blog-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        } else {
            // If no post found, respond with 404 status
            res.status(404).json({ message: 'No post found with this id!' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
