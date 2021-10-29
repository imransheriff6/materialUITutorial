const express = require("express");
var cookieParser = require('cookie-parser');
var session = require('express-session');
const app = express();
app.use(session({
    secret: 'my session',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60
     }
}));
var SessionCheck = function (req,res,next){
    console.log(new Date());
    console.log(req.session.cookie.expires);
    if(new Date() > sessCheck.data.checkInAt ){
        res.send("Session Out")
    }else{
        sessCheck.data.checkInAt = req.session.cookie.expires
        next(); 
    }
}
module.exports = SessionCheck;
