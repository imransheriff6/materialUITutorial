const express = require("express");
var session = require('express-session')
const router = express.Router();
var bodyparser = require("body-parser");
router.use(bodyparser.urlencoded({
    extended:true
}))
router.use(session({
  secret: 'my session',
  resave: false,
  saveUninitialized: false,
  cookie: { 
      secure: true,
    }
}));
var sess;
router.use(function(req,res,next){
    console.log(req.session.cookie.expires);
    if( new Date() > sessCheck.data.checkInAt ){
        res.send("Session Out")
    }else{
        sessCheck.data.checkInAt = req.session.cookie.expires;
        next(); 
    }
})
router
.route("/")
.get((req,res) =>{
    res.send(`path : ${req.url} getter`)
})
.post((req,res) =>{
    res.send(`path ${req.url} post`)
})
router
.route("/post/:exid")
.get((req,res) =>{
    res.send(`Thanks for calling ${req.params.exid}`)
})
.post((req,res) =>{
    sess = req.session;
    sess.data = {};
    sess.data.userId = req.params.exid;
    res.send(`Thanks for posting ${req.params.exid}`)
})
router
.route("/logout")
.get((req,res) =>{
    req.session.destroy(function(err) {
        // cannot access session here
      })
      res.send("<h1>Logout successfully</h1>")
})
module.exports = router;
