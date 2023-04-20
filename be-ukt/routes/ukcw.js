//import library
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const Auth = require('../middleware/Auth.js');
const verifyRoles = require("../middleware/verifyRoles");
//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const ukcw = models.ukcw;

//endpoint ditulis disini

//endpoint get data ukcw
app.get("/", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting), (req,res) => {
    ukcw.findAll()
    .then(ukcw => {
        res.json({
            count: ukcw.length,
            data: ukcw
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data ukcw, METHOD POST, function create
app.post("/", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting), (req,res) =>{
    let data ={
        id_siswa: req.body.id_siswa,
        id_rayon: req.body.id_rayon,
        keshan: req.body.keshan,
        senam: req.body.senam,
        jurus: req.body.jurus,
        fisik: req.body.fisik,
        teknik: req.body.teknik,
        sambung: req.body.sambung
    }
    ukcw.create(data)
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

//endpoint untuk mengupdate data ukcw, METHOD: PUT, fuction: UPDATE
app.put("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting),(req,res) => {
    let param = {
        id_ukcw : req.params.id
    }
    let data = {
        id_siswa: req.body.id_siswa,
        id_rayon: req.body.id_rayon,
        keshan: req.body.keshan,
        senam: req.body.senam,
        jurus: req.body.jurus,
        fisik: req.body.fisik,
        teknik: req.body.teknik,
        sambung: req.body.sambung
    }
    ukcw.update(data, {where: param})
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

//endpoint untuk menghapus data ukcw,METHOD: DELETE, function: destroy
app.delete("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting), (req,res) => {
    let param = {
        id_ukcw : req.params.id
    }
    ukcw.destroy({where: param})
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