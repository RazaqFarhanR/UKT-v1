//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const jurus = models.jurus;

//endpoint ditulis disini

//endpoint get data jurus
app.get("/", (req,res) => {
    jurus.findAll()
    .then(jurus => {
        res.json({
            count: jurus.length,
            data: jurus
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data jurus, METHOD POST, function create
app.post("/", (req,res) =>{
    let data ={
        id_siswa: req.body.id_siswa,
        jurus1A: req.body.jurus1A
    }
    jurus.create(data)
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

//endpoint untuk mengupdate data jurus, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        id_jurus : req.params.id
    }
    let data = {
        name: req.body.name
    }
    jurus.update(data, {where: param})
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

//endpoint untuk menghapus data jurus,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_jurus : req.params.id
    }
    jurus.destroy({where: param})
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