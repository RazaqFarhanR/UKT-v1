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
const { sequelize, Op } = require("sequelize");
const siswa = models.siswa;
const ranting = models.ranting
const event = models.event;
const rayon = models.rayon;

//endpoint ditulis disini

//endpoint get data siswa
app.get("/", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
    siswa.findAll({        
        include: [
            {
                model: ranting,
                as: "siswa_ranting",
                attributes: ['name'],
                required: false,
            },
            {
                model: event,
                as: "siswa_event",
                attributes: ['name'],
                required: false
            },
        ]
    })
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
app.get("/event/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
    siswa.findAll({       
        where: {
            id_event: req.params.id
        }, 
        include: [
            {
                model: ranting,
                as: "siswa_ranting",
                attributes: ['name'],
                required: false,
            },
            {
                model: event,
                as: "siswa_event",
                attributes: ['name'],
                required: false
            },
        ]
    })
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

app.get("/ranting/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
    const id_ranting = req.params.id;
    siswa
    .findAll({
      where: {
        id_ranting: id_ranting
      },
      include: [
        {
            model: ranting,
            as: "siswa_ranting",
            attributes: ['name'],
            required: false,
        },
        {
            model: event,
            as: "siswa_event",
            attributes: ['name'],
            required: false
        },
    ]
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

app.post("/nis", (req, res) => {
    siswa.findAll({
        where: {
            nis: req.body.nis
        },
    })
    .then((result) => {
        const data = {
            password: req.body.password
        }
        if(result) {
            siswa.update(data, {where: {
             nis: req.body.nis   
            }})
            .then((result) => {
                console.log(result[0]);
                res.json({
                    count: result.length,
                    message: "data has been updated"
                })
            })
            .catch(e => {
                res.json({
                    message: e.message
                })
            })
        }
    })
    .catch(e => {
        res.json({
            message: e.message
        })
    })
})

//endpoint untuk menyimpan data siswa, METHOD POST, function create
app.post("/", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) =>{    
    let data ={
        id_event: req.body.id_event,
        nis: req.body.nis,
        nomor_urut: req.body.nomor_urut,
        name: req.body.name,
        id_role: req.body.id_role,
        jenis_kelamin: req.body.jenis_kelamin,
        jenis_latihan: req.body.jenis_latihan,
        peserta: req.body.jenis_latihan+" - "+req.body.jenis_kelamin,
        tipe_ukt: req.body.tipe_ukt,
        id_ranting: req.body.id_ranting,
        rayon: req.body.rayon,
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
app.put("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
    let param = {
        id_siswa : req.params.id
    }
    let data ={
        id_event: req.body.id_event,
        nis: req.body.nis,
        nomor_urut: req.body.nomor_urut,
        name: req.body.name,
        id_role: req.body.id_role,
        jenis_kelamin: req.body.jenis_kelamin,
        jenis_latihan: req.body.jenis_latihan,
        peserta: req.body.jenis_latihan+" - "+req.body.jenis_kelamin,
        tipe_ukt: req.body.tipe_ukt,
        id_ranting: req.body.id_ranting,
        rayon: req.body.rayon,
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
app.delete("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
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