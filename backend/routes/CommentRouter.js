const express = require("express");
const mongoose = require("mongoose");
const Photo = require("../db/photoModel");
require('dotenv').config()
const router = express.Router();

router.post('/commentsOfPhoto/:photo_id', async (req, res) => {
    const photoId = req.params.photo_id;
    const { userId, comment } = req.body;

    if (!comment || comment.trim() === '') {
        return res.status(400).json({ error: 'Comment cannot be empty' });
    }

    try {
        const photo = await Photo.findOne({ _id: photoId });
        if (!photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }

        const newComment = {
            comment: comment,
            date_time: new Date().toISOString(),
            user_id: userId,
            _id: new mongoose.Types.ObjectId()
        }

        photo.comments.push(newComment);

        await photo.save();

        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.delete('/commentsOfPhoto/:photo_id/:comment_id', async (req, res) => {
    const photoId = req.params.photo_id;
    const commentId = req.params.comment_id;

    try {
        const photo = await Photo.findOne({ _id: photoId });
        if (!photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }

        const commentIndex = photo.comments.findIndex(comment => comment._id.toString() === commentId);

        if (commentIndex === -1) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        photo.comments.splice(commentIndex, 1);

        await photo.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
