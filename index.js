const express = require('express');
const path = require('path');
const app = express();

app.set('view engine','ejs');

app.get('/dogs',(req,res)=>{
    res.send("Hello Puppy");
})

app.listen(3000,()=>{
    console.log("LISTENING ON PORT 3000");
})