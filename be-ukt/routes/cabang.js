//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const cabang = models.cabang;

//endpoint ditulis disini

//endpoint get data cabang
app.get("/", (req,res) => {
    cabang.findAll()
    .then(cabang => {
        res.json({
            count: cabang.length,
            data: cabang
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data cabang, METHOD POST, function create
app.post("/", (req,res) =>{
    let data ={
        name: req.body.name,
    }
    cabang.create(data)
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

//endpoint untuk mengupdate data cabang, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        id_cabang : req.params.id
    }
    let data = {
        name: req.body.name
    }
    cabang.update(data, {where: param})
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

//endpoint untuk menghapus data cabang,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_cabang : req.params.id
    }
    cabang.destroy({where: param})
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