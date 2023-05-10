const express = require('express');
const path = require('path');
//const productRouter = require('../routes/products');
//const adminProductRouter = require('../routes/admin_products');
const userRouter = require('../routes/users');
//const homeRouter = require('../routes/home');
const viewRouter = require('../routes/view');
const router = express.Router();

function validateAdmin(req,res,next){
    if(req.get('x-token') == 'admin' ){
        next();
    }
    else{
        res.status(403).send('Acesso no autorizado no se cuenta con privilegios de administrador')
    }
}


router.use('/user',userRouter);
router.use('/views',viewRouter);
//router.use('/home',homeRouter);
/* 
router.use('/products',productRouter);
router.use('/admin/products',validateAdmin,adminProductRouter); */

router.get('/',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/home.html")));
router.get('/home',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/home.html")));
router.get('/AddHome',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/Crear_publicacion.html")));
router.get('/search',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/SearchResults.html")));


//router.get('/admin',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/admin.html")));
//router.get('/admin/products',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/admin.html")));)


module.exports = router;