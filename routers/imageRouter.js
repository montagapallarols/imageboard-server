const { Router } = require("express");
const Image = require("../models").image;
const { toJWT, toData } = require("../auth/jwt");
const router = new Router();
const authMiddleware = require("../auth/middleware")


// router.get("/", async (req, res, next) => {
//     const images = await Image.findAll()
//     res.json(images)
// })

router.get("/:imageId", async (req, res, next) => {
    try {
        const id = parseInt(req.params.imageId)
        const image = await Image.findByPk(id)
        if (!image) {
            res.status(404).send("Image not found")
        } else {
            res.json(image)
        }
    } catch(e) {
        next(e)
    }
})


// router.get("/", (req, res, next) => {
//     const limit = req.query.limit || 3;
//     const offset = req.query.offset || 0;
  
//     Image.findAll({
//       limit,
//       offset,
//     })
//       .then((images) => {
//         res.send(images);
//       })
//       .catch((error) => next(error));
//   });

  
// router.get("/", (req, res, next) => {
//     const limit = Math.min(req.query.limit || 25, 500);
//     const offset = req.query.offset || 0;
  
//     Image.findAndCountAll({ limit, offset })
//       .then((result) => res.send({ images: result.rows, total: result.count }))
//       .catch((error) => next(error));
// });


router.get("/", authMiddleware, async (req, res, next) => {
    try {
      const allImages = await Image.findAll();
      res.json(allImages);
    } catch (e) {
      next(e);
    }
  });


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