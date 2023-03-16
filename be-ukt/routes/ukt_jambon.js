//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const ukt_jambon = models.ukt_jambon;

//endpoint ditulis disini

//endpoint get data ukt_jambon
app.get("/", (req,res) => {
    ukt_jambon.findAll()
    .then(ukt_jambon => {
        res.json({
            count: ukt_jambon.length,
            data: ukt_jambon
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data ukt_jambon, METHOD POST, function create
app.post("/", (req,res) =>{
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
    ukt_jambon.create(data)
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

//endpoint untuk mengupdate data ukt_jambon, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        id_ukt_jambon : req.params.id
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
    ukt_jambon.update(data, {where: param})
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

//endpoint untuk menghapus data ukt_jambon,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_ukt_jambon : req.params.id
    }
    ukt_jambon.destroy({where: param})
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