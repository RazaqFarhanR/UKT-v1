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
const standar_fisik = models.standar_fisik;

//endpoint ditulis disini

//endpoint get data standar_fisik
app.get("/", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji"), (req,res) => {
    standar_fisik.findAll({
        order: [
            ['peserta', 'ASC']
          ]
    })
    .then(standar_fisik => {
        res.json({
            count: standar_fisik.length,
            data: standar_fisik
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data standar_fisik, METHOD POST, function create
app.post("/", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji"), (req,res) =>{
    let data ={
        tipe_ukt: req.body.tipe_ukt,
        peserta: req.body.peserta,
        mft: req.body.mft,
        push_up: req.body.push_up,
        spir_perut_atas: req.body.spir_perut_atas,
        spir_perut_bawah: req.body.spir_perut_bawah,
        spir_dada: req.body.spir_dada,
        plank: req.body.plank,
    }
    standar_fisik.create(data)
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

//endpoint untuk mengedit data berdasarkan mft
app.put('/mft/:id', Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji"), (req,res) => {
    let data = [
        {
            mft: req.body.mft_remaja_laki,
        },
        {
            mft: req.body.mft_remaja_perempuan,
        },
        {
            mft: req.body.mft_privat_laki,
        },
        {
            mft: req.body.mft_privat_perempuan
        }
    ]
    standar_fisik.findAll({
        where: {
            tipe_ukt: req.params.id
        },
        order: [
            ['peserta', 'ASC']
        ]
    })
    .then((result) => {
        for(let i=0; i<4; i++){
            console.log(result[i].id_standar_fisik)
            console.log(result[i].peserta)
            const idStandarFisik = result[i].id_standar_fisik; 
            standar_fisik.update(data[i], {where:{id_standar_fisik: idStandarFisik}})
        }
        res.json({
            msg: "data has been updated"
        })
    })
    .catch((e) => {
        res.json({
            msg: e.message
        })
    })
})

//endpoint untuk mengedit data berdasarkan push up
app.put('/push_up/:id', Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji"), (req,res) => {
    let data = [
        {
            push_up: req.body.push_up_remaja_laki,
        },
        {
            push_up: req.body.push_up_remaja_perempuan,
        },
        {
            push_up: req.body.push_up_privat_laki,
        },
        {
            push_up: req.body.push_up_privat_perempuan
        }
    ]
    standar_fisik.findAll({
        where: {
            tipe_ukt: req.params.id
        },
        order: [
            ['peserta', 'ASC']
        ]
    })
    .then((result) => {
        for(let i=0; i<4; i++){
            console.log(result[i].id_standar_fisik)
            console.log(result[i].peserta)
            const idStandarFisik = result[i].id_standar_fisik; 
            standar_fisik.update(data[i], {where:{id_standar_fisik: idStandarFisik}})
        }
        res.json({
            msg: "data has been updated"
        })
    })
    .catch((e) => {
        res.json({
            msg: e.message
        })
    })
})

//endpoint untuk mengedit data berdasarkan spir_perut_atas
app.put('/spir_perut_atas/:id', Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji"), (req,res) => {
    let data = [
        {
            spir_perut_atas: req.body.spir_perut_atas_remaja_laki,
        },
        {
            spir_perut_atas: req.body.spir_perut_atas_remaja_perempuan,
        },
        {
            spir_perut_atas: req.body.spir_perut_atas_privat_laki,
        },
        {
            spir_perut_atas: req.body.spir_perut_atas_privat_perempuan
        }
    ]
    standar_fisik.findAll({
        where: {
            tipe_ukt: req.params.id
        },
        order: [
            ['peserta', 'ASC']
        ]
    })
    .then((result) => {
        for(let i=0; i<4; i++){
            console.log(result[i].id_standar_fisik)
            console.log(result[i].peserta)
            const idStandarFisik = result[i].id_standar_fisik; 
            standar_fisik.update(data[i], {where:{id_standar_fisik: idStandarFisik}})
        }
        res.json({
            msg: "data has been updated"
        })
    })
    .catch((e) => {
        res.json({
            msg: e.message
        })
    })
})

//endpoint untuk mengedit data berdasarkan spir_perut_bawah
app.put('/spir_perut_bawah/:id', Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji"), (req,res) => {
    let data = [
        {
            spir_perut_bawah: req.body.spir_perut_bawah_remaja_laki,
        },
        {
            spir_perut_bawah: req.body.spir_perut_bawah_remaja_perempuan,
        },
        {
            spir_perut_bawah: req.body.spir_perut_bawah_privat_laki,
        },
        {
            spir_perut_bawah: req.body.spir_perut_bawah_privat_perempuan
        }
    ]
    standar_fisik.findAll({
        where: {
            tipe_ukt: req.params.id
        },
        order: [
            ['peserta', 'ASC']
        ]
    })
    .then((result) => {
        for(let i=0; i<4; i++){
            console.log(result[i].id_standar_fisik)
            console.log(result[i].peserta)
            const idStandarFisik = result[i].id_standar_fisik; 
            standar_fisik.update(data[i], {where:{id_standar_fisik: idStandarFisik}})
        }
        res.json({
            msg: "data has been updated"
        })
    })
    .catch((e) => {
        res.json({
            msg: e.message
        })
    })
})

//endpoint untuk mengedit data berdasarkan spir_dada
app.put('/spir_dada/:id', Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji"), (req,res) => {
    let data = [
        {
            spir_dada: req.body.spir_dada_remaja_laki,
        },
        {
            spir_dada: req.body.spir_dada_remaja_perempuan,
        },
        {
            spir_dada: req.body.spir_dada_privat_laki,
        },
        {
            spir_dada: req.body.spir_dada_privat_perempuan
        }
    ]
    standar_fisik.findAll({
        where: {
            tipe_ukt: req.params.id
        },
        order: [
            ['peserta', 'ASC']
        ]
    })
    .then((result) => {
        for(let i=0; i<4; i++){
            console.log(result[i].id_standar_fisik)
            console.log(result[i].peserta)
            const idStandarFisik = result[i].id_standar_fisik; 
            standar_fisik.update(data[i], {where:{id_standar_fisik: idStandarFisik}})
        }
        res.json({
            msg: "data has been updated"
        })
    })
    .catch((e) => {
        res.json({
            msg: e.message
        })
    })
})

//endpoint untuk mengedit data berdasarkan plank
app.put('/plank/:id', Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji"), (req,res) => {
    let data = [
        {
            plank: req.body.plank_remaja_laki,
        },
        {
            plank: req.body.plank_remaja_perempuan,
        },
        {
            plank: req.body.plank_privat_laki,
        },
        {
            plank: req.body.plank_privat_perempuan
        }
    ]
    standar_fisik.findAll({
        where: {
            tipe_ukt: req.params.id
        },
        order: [
            ['peserta', 'ASC']
        ]
    })
    .then((result) => {
        for(let i=0; i<4; i++){
            console.log(result[i].id_standar_fisik)
            console.log(result[i].peserta)
            const idStandarFisik = result[i].id_standar_fisik; 
            standar_fisik.update(data[i], {where:{id_standar_fisik: idStandarFisik}})
        }
        res.json({
            msg: "data has been updated"
        })
    })
    .catch((e) => {
        res.json({
            msg: e.message
        })
    })
})

//endpoint untuk mengupdate data standar_fisik, METHOD: PUT, fuction: UPDATE
app.put("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji"),(req,res) => {
    let param = {
        id_standar_fisik : req.params.id
    }
    let data ={
        tipe_ukt: req.body.tipe_ukt,
        peserta: req.body.peserta,
        mft: req.body.mft,
        push_up: req.body.push_up,
        spir_perut_atas: req.body.spir_perut_atas,
        spir_perut_bawah: req.body.spir_perut_bawah,
        spir_dada: req.body.spir_dada,
        plank: req.body.plank,
    }
    standar_fisik.update(data, {where: param})
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

//endpoint untuk menghapus data standar_fisik,METHOD: DELETE, function: destroy
app.delete("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "pengurus cabang", "pengurus ranting", "penguji"), (req,res) => {
    let param = {
        id_standar_fisik : req.params.id
    }
    standar_fisik.destroy({where: param})
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