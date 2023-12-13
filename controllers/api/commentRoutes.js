const router = require('express').Router();
const Comment = require ('../../models/')

router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_name: req.body.comment.name,
            description: req.body.comment.description,
        });

        res.status(200).json(commentData)
    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router