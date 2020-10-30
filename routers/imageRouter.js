const { Router } = require("express");
const Image = require("../models").image;
const { toJWT, toData } = require("../auth/jwt");
const router = new Router();


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


  router.get("/", async (req, res, next) => {
    const auth = req.headers.authorization && req.headers.authorization.split(" ");
    if (auth && auth[0] === "Bearer" && auth[1]) {
      try {
        const data = toData(auth[1]);
      } catch (e) {
        res.status(400).send("Invalid JWT token");
      }
      const allImages = await Image.findAll();
      res.json(allImages);
    } else {
      res.status(401).send({
        message: "Please supply some valid credentials",
      });
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