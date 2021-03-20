const express = require('express');
const router = express.Router();

require("../db/conn")  // require our conn part
const User = require("../model/userSchema") //

router.get("/", (req, res) => {
    res.send("hello from home side of router");
})

// using async-await
router.post("/register", async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        res.status(400).json({ error: "please filled the field properly" })
    }

    try {
        // await means ya toh future main data millega ya reject hoga thats why we store in const
        const userexist = await User.findOne({ email: email })

        if (userexist) {
            return res.status(400).json({ error: "email already exist" })
        }

        const user = new User({ name, email, phone, work, password, cpassword })

        await user.save()

        res.status(201).json({ message: "user registered successfully" })

    } catch (error) {
        console.log(error);
    }

});

// create a login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        // email n password must be there
        if (!email || !password) {
            res.status(400).json({ error: "pls fill the data" })
        }

        // for read data from db that email must be registered
        // email -> for db n email -> whivh the user is login 
        const userLogin = await User.findOne({ email: email })

        console.log(userLogin);

        //userlogin ke andhar agar data nahi han
        if (!userLogin) {
            res.status(400).json({ error: "user error" })
            // else user ke andhar correct data aa chukka han
        } else {
            res.json({ message: "user signin successfully" })
        }


    } catch (error) {
        console.log(error);
    }
});


module.exports = router;