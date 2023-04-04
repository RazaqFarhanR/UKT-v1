//import library
const express = require('express');
const bodyParser = require('body-parser');
const { randomUUID } = require('crypto');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const lembar_soal = models.lembar_soal;

//endpoint ditulis disini

//endpoint get data lembar_soal
app.get("/", (req,res) => {
    lembar_soal.findAll()
    .then(lembar_soal => {
        res.json({
            count: lembar_soal.length,
            data: lembar_soal
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data lembar_soal, METHOD POST, function create
app.post("/", (req,res) =>{
    const id = randomUUID();
    let data ={
        id_lembar_soal: id,
        id_ranting: req.body.id_ranting,
        tipe_soal: req.body.tipe_soal
    }
    lembar_soal.create(data)
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

//endpoint untuk mengupdate data lembar_soal, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        id_lembar_soal : req.params.id
    }
    let data = {
        id_ranting: req.body.id_ranting,
        tipe_soal: req.body.tipe_soal
    }
    lembar_soal.update(data, {where: param})
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

//endpoint untuk menghapus data lembar_soal,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_lembar_soal : req.params.id
    }
    lembar_soal.destroy({where: param})
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