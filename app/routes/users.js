const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const router = express.Router();
let app = express();

mongoose.connect('mongodb+srv://admin:casas@myapp.go7n5tu.mongodb.net/ProyectoFinal')

router.get('/register',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/registro.html")));
router.get('/login',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/login.html")));
router.get('/profile',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/user.html")));

const VendedorSchema = mongoose.Schema({
    name: {
        type : String
    },
    email: {
        type: String
    },
    password:{
        type : String
    },
    date:{
        type: String
    },
    description:{
        type: String
    },
    country:{
        type: String
    },
    state:{
        type: String
    },
    city:{
        type: String
    },
    phone:{
        type: String
    },
    NoOfHomes:{
        type: Number
    },
})


var Vendedor = mongoose.model('Vendedores',VendedorSchema);


router.get('/',(req,res) => {
    res.sendFile(path.resolve(__dirname + "/../views/user.html"));
});

router.post('/register',(req,res) => {
    console.log("Register working!");
    let x = req.body;
    console.log("Body: " + x);
    console.log("Password: " + x.password);
    let hash = bcrypt.hashSync(x.password,10);
    console.log("Hash: " + hash);
    let correct_password = bcrypt.compareSync(x.password,hash);
    console.log("Correct password: " + correct_password);
    let y = Object.values(x);
    console.log("Array" + y);
    console.log("Array size: " + y.length);
    if(!y.length)
    {
        res.sendStatus(400);
    }
    else{
        console.log("Entro al else");
        console.table(y);
        res.sendStatus(200);

        /* console.table(y);
        let vendedor = new Vendedor({}
        res.status(200).send("Usuario registrado correctamente"); */

    }
});

        

module.exports = router;