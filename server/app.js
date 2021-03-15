const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();

// require the config path
dotenv.config({ path: './config.env' })


// require our conn.js
require("./db/conn")

// for require our userschema
// const User = require("./model/userSchema")

// for getting our json data from json
app.use(express.json())

// for require auth.js which is inside the router folder
app.use(require("./router/auth"));

// for atlas
// process.env.DATABASE -> for require what is written inside config.env we write process.env.what is written inside that
// const DB = process.env.DATABASE;
const PORT = process.env.PORT;

// Middleware 
// next means uske baad jo han woh show karo
const middleware = (req, res, next) => {
    console.log(`hello my middleware`);
    next();
}


// app.get("/", (req, res) => {
//     res.send("hello from home side");
// })

// // beacz we want our middleware in about page
// // middleware will make sure user will properly login or not
// // middleware means usse hum logg routing main lagenge taki res send hone se pehle woh apna kaam kar sake
// app.get("/about", middleware, (req, res) => {
//     console.log(`hello my about page`)
//     res.send("hello from about side");
// })

// app.get("/contact", (req, res) => {
//     res.send("hello from contact side");
// })

// app.get("/login", (req, res) => {
//     res.send("hello from login side");
// })

// app.get("/register", (req, res) => {
//     res.send("hello from register side");
// })

app.listen(PORT, () => {
    console.log(`listening to the port no ${PORT}`);
})