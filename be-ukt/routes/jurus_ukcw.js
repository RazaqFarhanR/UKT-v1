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
const jurus_ukcw = models.jurus_ukcw;

//endpoint ditulis disini

//endpoint get data jurus_ukcw
app.get("/", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting), (req,res) => {
    jurus_ukcw.findAll()
    .then(jurus_ukcw => {
        res.json({
            count: jurus_ukcw.length,
            data: jurus_ukcw
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data jurus_ukcw, METHOD POST, function create
app.post("/", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting), (req,res) =>{
    let data ={
        id_siswa: req.body.id_siswa,
        jurus1A: req.body.jurus1A,
        jurus1B: req.body.jurus1B,
        jurus2A: req.body.jurus2A,
        jurus2B: req.body.jurus2B,
        jurus3A: req.body.jurus3A,
        jurus3B: req.body.jurus3B,
        jurus4A: req.body.jurus4A,
        jurus4B: req.body.jurus4B,
        jurus4C: req.body.jurus4C,
        jurus4D: req.body.jurus4D,
        jurus5: req.body.jurus5,
        jurus6: req.body.jurus6,
        jurus7A: req.body.jurus7A,
        jurus7B: req.body.jurus7B,
        jurus8A: req.body.jurus8A,
        jurus8B: req.body.jurus8B,
        jurus8C: req.body.jurus8C,
        jurus9: req.body.jurus9,
        jurus10A: req.body.jurus10A,
        jurus10B: req.body.jurus10B,
        jurus11A: req.body.jurus11A,
        jurus11B: req.body.jurus11B,
        jurus12: req.body.jurus12,
        jurus13: req.body.jurus13,
        jurus14A: req.body.jurus14A,
        jurus14B: req.body.jurus14B,
        jurus15: req.body.jurus15,
        jurus16A1: req.body.jurus16A1,
        jurus16A2: req.body.jurus16A2,
        jurus16B: req.body.jurus16B,
        jurus17A: req.body.jurus17A,
        jurus17B: req.body.jurus17B,
        jurus18A: req.body.jurus18A,
        jurus18B: req.body.jurus18B,
        jurus19A: req.body.jurus19A,
        jurus19B: req.body.jurus19B,
        jurus20A: req.body.jurus20A,
        jurus20B: req.body.jurus20B,
        jurus21: req.body.jurus21,
        jurus22: req.body.jurus22,
        jurus23A: req.body.jurus23A,
        jurus23B: req.body.jurus23B,
        jurus24A: req.body.jurus24A,
        jurus24B: req.body.jurus24B,
        jurus25A: req.body.jurus25A,
        jurus25B: req.body.jurus25B,
        jurus26: req.body.jurus26,
        jurus27A1: req.body.jurus27A1,
        jurus27A2: req.body.jurus27A2,
        jurus27A3: req.body.jurus27A3,
        jurus27B: req.body.jurus27B,
        jurus28: req.body.jurus28,
        jurus29A: req.body.jurus29A,
        jurus29B: req.body.jurus29B,
        jurus30: req.body.jurus30,
        jurus31: req.body.jurus31,
        jurus32: req.body.jurus32,
        jurus33: req.body.jurus33,
        jurus34: req.body.jurus34,
        jurus35: req.body.jurus35
    }
    jurus_ukcw.create(data)
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

//endpoint untuk mengupdate data jurus_ukcw, METHOD: PUT, fuction: UPDATE
app.put("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting), (req,res) => {
    let param = {
        id_jurus_ukcw : req.params.id
    }
    let data ={
        id_siswa: req.body.id_siswa,
        jurus1A: req.body.jurus1A,
        jurus1B: req.body.jurus1B,
        jurus2A: req.body.jurus2A,
        jurus2B: req.body.jurus2B,
        jurus3A: req.body.jurus3A,
        jurus3B: req.body.jurus3B,
        jurus4A: req.body.jurus4A,
        jurus4B: req.body.jurus4B,
        jurus4C: req.body.jurus4C,
        jurus4D: req.body.jurus4D,
        jurus5: req.body.jurus5,
        jurus6: req.body.jurus6,
        jurus7A: req.body.jurus7A,
        jurus7B: req.body.jurus7B,
        jurus8A: req.body.jurus8A,
        jurus8B: req.body.jurus8B,
        jurus8C: req.body.jurus8C,
        jurus9: req.body.jurus9,
        jurus10A: req.body.jurus10A,
        jurus10B: req.body.jurus10B,
        jurus11A: req.body.jurus11A,
        jurus11B: req.body.jurus11B,
        jurus12: req.body.jurus12,
        jurus13: req.body.jurus13,
        jurus14A: req.body.jurus14A,
        jurus14B: req.body.jurus14B,
        jurus15: req.body.jurus15,
        jurus16A1: req.body.jurus16A1,
        jurus16A2: req.body.jurus16A2,
        jurus16B: req.body.jurus16B,
        jurus17A: req.body.jurus17A,
        jurus17B: req.body.jurus17B,
        jurus18A: req.body.jurus18A,
        jurus18B: req.body.jurus18B,
        jurus19A: req.body.jurus19A,
        jurus19B: req.body.jurus19B,
        jurus20A: req.body.jurus20A,
        jurus20B: req.body.jurus20B,
        jurus21: req.body.jurus21,
        jurus22: req.body.jurus22,
        jurus23A: req.body.jurus23A,
        jurus23B: req.body.jurus23B,
        jurus24A: req.body.jurus24A,
        jurus24B: req.body.jurus24B,
        jurus25A: req.body.jurus25A,
        jurus25B: req.body.jurus25B,
        jurus26: req.body.jurus26,
        jurus27A1: req.body.jurus27A1,
        jurus27A2: req.body.jurus27A2,
        jurus27A3: req.body.jurus27A3,
        jurus27B: req.body.jurus27B,
        jurus28: req.body.jurus28,
        jurus29A: req.body.jurus29A,
        jurus29B: req.body.jurus29B,
        jurus30: req.body.jurus30,
        jurus31: req.body.jurus31,
        jurus32: req.body.jurus32,
        jurus33: req.body.jurus33,
        jurus34: req.body.jurus34,
        jurus35: req.body.jurus35
    }
    jurus_ukcw.update(data, {where: param})
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

//endpoint untuk menghapus data jurus_ukcw,METHOD: DELETE, function: destroy
app.delete("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting), (req,res) => {
    let param = {
        id_jurus_ukcw : req.params.id
    }
    jurus_ukcw.destroy({where: param})
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