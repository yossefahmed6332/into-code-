//set server 
const express= require('express');
const app= express();
app.set('view engine','ejs');


//set routes 
app.get('/',(req,res)=>{
    res.render('index');
});


//set server port
app.listen(3000,()=>{
    console.log('server is running on port 3000');
});