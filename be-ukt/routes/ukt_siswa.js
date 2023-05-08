//import library
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const Auth = require('../middleware/Auth.js');
const verifyRoles = require("../middleware/verifyRoles");

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const ukt_siswa = models.ukt_siswa;

//endpoint ditulis disini

//endpoint get data ukt_siswa
app.get("/", Auth, verifyRoles("admin", "super admin", "admin ranting", "admin cabang", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
    ukt_siswa.findAll()
    .then(ukt_siswa => {
        res.json({
            count: ukt_siswa.length,
            data: ukt_siswa
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})
//endpoint get data ukt_siswa by tipe ukt
app.get("/ukt/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "admin cabang", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting",), (req,res) => {
    ukt_siswa.findAll({
        where: {
            tipe_ukt: req.params.id
        },
        include: [
            {
                model: models.siswa,
                as: "siswa_ukt_siswa",
                attributes: ['name','tingkatan'],
                include: [
                    {
                        model: models.ranting,
                        as: "siswa_ranting",
                        attributes: ['name']
                    }
                ]
            }
        ]
    })
    .then(ukt_siswa => {
        res.json({
            count: ukt_siswa.length,
            data: ukt_siswa
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})
//endpoint get data ukt_siswa by tipe id siswa
app.get("/siswa/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "admin cabang", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting", "siswa"), (req,res) => {
    ukt_siswa.findOne({
        where: {
            id_siswa: req.params.id
        }
    })
    .then(ukt_siswa => {
        res.json({
            data: ukt_siswa
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data ukt_siswa, METHOD POST, function create
app.post("/", Auth, verifyRoles("admin", "super admin", "admin ranting", "admin cabang", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting", "siswa"), (req,res) =>{
    let data ={     
        tipe_ukt: req.body.tipe_ukt,
        id_event: req.body.id_event,
        id_siswa: req.body.id_siswa,
        rayon: req.body.rayon,
        keshan: req.body.keshan,
        senam: req.body.senam,
        jurus: req.body.jurus,
        fisik: req.body.fisik > 100 ? 100 : req.body.fisik,
        teknik: req.body.teknik,
        sambung: req.body.sambung
    }
    ukt_siswa.create(data)
    .then(result => {
        res.json({
            message: "data has been inserted",
            data: result
        })
    })
    .catch(error =>{
        res.json({
            message: error.message
        })
    })
}) 

//endpoint untuk mengupdate data ukt_siswa, METHOD: PUT, fuction: UPDATE
app.put("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "admin cabang", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting", "siswa"), (req,res) => {
    let param = {
        id_ukt_siswa : req.params.id
    }
    let data ={     
        tipe_ukt: req.body.tipe_ukt,
        id_event: req.body.id_event,
        id_siswa: req.body.id_siswa,
        rayon: req.body.rayon,
        keshan: req.body.keshan,
        senam: req.body.senam,
        jurus: req.body.jurus,
        fisik: req.body.fisik > 100 ? 100 : req.body.fisik,
        teknik: req.body.teknik,
        sambung: req.body.sambung
    }
    ukt_siswa.update(data, {where: param})
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

//endpoint untuk menghapus data ukt_siswa,METHOD: DELETE, function: destroy
app.delete("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "admin cabang", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
    let param = {
        id_ukt_siswa : req.params.id
    }
    ukt_siswa.destroy({where: param})
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