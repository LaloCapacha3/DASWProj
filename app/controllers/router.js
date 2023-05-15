const express = require('express');
const path = require('path');
//const productRouter = require('../routes/products');
//const adminProductRouter = require('../routes/admin_products');
const userRouter = require('../routes/users');
const viewRouter = require('../routes/view');
const resultsRouter = require('../routes/results');
const router = express.Router();




router.use('/user',userRouter);
router.use('/views',viewRouter);
router.use('/results',resultsRouter);

//router.use('/home',homeRouter);


router.get('/',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/home.html")));
router.get('/home',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/home.html")));
router.get('/AddHome',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/Crear_publicacion.html")));
router.get('/search',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/SearchResults.html")));
router.get('/views/casa/?',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/houseview.html")));
router.get('/views/user/?',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/userprofile.html")));


module.exports = router;