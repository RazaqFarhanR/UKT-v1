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
const session = models.session;

//endpoint ditulis disini

//endpoint get data session
app.get("/", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"),(req,res) => {
    session.findAll()
    .then(session => {
        res.json({
            count: session.length,
            data: session
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data session, METHOD POST, function create
app.post("/", Auth, (req,res) =>{
    let data ={
        id_lembar_soal: req.body.id_lembar_soal,
        id_siswa: req.body.id_siswa,
        nilai: req.body.nilai,
        waktu_pengerjaan: req.body.waktu_pengerjaan
    }
    session.create(data)
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

//endpoint untuk mengupdate data session, METHOD: PUT, fuction: UPDATE
app.put("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
    let param = {
        id_session : req.params.id
    }
    let data = {
        id_lembar_soal: req.body.id_lembar_soal,
        id_siswa: req.body.id_siswa,
        nilai: req.body.nilai,
        waktu_pengerjaan: req.body.waktu_pengerjaan
    }
    session.update(data, {where: param})
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

//endpoint untuk menghapus data session,METHOD: DELETE, function: destroy
app.delete("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"),(req,res) => {
    let param = {
        id_session : req.params.id
    }
    session.destroy({where: param})
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