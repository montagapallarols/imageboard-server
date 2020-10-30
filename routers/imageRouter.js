const { Router } = require("express");
const Image = require("../models").image;

const router = new Router();


router.get("/", async (req, res, next) => {
    const images = await Image.findAll()
    res.json(images)
})

router.post("/", async (req, res, next) => {
    try {
        const { title, url } = req.body
        if (!title || !url) {
            res.status(400).send("Missing parameters")
        } else {
            const newImage = await Image.create({
                title,
                url
            })
            res.json(newImage)
        }
        
    } catch(e) {
        next(e)
    }
})


module.exports = router;