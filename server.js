const express = require('express');
const fs = require('fs');
const router = require('./app/controllers/router');

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.static('app'));
app.use('/views',express.static('views'));
app.use('/controllers',express.static('controllers'));
app.use(router);

/*
var products = fs.readFile('./app/data/products.json','utf-8',function(err,data){
    if(err){
        console.log("Somenthing went wrong :(");
    }a
    else{
        console.log("Working!");
        console.table(JSON.parse(data));
    }
});*/

app.get('/',(req,res)=>{
    console.log("Prueba de servidor");
    res.send("Prueba de servidor");
}); 

app.listen(port, () =>{
    console.log("Aplicacion de ejemplo corriendo en puerto "+port);
});
 