const { Router } = require("express");
const User = require("../models").user;
const bcrypt = require('bcrypt');

const router = new Router();

router.get("/", async (req, res, next) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch(e) {
        next(e)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const { email, password, fullName } = req.body
        if (!email || !password || !fullName) {
            res.status(400).send("Missing parameters")
        } else {
            const newUser = await User.create({email, password, fullName})
            res.json(newUser)
        }
    } catch(e) {
        next(e)
    }
})

module.exports = router;