const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); 
const passport = require("passport")
const app = express();

//引入users.js
const users = require("./routers/api/users")
const profiles = require("./routers/api/profiles")

//DB config
const db = require("./config/keys").mongoURI;

//使用body-parser的中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//Connect to mongodb
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log("MongooseDB Connected"))
    .catch(err => console.log(err));

//passport 初始化
app.use(passport.initialize())

require("./config/passport")(passport);


// app.get("/",(req,res) => {
//     res.send("Hi!!!");
// })

//使用router
app.use("/api/users",users);
app.use("/api/profiles",profiles);

const port = process.env.PORT || 5000;

app.listen(port,()=> {
    console.log(`Server runing on port ${port}`);
    
})