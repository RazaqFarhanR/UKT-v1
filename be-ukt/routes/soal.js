//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const soal = models.soal;

//endpoint ditulis disini

//endpoint get data soal
app.get("/", (req,res) => {
    soal.findAll()
    .then(soal => {
        res.json({
            count: soal.length,
            data: soal
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data soal, METHOD POST, function create
app.post("/", (req,res) =>{
    let data ={
        id_lembar_soal: req.body.id_lembar_soal,
        pertanyaan: req.body.pertanyaan,
        opsi1: req.body.opsi1,
        opsi2: req.body.opsi2,
        opsi3: req.body.opsi3,
        opsi4: req.body.opsi4
    }
    soal.create(data)
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

//endpoint untuk mengupdate data soal, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        id_soal : req.params.id
    }
    let data = {
        id_lembar_soal: req.body.id_lembar_soal,
        pertanyaan: req.body.pertanyaan,
        opsi1: req.body.opsi1,
        opsi2: req.body.opsi2,
        opsi3: req.body.opsi3,
        opsi4: req.body.opsi4
    }
    soal.update(data, {where: param})
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

//endpoint untuk menghapus data soal,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_soal : req.params.id
    }
    soal.destroy({where: param})
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