//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const { sequelize, Op } = require("sequelize");
const siswa = models.siswa;

//endpoint ditulis disini

//endpoint get data siswa
app.get("/", (req,res) => {
    siswa.findAll()
    .then(siswa => {
        res.json({
            count: siswa.length,
            data: siswa
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})


app.post("/name_dan_ranting", (req,res) => {
    const name = req.body.name;
    const id_ranting = req.body.id_ranting;
    siswa
    .findAll({
      where: {
        name: {
            [Op.like]: '%'+name+'%'
          },
        id_ranting: {
            [Op.like]: '%'+id_ranting+'%'
        } 
      },
    })
    .then((siswa) => {
      res.json({
        count: siswa.length,
        siswa: siswa,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    }); 
})

//endpoint untuk menyimpan data siswa, METHOD POST, function create
app.post("/", (req,res) =>{
    
    let data ={
        nis: req.body.nis,
        name: req.body.name,
        id_role: req.body.id_role,
        jenis_latihan: req.body.jenis_latihan,
        jenis_kelamin: req.body.jenis_kelamin,
        id_ranting: req.body.id_ranting,
        id_rayon: req.body.id_rayon,
        tingkatan: req.body.tingkatan,
    }
    siswa.create(data)
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

//endpoint untuk meng UPDATE data siswa, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        id_siswa : req.params.id
    }
    let data = {
        nis: req.body.nis,
        name: req.body.name,
        id_role: req.body.id_role,
        jenis_latihan: req.body.jenis_latihan,
        jenis_kelamin: req.body.jenis_kelamin,
        id_ranting: req.body.id_ranting,
        id_rayon: req.body.id_rayon,
        tingkatan: req.body.tingkatan,
    }
    siswa.update(data, {where: param})
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

//endpoint untuk menghapus data siswa,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_siswa : req.params.id
    }
    siswa.destroy({where: param})
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