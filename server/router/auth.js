const express = require('express');
const router = express.Router();

require("../db/conn")  // require our conn part
const User = require("../model/userSchema") //

router.get("/", (req, res) => {
    res.send("hello from home side of router");
})

//for get our data from postman
router.post("/register", (req, res) => {
    // console.log(req.body); // for postman bala
    // res.json({ message: req.body })  //for postman
    // now we only want name n email
    // object destructing instead of writing the console.log(req.body.name) we will do
    // inside the {} -> write the same thing what we will write in userSchema.js
    const { name, email, phone, work, password, cpassword } = req.body;
    // for validation
    // means inn main se koi bhi field nahi deta han toh error dega
    if (!name || !email || !phone || !work || !password || !cpassword) {
        res.status(400).json({ error: "please filled the field properly" })
    }

    // email->db ka email n email-> user jo email de raha h
    // if email is already there then n user is already exist
    User.findOne({ email: email })
        .then((userexist) => {
            if (userexist) {
                return res.status(400).json({ error: "email already exist" })
            }

            // if user is not exist than he must be visit first time than he will registerd first than it will store in db which is in atlas through postman we will send our data n it will send in atlas
            const user = new User({ name, email, phone, work, password, cpassword })

            user.save().then(() => {
                res.status(201).json({ message: "user registered successfully" })
            }).catch((e) => res.status(500).json({ error: "Failed to Registerd" }))

        }).catch(e => {
            console.log(e);
        });
})
module.exports = router;