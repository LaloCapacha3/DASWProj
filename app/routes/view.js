const mongoose = require('mongoose');
const express = require('express');
const utils = require('../controllers/utils');
const router = express.Router();
const path = require('path');

let mongoConnection = "mongodb+srv://admin:casas@myapp.go7n5tu.mongodb.net/ProyectoFinal";
let db = mongoose.connection;
db.on('connecting', () => {
    console.log('Conectando...');
    console.log(mongoose.connection.readyState);
})
db.on('connected', () =>{
    console.log('Conectado exitosamente!');
    console.log(mongoose.connection.readyState);
})
mongoose.connect(mongoConnection, {useNewUrlParser: true});

const CasaSchema = mongoose.Schema({
    ID: {
        type: String
    },
    owner: {
        type: String
    },
    size: {
        type: Number
    },
    type: {
        type: String,
        enum: ['Casa', 'Departamento'],
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


let Casa = mongoose.model('Casas',CasaSchema);

router.get('/casa',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/houseview.html")));
router.get('/user',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/userprofile.html")));

router.use(express.urlencoded({ extended: true }));

router.post('/casa/user/AddHome',(req,res) => {
    let casa = {
        ID: utils.generateUUID(),
        owner: req.body.owner,
        size: req.body.size,
        type: req.body.type,
        price: req.body.price,
        description: req.body.description,
        location: req.body.location,
        NRoom: req.body.NRoom,
        NBath: req.body.NBath,
        NFloor: req.body.NFloor,
        NPark: req.body.NPark,
        CYear: req.body.CYear
    };

    console.log('Datos recibidos del cliente:');
    console.log(req.body);

    let CasaAgg = new Casa(casa); // Crea una instancia del modelo

    console.log('Instancia del modelo creada:');
    console.log(CasaAgg);

    CasaAgg.save()
    .then((doc) => {
        console.log('Casa creada: ' + doc);
        res.redirect('/casa');
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error al guardar la casa');
    });
});


module.exports = router;
