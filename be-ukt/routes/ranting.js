//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const ranting = models.ranting;

//endpoint ditulis disini

//endpoint get data ranting
app.get("/", (req,res) => {
    ranting.findAll()
    .then(ranting => {
        res.json({
            count: ranting.length,
            data: ranting
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data ranting, METHOD POST, function create
app.post("/", (req,res) =>{
    let data ={
        id_cabang: req.body.id_cabang,
        name: req.body.name,
    }
    ranting.create(data)
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

//endpoint untuk mengupdate data ranting, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        id_ranting: req.params.id
    }
    let data = {
        id_cabang: req.body.id_cabang,
        name: req.body.name,
    }
    ranting.update(data, {where: param})
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

//endpoint untuk menghapus data ranting,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_ranting : req.params.id
    }
    ranting.destroy({where: param})
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