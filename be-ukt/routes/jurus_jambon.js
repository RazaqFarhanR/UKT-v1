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
const jurus_jambon = models.jurus_jambon;

//endpoint ditulis disini

//endpoint get data jurus_jambon
app.get("/", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji"), (req,res) => {
    jurus_jambon.findAll()
    .then(jurus_jambon => {
        res.json({
            count: jurus_jambon.length,
            data: jurus_jambon
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data jurus_jambon, METHOD POST, function create
app.post("/", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji"), (req,res) =>{
    let data ={
        id_siswa: req.body.id_siswa,
        jurus1A: req.body.jurus1A,
        jurus1B: req.body.jurus1B,
        jurus2A: req.body.jurus2A,
        jurus2B: req.body.jurus2B,
        jurus3A: req.body.jurus3A,
        jurus3B: req.body.jurus3B,
        jurus4A: req.body.jurus4A,
        jurus4B: req.body.jurus4B,
        jurus4C: req.body.jurus4C,
        jurus4D: req.body.jurus4D,
        jurus5: req.body.jurus5,
        jurus6: req.body.jurus6,
    }
    jurus_jambon.create(data)
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

//endpoint untuk mengupdate data jurus_jambon, METHOD: PUT, fuction: UPDATE
app.put("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji"), (req,res) => {
    let param = {
        id_jurus_jambon : req.params.id
    }
    let data ={
        id_siswa: req.body.id_siswa,
        jurus1A: req.body.jurus1A,
        jurus1B: req.body.jurus1B,
        jurus2A: req.body.jurus2A,
        jurus2B: req.body.jurus2B,
        jurus3A: req.body.jurus3A,
        jurus3B: req.body.jurus3B,
        jurus4A: req.body.jurus4A,
        jurus4B: req.body.jurus4B,
        jurus4C: req.body.jurus4C,
        jurus4D: req.body.jurus4D,
        jurus5: req.body.jurus5,
        jurus6: req.body.jurus6,
    }
    jurus_jambon.update(data, {where: param})
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

//endpoint untuk menghapus data jurus_jambon,METHOD: DELETE, function: destroy
app.delete("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji"), (req,res) => {
    let param = {
        id_jurus_jambon : req.params.id
    }
    jurus_jambon.destroy({where: param})
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