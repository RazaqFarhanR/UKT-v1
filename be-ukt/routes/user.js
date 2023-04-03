//import library
const express = require('express');
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const user = models.user;

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan";

//konfigurasi proses upload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // set file storage
      cb(
        null,
        "C:/Users/RAFI DUTA/Documents/KODING/REACT JS/UKT/be-ukt/image"
      );
    },
    filename: (req, file, cb) => {
      // generate file name
      cb(null, "foto-" + Date.now() + path.extname(file.originalname));
    },
  });
  
  let upload2 = multer({ storage: storage });  

//endpoint ditulis disini

//endpoint get data user
app.get("/", (req,res) => {
    const imagePath = "http://localhost:8080/image/"

    user.findAll()
    .then(user => {
        // Map over the tipe_kamar array and add the image URL to each object
      const user_with_image_url = user.map((tk) => ({
        ...tk.toJSON(),
        image: `${imagePath}${tk.foto}`,
      }));
        res.json({
            count: user_with_image_url.length,
            data: user_with_image_url
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data user, METHOD POST, function create
app.post("/", upload2.single('foto'), (req,res) =>{
    // const password_bytes = req.body.password.encode('utf-8')
    // const md5_hash = haslib.md5()
    // md5_hash.update(password_bytes);
    // const hashed_password = md5_hash.hexdigest(); 
    let data ={
        NIW: req.body.niw,
        username: req.body.username,
        name: req.body.name,
        id_role: req.body.id_role,
        id_ranting: req.body.id_ranting,
        foto: req.file.filename,
        password: req.body.password
    }
    user.create(data)
    .then(result => {
        res.json({
            message: "data has been inserted"
        })
    })
    .catch(error =>{
        res.json({
            message: error.message
        })
    })
}) 

//endpoint untuk mengupdate data user, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        id_user : req.params.id
    }
    let data = {
        username: req.body.username,
        name: req.body.name,
        id_role: req.body.id_role,
        id_cabang: req.body.id_cabang,
        password: req.body.password
    }
    user.update(data, {where: param})
    .then(result => {
        res.json({
            message : "data has been updated"
        })
    })
    .catch(error => {
        res.json({
            message  : error.message
        })
    })
})

//endpoint untuk menghapus data user,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_user : req.params.id
    }
    user.destroy({where: param})
    .then(result => {
        res.json({
            massege : "data has been deleted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint login user (authorization), METHOD: POST, function: findOne
app.post("/auth", async (req,res) => {
    let data = {
        username: req.body.username,
        password: req.body.password
    }

    //cari data user yang username dan password sama dengan input
    let result = await user.findOne({where: data})
    if(result){
        //ditemukan
        //set payload from data
        let payload = JSON.stringify({
            id_user: result.id_user,
            username: result.username
        })

        // generate token based on payload and secret_key
        let token = jwt.sign(payload, SECRET_KEY)

        //set output
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }
    else{
        //tidak ditemukan
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app;