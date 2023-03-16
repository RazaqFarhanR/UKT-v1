//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const pengurus = models.pengurus;

//endpoint ditulis disini

//endpoint get data pengurus
app.get("/", (req,res) => {
    pengurus.findAll()
    .then(pengurus => {
        res.json({
            count: pengurus.length,
            data: pengurus
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data pengurus, METHOD POST, function create
app.post("/", (req,res) =>{
    let data ={
        name: req.body.name,
        id_role: req.body.id_role,
        id_ranting: req.body.id_ranting,
        username: req.body.username,
        password: req.body.password,
        no_wa: req.body.no_wa
    }
    pengurus.create(data)
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

//endpoint untuk mengupdate data pengurus, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        name: req.body.name,
        id_role: req.body.id_role,
        id_ranting: req.body.id_ranting,
        username: req.body.username,
        password: req.body.password,
        no_wa: req.body.no_wa
    }
    let data = {
        name: req.body.name
    }
    pengurus.update(data, {where: param})
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

//endpoint untuk menghapus data pengurus,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_pengurus : req.params.id
    }
    pengurus.destroy({where: param})
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