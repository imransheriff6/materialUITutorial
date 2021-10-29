const express = require("express");
const app = express();
app.get("/",(req,res)=>{
    res.send("basic router")
})
app.listen("5001")
