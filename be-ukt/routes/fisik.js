//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const fisik = models.fisik;

//endpoint ditulis disini

//endpoint get data fisik
app.get("/", (req,res) => {
    fisik.findAll()
    .then(fisik => {
        res.json({
            count: fisik.length,
            data: fisik
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data fisik, METHOD POST, function create
app.post("/", (req,res) =>{
    let data ={
        id_siswa: req.body.id_siswa,
        mft: req.body.mft,
        push_up: req.body.push_up,
        spir_perut_atas: req.body.spir_perut_atas,
        spir_perut_bawah: req.body.spir_perut_bawah,
        spir_dada: req.body.spir_dada,
        plank: req.body.plank,
    }
    fisik.create(data)
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

//endpoint untuk mengupdate data fisik, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        id_fisik : req.params.id
    }
    let data = {
        name: req.body.name
    }
    fisik.update(data, {where: param})
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

//endpoint untuk menghapus data fisik,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_fisik : req.params.id
    }
    fisik.destroy({where: param})
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