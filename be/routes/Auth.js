const express = require("express");
const User = require("../db/userModel");
require('dotenv').config()
const router = express.Router();


router.post('/admin/login', async (req, res) => {
    try {
        const { login_name, password } = req.body;
        const userlogin = await User.findOne({ login_name: login_name });
        if (!userlogin) {
            return res.status(400).json({ error: 'Invalid login_name', login_name: login_name });
        }

        if (userlogin.password !== password) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        req.session.user = login_name
        res.json({ _id: userlogin._id, name: userlogin.last_name });
    } catch (error) {
        console.error('Error occurred during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/admin/logout', (req, res) => {
    res.json({ message: 'User logged out successfully' });
});


router.post('/register', async (req, res) => {
    const { last_name, location, description, occupation, login_name, password } = req.body;
    try {
        const newUser = new User({
            last_name,
            location,
            description,
            occupation,
            login_name,
            password
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;