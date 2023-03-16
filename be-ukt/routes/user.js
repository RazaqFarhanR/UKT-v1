//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const user = models.user;

//endpoint ditulis disini

//endpoint get data user
app.get("/", (req,res) => {
    user.findAll()
    .then(user => {
        res.json({
            count: user.length,
            data: user
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data user, METHOD POST, function create
app.post("/", (req,res) =>{
    let data ={
        username: req.body.username,
        name: req.body.name,
        id_role: req.body.id_role,
        id_cabang: req.body.id_cabang,
        password: req.body.password
    }
    user.create(data)
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

//endpoint untuk mengupdate data user, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        id_user : req.params.id
    }
    let data = {
        username: req.body.username,
        name: req.body.name,
        id_role: req.body.id_role,
        id_cabang: req.body.id_cabang,
        password: req.body.password
    }
    user.update(data, {where: param})
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

//endpoint untuk menghapus data user,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_user : req.params.id
    }
    user.destroy({where: param})
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