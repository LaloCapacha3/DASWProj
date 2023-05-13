const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const utils = require('../controllers/utils');
const router = express.Router();
let app = express();

mongoose.connect('mongodb+srv://admin:casas@myapp.go7n5tu.mongodb.net/ProyectoFinal')

router.get('/register',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/registro.html")));
router.get('/login',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/login.html")));
router.get('/profile',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/user.html")));

const VendedorSchema = mongoose.Schema({
    ID: {
        type: String
    },
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
    homes:{
        type: Array
    }
})


var Vendedor = mongoose.model('vendedores',VendedorSchema);


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
    console.log("Tipo de date" + typeof(x.date));
    if(!y.length)
    {
        res.sendStatus(400);
    }
    else{
        mongoose.model('vendedores').findOne({email: x.email}).then((vendedor) => {
            if(vendedor != null){
                res.sendStatus(409);
            }
            else{
                let vendedor = new Vendedor({
                    ID: utils.generateUUID(),
                    name: x.name,
                    email: x.email,
                    password: hash,
                    date: x.date,
                    description: x.description,
                    country: x.country,
                    state: x.state,
                    city: x.city,
                    phone: x.phone,
                    NoOfHomes: 0,
                    homes: []
                });
                console.log("Vendedor: ");
                console.table(vendedor);
                vendedor.save();
                res.status(200).send(vendedor.ID);
            }
        });
        
    }
});

router.post('/login',(req,res) => {
    console.log("Login working!");
    let x = req.body;
    mongoose.model('vendedores').findOne({email: x.email}).then((vendedor) => {
        if(vendedor == null){
            res.sendStatus(404);
        }
        else{
            let correct_password = bcrypt.compareSync(x.password,vendedor.password);
            if(correct_password){
                res.status(200).send(vendedor.ID);
            }
            else{
                res.sendStatus(401);
            }
        }
    });
}); 

router.get('/info',(req,res) => {
    console.log("Info working!");
    let token = req.headers['x-token'];
    console.log("Token: " + token);
    mongoose.model('vendedores').findOne({ID: token}).then((vendedor) => {
        if(vendedor == null){
            res.sendStatus(404);
        }
        else{
            res.status(200).send(vendedor);
        }
    });
});

router.put('/info',(req,res) => {
    console.log("Info working!");
    let token = req.headers['x-token'];
    console.log("Token: " + token);
    mongoose.model('vendedores').findOne({ID: token}).then((vendedor) => {
        if(vendedor == null){
            res.sendStatus(404);
        }
        else{
            let x = req.body;
            console.log("Body: " + x);
            let y = Object.values(x);
            console.log("Array" + y);
            console.log("Array size: " + y.length);
            console.log("Tipo de date" + typeof(x.date));
            if(!y.length)
            {
                res.sendStatus(400);
            }
            else{
                console.table(y);
                vendedor.name = x.name;
                vendedor.email = x.email;
                vendedor.date = x.date;
                vendedor.description = x.description;
                vendedor.country = x.country;
                vendedor.state = x.state;
                vendedor.city = x.city;
                vendedor.phone = x.phone;
                vendedor.save();
                res.sendStatus(200);
            }
        }
    });
});




module.exports = router;