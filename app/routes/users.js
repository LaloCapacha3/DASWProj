const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
let app = express();

mongoose.connect('mongodb+srv://admin:casas@myapp.go7n5tu.mongodb.net/ProyectoFinal')


router.get('/',(req,res) => {
    res.sendFile(path.resolve(__dirname + "/../views/user.html"));
});

router.post('/register',(req,res) => {
    console.log("Register working!");
    let x = req.body;
    console.log("Body: " + x);
    let y = Object.values(x);
    console.log("Array" + y);
    console.log("Array size: " + y.length);
    if(!y.length)
    {
        res.sendStatus(400);
    }
    else{
        console.table(y);
        res.status(200).send("Usuario registrado correctamente");
        /*for(let i = 0; i < y.length; i++){
            if(y[i] === ""){
                flag = false;
                break;
            }
        }
        if(flag === false){
            res.sendStatus(400);
        }
        else{
            let user = new User({
                _name: x.name,
                _lastname: x.lastname,
                _email: x.email,
                _password: x.password
            });
            user.save((err,userStored) => {
                if(err){
                    res.status(500).send({message: `Error al guardar en la base de datos: ${err}`});
                }
                else{
                    res.status(200).send({user: userStored});
                }
            });
        }*/
    }
});

        

module.exports = router;