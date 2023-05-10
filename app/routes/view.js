const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const path = require('path');
let app = express();

router.get('/casa',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/houseview.html")));
router.get('/user',(req,res) => res.sendFile(path.resolve(__dirname + "/../views/userprofile.html")));


module.exports = router;