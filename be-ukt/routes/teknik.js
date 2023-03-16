//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const teknik = models.teknik;

//endpoint ditulis disini

//endpoint get data teknik
app.get("/", (req,res) => {
    teknik.findAll()
    .then(teknik => {
        res.json({
            count: teknik.length,
            data: teknik
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data teknik, METHOD POST, function create
app.post("/", (req,res) =>{
    let data ={        
        id_siswa: req.body.id_siswa,
        teknik1: req.body.teknik1,
        teknik2: req.body.teknik2,
        teknik3: req.body.teknik3,
        teknik4: req.body.teknik4,
        teknik5: req.body.teknik5,
        teknik6: req.body.teknik6,
    }
    teknik.create(data)
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

//endpoint untuk mengupdate data teknik, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        id_teknik : req.params.id
    }
    let data = {
        id_siswa: req.body.id_siswa,
        teknik1: req.body.teknik1,
        teknik2: req.body.teknik2,
        teknik3: req.body.teknik3,
        teknik4: req.body.teknik4,
        teknik5: req.body.teknik5,
        teknik6: req.body.teknik6,
    }
    teknik.update(data, {where: param})
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

//endpoint untuk menghapus data teknik,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_teknik : req.params.id
    }
    teknik.destroy({where: param})
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