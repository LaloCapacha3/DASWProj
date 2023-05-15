const mongoose = require('mongoose');
const express = require('express');
const utils = require('../controllers/utils');
const router = express.Router();
const path = require('path');
const { send } = require('process');
const { table } = require('console');

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
            mongoose.model('vendedores').findOne({ID: InfoCasa.owner}).then((InfoVendedor) => {
                console.log("voy a mandar usuario y casas");
                res.status(200).send([InfoCasa,InfoVendedor]);
        });
    }});
});

router.get('/user/getinfo',(req,res) => {
    const UserID = req.headers['x-token'];
    console.log(UserID);
    mongoose.model('vendedores').findOne({ID: UserID}).then((InfoVendedor) => {
        if(InfoVendedor == null){
            res.sendStatus(404);
        }
        else{
            mongoose.model('Casas').find({owner: InfoVendedor.ID}).then((vendecasas) => {
                console.log("voy a mandar info de vendedor y sus casas");
                res.status(200).send([InfoVendedor,vendecasas]);
            });
        }
    });
});


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
    let owner = req.body.owner;
    let casa = {
        ID: utils.generateUUID(),
        owner: owner,
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
        mongoose.model('vendedores').findOne({ID: owner}).then((vendedor) => {  
            if(vendedor == null){
                res.status(404).send('Error de usuario');
            }
            else{
                    console.table(vendedor.homes);
                    vendedor.NoOfHomes = vendedor.NoOfHomes + 1;
                    vendedor.homes.push(casa.ID);
                    vendedor.save();
                    res.status(200).send('Casa creada: ' + doc);
                }
            }
        );
        
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error al guardar la casa');
    });
});

router.delete('/casa/delete',(req,res) => {
    //console.log("Entre a delete");
    const CasaID = req.headers['del-token'];
    console.log(CasaID);
    mongoose.model('Casas').findOne({ID: CasaID}).then((casa) => {  
        mongoose.model('vendedores').findOne({ID: casa.owner}).then((own) => {  
            own.NoOfHomes = own.NoOfHomes - 1;
            let tmp = own.homes;
            let index = tmp.indexOf(CasaID);
            tmp.splice(index,1);

            own.homes = tmp;
            console.log(tmp);
            
            own.save();
        });
    });
    mongoose.model('Casas').deleteOne({ID: CasaID}).then((eliminado) => {
        console.log("Borre la casa con id: ", CasaID);
    });
    location.reload();
});

router.put('/casa/user/updateHome',(req,res) => {
    const CasaIDUPD = req.headers['my-casita'];
    console.log(CasaIDUPD);
    
    mongoose.model('Casas').findOne({ID: CasaIDUPD}).then((CasitaUPD) => {
        CasitaUPD.price = req.body.price,
        CasitaUPD.description = req.body.description,
        CasitaUPD.location = req.body.location,
        CasitaUPD.NRoom = req.body.NRoom,
        CasitaUPD.NBath = req.body.NBath,
        CasitaUPD.NFloor = req.body.NFloor,
        CasitaUPD.NPark = req.body.NPark,
        CasitaUPD.save()
        console.log("Casita actualizada");
    });
});

router.get('/casa/findbyloc',(req,res) => {
    const locatio = req.headers['my-location'];
    const TypViv = req.headers['my-vivienda'];
    const FlooFil = req.headers['my-pisos'];

    let locC=0,VivC=0,FlooC=0;

    let Final = [];

    mongoose.model('Casas').find().then((AllH) => {
        if(AllH == null){
            res.sendStatus(404);
        }
        else{
            Final = AllH;
            
                if (locatio != null && locC == 0){
                    console.log("Entro a location");
                    Final = Final.filter(filt => filt.location == locatio);
                    /*Final.find({location : locatio}).then((CasasLoc) => {
                        if(CasasLoc == null){
                            res.sendStatus(404);
                        }
                        else{
                            locC = 1;
                            Final = CasasLoc;
                        }
                    });*/
                    locC = 1;
                }
                if (TypViv != null && VivC == 0){
                    console.log("Entro a typ");
                    Final = Final.filter(filt => filt.type == TypViv);
                    /*Final.find({type : TypViv}).then((CasasTyp) => {
                        if(CasasTyp == null){
                            res.sendStatus(404);
                        }
                        else{
                            VivC = 1;
                            Final = CasasTyp;
                        }
                    });*/
                    VivC = 1;
                }
                /*if (FlooFil != null && FlooC == 0){
                    console.log("Entro a floo");
                    //Final = Final.filter(filt => filt.NFloor == FlooFil);
                    Final.find({NFloor : FlooFil}).then((CasasFloo) => {
                        if(CasasFloo == null){
                            res.sendStatus(404);
                        }
                        else{
                            FlooC = 1;
                            Final = CasasFloo;
                        }
                    });
                    FlooC = 1;
                }*/
            
        }
        res.status(200).send(Final);
    });
});

router.get('/casa/findbytype',(req,res) => {
    const TypViv = req.headers['my-type'];
    console.log(TypViv);
    mongoose.model('Casas').find({type: TypViv}).then((CasasTyp) => {
        if(CasasTyp == null){
            console.log("No hay casas de este tipo");
            res.sendStatus(404);
        }
        else{
            console.table(CasasTyp);
            res.status(200).send(CasasTyp);
        }
    });
});

router.get('/casa/findbyfloors',(req,res) => {
    const FlooFil = req.headers['my-floors'];
    console.log(FlooFil);
    mongoose.model('Casas').find({NFloor: FlooFil}).then((CasasFloo) => {
        if(CasasFloo == null){
            console.log("No hay casas de este tipo");
            res.sendStatus(404);
        }
        else{
            console.table(CasasFloo);
            res.status(200).send(CasasFloo);
        }
    });
});


router.get('/casa/findAll',(req,res) => {
    mongoose.model('Casas').find().then((AllH) => {
        if(AllH == null){
            res.sendStatus(404);
        }
        else{
            res.status(200).send(AllH);
        }
    });
});

router.get('/casa/findbywishlist',(req,res) => {
    const UserID = req.headers['my-user'];
    console.log(UserID);
    mongoose.model('compradores').findOne({ID: UserID}).then((InfoComprador) => {
        if(InfoComprador == null){
            res.sendStatus(404);
        }
        else{
            mongoose.model('Casas').find({ID: InfoComprador.Whislist}).then((wishlist) => {
                console.log("wishlist");
                console.table(wishlist);
                res.status(200).send(wishlist);
            });
        }
    });
});



module.exports = router;
