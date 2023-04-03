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
const { sequelize, Op } = require("sequelize");
const pengurus = models.pengurus;

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
//endpoint get data pengurus
app.get("/", (req,res) => {
    const imagePath = "http://localhost:8080/image/"
    pengurus.findAll()
    .then(pengurus => {
        const pengurus_with_image_url = pengurus.map((tk) => ({
            ...tk.toJSON(),
            image: `${imagePath}${tk.foto}`,
          }));
        res.json({
            count: pengurus_with_image_url.length,
            data: pengurus_with_image_url
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})
//endpoint get data pengurus berdasarkan name dan id_ranting
app.post("/name_dan_ranting", (req,res) => {
    const name = req.body.name;
    const id_ranting = req.body.id_ranting;
    pengurus.findAll({
        where: {
            name: {
                [Op.like]: '%'+name+'%'
            },
            id_ranting: {
                [Op.like]: '%'+id_ranting+'%'
            }
        }
    })
    .then(pengurus => {
        res.json({
            count: pengurus.length,
            data: pengurus
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data pengurus, METHOD POST, function create
app.post("/", upload2.single('foto'), (req,res) =>{
    let data ={
        NIW: req.body.niw,
        jabatan: req.body.jabatan,
        name: req.body.name,
        id_role: req.body.id_role,
        id_ranting: req.body.id_ranting,
        id_cabang: req.body.id_cabang,
        username: req.body.username,
        password: req.body.password,
        foto: req.file.filename,
        no_wa: req.body.no_wa
    }
    pengurus.create(data)
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

//endpoint untuk mengupdate data pengurus, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        name: req.body.name,
        id_role: req.body.id_role,
        id_ranting: req.body.id_ranting,
        username: req.body.username,
        password: req.body.password,
        no_wa: req.body.no_wa
    }
    let data = {
        name: req.body.name
    }
    pengurus.update(data, {where: param})
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

//endpoint untuk menghapus data pengurus,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_pengurus : req.params.id
    }
    pengurus.destroy({where: param})
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


module.exports = app;