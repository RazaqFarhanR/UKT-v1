//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const ukt_putih = models.ukt_putih;

//endpoint ditulis disini

//endpoint get data ukt_putih
app.get("/", (req,res) => {
    ukt_putih.findAll()
    .then(ukt_putih => {
        res.json({
            count: ukt_putih.length,
            data: ukt_putih
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data ukt_putih, METHOD POST, function create
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
    ukt_putih.create(data)
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

//endpoint untuk mengupdate data ukt_putih, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        id_ukt_putih : req.params.id
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
    ukt_putih.update(data, {where: param})
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

//endpoint untuk menghapus data ukt_putih,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_ukt_putih : req.params.id
    }
    ukt_putih.destroy({where: param})
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