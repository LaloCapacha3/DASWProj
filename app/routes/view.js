const mongoose = require('mongoose');
const express = require('express');
const utils = require('../controllers/utils');
const router = express.Router();
const path = require('path');
const { send } = require('process');

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




const CasaSchema = mongoose.Schema({
    ID: {
        type: String
    },
    owner: {
        type: String
    },
    image: {
        type:String
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

router.use(express.urlencoded({ extended: true }));
let home;

router.get('/casa/getinfo',(req,res) => {
    const CasaID = req.headers['x-token'];
    console.log(CasaID);
    
    mongoose.model('Casas').findOne({ID: CasaID}).then((InfoCasa) => {
        if(InfoCasa == null){
            res.sendStatus(404);
        }
        else{
            home = InfoCasa;
            mongoose.model('vendedores').findOne({ID: home.owner}).then((InfoVendedor) => {
                console.log("voy a mandar usuario y casa");
                   res.status(200).send([home,InfoVendedor]);
        });
    }});
    
    /*mongoose.model('vendedores').findOne({ID: home.owner}).then((InfoVendedor) => {
     console.log("voy a mandar usuario y casa");
        res.status(200).send([home,InfoVendedor]);
    }); */
});

router.get('/user',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/userprofile.html")));

router.get('/user/:id',(req,res) => {

});

/* router.get('/casa/:id',(req,res) => {
    const CasaID = req.params.id;
    mongoose.model('Casas').findOne({ID: CasaID}).then((InfoCasa) => {
        if(InfoCasa == null){
            res.sendStatus(404);
        }
        else{
            console.log("voy a mandar");
            //res.status(200).send(InfoCasa);
            console.log(path.resolve(__dirname + "/../views/houseview.html"));
            res.sendFile(path.resolve(__dirname + "/../views/houseview.html"));
            //res.sendFile(path.resolve(__dirname + "/../views/houseview.html"));
        }
    });
    
});
 */
/*
router.get('/casa/:id',(req,res) => {
    const CasaID = req.params.id;
    mongoose.model('Casas').findOne({ID: CasaID}).then((InfoCasa) => {
        if(InfoCasa == null){
            res.sendStatus(404);
        }
        else{
            console.log("voy a mandar");
            res.status(200).send(InfoCasa);
            //res.sendFile(path.resolve(__dirname + "/../views/houseview.html"));
        }
    });
    //res.sendFile(path.resolve(__dirname + "/../views/houseview.html"));
});*/

router.get('/houseinfo',(req,res) => {
    mongoose.model('Casas').find().then((casas) => {
        if(casas == null){
            res.sendStatus(404);
        }
        else{
            res.status(200).send(casas);
        }
    });
});


router.post('/casa/user/AddHome',(req,res) => {
    let casa = {
        ID: utils.generateUUID(),
        owner: req.body.owner,
        image: req.body.image,
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

    let CasaAgg = new Casa(casa);

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
