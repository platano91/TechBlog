const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get comments for a post
router.get('/post/:postId', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { postId: req.params.postId }
        });
        res.json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new comment (with authentication)
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            userId: req.session.userId,
        });
        res.json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a comment (with authentication)
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId, // Ensure the user owns the comment
            },
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
