const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const utils = require('../controllers/utils');
const router = express.Router();
let app = express();

mongoose.connect('mongodb+srv://admin:casas@myapp.go7n5tu.mongodb.net/ProyectoFinal')

const CasaSchema = mongoose.Schema({
    owner: {
        type: String
    },
    size: {
        type: Number
    },
    type: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    NRoom: {
        type: Number
    },
    NBath: {
        type: Number
    },
    NFloor: {
        type: Number
    },
    NPark: {
        type: Number
    },
    CYear: {
        type: Number
    }
});

var Casa = mongoose.model('casas',CasaSchema);

router.get('/',(req,res) => {
    console.log("Query working!");
    let query = req.body;
    console.log(query);
    res.sendStatus(201)
});


module.exports = router;