//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const kunci_soal = models.kunci_soal;

//endpoint ditulis disini

//endpoint get data kunci_soal
app.get("/", (req,res) => {
    kunci_soal.findAll()
    .then(kunci_soal => {
        res.json({
            count: kunci_soal.length,
            data: kunci_soal
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data kunci_soal, METHOD POST, function create
app.post("/", (req,res) =>{
    let data ={
        id_soal: req.body.id_soal,
        opsi: req.body.opsi
    }
    kunci_soal.create(data)
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

//endpoint untuk mengupdate data kunci_soal, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        id_kunci_soal : req.params.id
    }
    let data = {
        id_soal: req.body.id_soal,
        opsi: req.body.opsi
    }
    kunci_soal.update(data, {where: param})
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

//endpoint untuk menghapus data kunci_soal,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_kunci_soal : req.params.id
    }
    kunci_soal.destroy({where: param})
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