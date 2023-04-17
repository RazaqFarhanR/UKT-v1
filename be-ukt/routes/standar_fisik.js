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
const standar_fisik = models.standar_fisik;

//endpoint ditulis disini

//endpoint get data standar_fisik
app.get("/", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji"), (req,res) => {
    standar_fisik.findAll()
    .then(standar_fisik => {
        res.json({
            count: standar_fisik.length,
            data: standar_fisik
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data standar_fisik, METHOD POST, function create
app.post("/", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji"), (req,res) =>{
    let data ={
        tipe_ukt: req.body.tipe_ukt,
        peserta: req.body.peserta,
        mft: req.body.mft,
        push_up: req.body.push_up,
        spir_perut_atas: req.body.spir_perut_atas,
        spir_perut_bawah: req.body.spir_perut_bawah,
        spir_dada: req.body.spir_dada,
        plank: req.body.plank,
    }
    standar_fisik.create(data)
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

//endpoint untuk mengupdate data standar_fisik, METHOD: PUT, fuction: UPDATE
app.put("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji"),(req,res) => {
    let param = {
        id_standar_fisik : req.params.id
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
    standar_fisik.update(data, {where: param})
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

//endpoint untuk menghapus data standar_fisik,METHOD: DELETE, function: destroy
app.delete("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji"), (req,res) => {
    let param = {
        id_standar_fisik : req.params.id
    }
    standar_fisik.destroy({where: param})
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