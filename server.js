const express = require("express");
const app = express();
app.get("/",(req,res)=>{
    res.send("hello world");
    //console.log(err)
})
app.get("/about",(req,res)=>{
    res.send("welcome to about page");
    //console.log(err)
})
app.post("/about",(req,res)=>{
    res.send("post request from about page");
    //console.log(err)
})
app.listen("5002",() => {
    console.log(`Example app listening at http://localhost:5002`)
})
