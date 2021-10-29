const express = require("express");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({
    extended:true
}))
function common (req,res,next){
    //console.log(new Date());
    console.log(req.session.cookie.expires);
    if( new Date() > sessCheck.data.checkInAt ){
        res.send("Session Out")
    }else{
        sessCheck.data.checkInAt = req.session.cookie.expires;
        next(); 
    }
}
app.use(cookieParser());
app.use(session({
  secret: 'my session',
  resave: false,
  saveUninitialized: false,
  cookie: { 
      maxAge: 1000 * 60
   }
}));
//app.use(common());
app.locals.sessCheck = ''
const first = require("./routes/first");
app.use("/first",first);
app.get("/",(req,res)=>{
    res.send("basic router");
    //console.log(err)
})
app.get('/login',common,(req,res) =>{
    //console.log(sessCheck.data.view);
    res.cookie('name', 'express');
    if(sessCheck.data.view == undefined){
        sessCheck.data.view = 0 
    }else{
        sessCheck.data.view += 1
    }
    //console.log(sessCheck.data);
    console.log('Cookies: ', req.cookies);
    //console.log('Cookies id: ', req.cookies.connect.sid);
    console.log('session id',req.sessionID);
    res.send("welcome user for "+sessCheck.data.view+" time")
})
app.post('/login',(req,res) =>{
    sessCheck = req.session;
    sessCheck.data = {}
    sessCheck.data.name = 'hello world';
    sessCheck.data.checkInAt = req.session.cookie.expires;
    sessCheck = req.session;
    sessCheck.name = "name"
    res.send("<p>logged in</p>")
})
app.get("/logout",(req,res) =>{
    req.session.destroy(function(err){
        if(err) {
            console.log(err)
        }else{
            sessCheck.data = {}
            res.send("Session destroyed successfully")
        }
    })
})
app.listen("5002",() => {
    console.log(`Example app listening at http://localhost:5002`)
})
