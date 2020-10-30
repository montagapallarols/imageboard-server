const { Router } = require('express')
const { toJWT, toData } = require("../auth/jwt");
const bcrypt = require('bcrypt');
const User = require("../models").user;
const router = new Router()


router.post("/signup", async (req, res, next) => {
    const { email, password, fullName } = req.body;
if (!email || !password || !fullName) {
  res.status(400).send("missing parameters");
} else {
  const newUser = await User.create({
    email,
    // Here, when handing down the password to the create method we hash it.
    password: bcrypt.hashSync(password, 10),
    fullName,
  });

  res.json(newUser);
}
})




router.post('/login', async (req, res, next) => {
    const { email , password} = req.body
    if(!email || !password){
        res.status(400).send("missing some info")
        return
    }
    console.log("login with ", email, "password",password)
    const foundUser = await User.findOne({where: { email}})
    
    if(!foundUser) {
        res.status(400).send("user not found")
        return
    }
    if(bcrypt.compareSync(password, foundUser.password)){
        console.log("Found user password", foundUser.password)
        console.log("Password", password)
        return

    } else {
        res.send("password was wrong")
    }
    const token = toJWT({id: foundUser.id})
    console.log("token", token)


    const checkedToken = toData(token)
    console.log("what is stored in a token", checkedToken)


    res.json({token})
})

module.exports = router