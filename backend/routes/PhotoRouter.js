const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();
const path = require('path')
const fs = require('fs');
const multer = require('multer')
const mongoose = require("mongoose");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'images'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });


router.get("/photosOfUser/:userId", async (req, res) => {
    try {
        const userId = req.params.userId
        const photo = await Photo.find({ user_id: userId });
        if (!photo) {
            res.status(404).send("Photo not found");
            return;
        }
        res.json(photo);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/photosOfUserTest/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        const photos = await Photo.find({ user_id: userId });
        if (!photos) {
            res.status(404).send("Photo not found");
            return;
        }
        const photoData = [];
        for (let i = 0; i < photos.length; i++) {
            const photo = photos[i];
            const imagePath = path.join(__dirname, '..', 'public', 'images', photo.file_name);
            const imageBuffer = fs.readFileSync(imagePath);
            photoData.push({
                _id: photo._id,
                filename: photo.file_name,
                date_time: photo.date_time,
                user_id: photo.user_id,
                comments: photo.comments,
                contentType: 'image/jpeg',
                data: imageBuffer.toString('base64'),
            });
        }

        res.json(photoData);
    } catch (err) {
        res.status(500).send(err);
    }
});



router.post('/photos/new', upload.single('photo'), async (req, res) => {
    const userId = req.body.userId
    try {
        if (!req.file) {
            res.status(400).send('No file uploaded.');
            return;
        }
        const newPhoto = new Photo({
            _id: new mongoose.Types.ObjectId(),
            file_name: req.file.originalname,
            date_time: new Date().toISOString(),
            user_id: userId,
            comments: []
        });
        await newPhoto.save();

        res.status(201).send('Photo uploaded successfully.');
    } catch (error) {
        console.error('Error uploading photo:', error);
        res.status(500).send('Server error.');
    }
});



module.exports = router;
