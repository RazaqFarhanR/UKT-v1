//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const event = models.event;

//endpoint ditulis disini

//endpoint get data event
app.get("/", (req,res) => {
    event.findAll()
    .then(event => {
        res.json({
            count: event.length,
            data: event
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data event, METHOD POST, function create
app.post("/", (req,res) =>{
    let data ={
        name: req.body.name,
        tanggal: req.body.tanggal,
        tipe: req.body.tipe
    }
    event.create(data)
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

//endpoint untuk mengupdate data event, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        id_event : req.params.id
    }
    let data = {
        name: req.body.name
    }
    event.update(data, {where: param})
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

//endpoint untuk menghapus data event,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_event : req.params.id
    }
    event.destroy({where: param})
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