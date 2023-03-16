//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const penguji = models.penguji;

//endpoint ditulis disini

//endpoint get data penguji
app.get("/", (req,res) => {
    penguji.findAll()
    .then(penguji => {
        res.json({
            count: penguji.length,
            data: penguji
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data penguji, METHOD POST, function create
app.post("/", (req,res) =>{
    let data ={
        name: req.body.name,
        id_role: req.body.id_role,
        id_ranting: req.body.id_ranting,
        username: req.body.username,
        password: req.body.password,
        no_wa: req.body.no_wa
    }
    penguji.create(data)
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

//endpoint untuk mengupdate data penguji, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        id_penguji : req.params.id
    }
    let data = {
        name: req.body.name,
        id_role: req.body.id_role,
        id_ranting: req.body.id_ranting,
        username: req.body.username,
        password: req.body.password,
        no_wa: req.body.no_wa
    }
    penguji.update(data, {where: param})
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

//endpoint untuk menghapus data penguji,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_penguji : req.params.id
    }
    penguji.destroy({where: param})
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