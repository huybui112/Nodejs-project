const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.get('/user/list', async (req, res) => {
    try {
        const users = await User.find({}, '_id last_name').exec();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/user/:userId", async (req, res) => {
    try {
        const user = await User.findById(
            req.params.userId,
            "_id first_name last_name location description occupation login_name",
        );
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        res.json(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;