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
const senam = models.senam;

//endpoint ditulis disini

//endpoint get data senam
app.get("/", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
    senam.findAll()
    .then(senam => {
        res.json({
            count: senam.length,
            data: senam
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data senam, METHOD POST, function create
app.post("/", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) =>{
    let data ={
        id_siswa: req.body.id_siswa,
        senam69: req.body.senam69,
        senam23: req.body.senam23,
        senam14: req.body.senam14,
        senam90: req.body.senam90,
        senam61: req.body.senam61,
        senam49: req.body.senam49,
        senam59: req.body.senam59,
        senam64: req.body.senam64,
        senam12: req.body.senam12,
        senam33: req.body.senam33,
        senam44: req.body.senam44,
        senam11: req.body.senam11,
    }
    senam.create(data)
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

//endpoint untuk mengupdate data senam, METHOD: PUT, fuction: UPDATE
app.put("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
    let param = {
        id_senam : req.params.id
    }
    let data = {
        id_siswa: req.body.id_siswa,
        senam69: req.body.senam69,
        senam23: req.body.senam23,
        senam14: req.body.senam14,
        senam90: req.body.senam90,
        senam61: req.body.senam61,
        senam49: req.body.senam49,
        senam59: req.body.senam59,
        senam64: req.body.senam64,
        senam12: req.body.senam12,
        senam33: req.body.senam33,
        senam44: req.body.senam44,
        senam11: req.body.senam11,
    }
    senam.update(data, {where: param})
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

//endpoint untuk menghapus data senam,METHOD: DELETE, function: destroy
app.delete("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
    let param = {
        id_senam : req.params.id
    }
    senam.destroy({where: param})
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