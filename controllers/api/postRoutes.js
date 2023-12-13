const router = require('express').Router();
const Post = require ('../../models/post')

router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            post_name: req.body.post.name,
            description: req.body.post.description,
        });

        res.status(200).json(postData)
    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router;