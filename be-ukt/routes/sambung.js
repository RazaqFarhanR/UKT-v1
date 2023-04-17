//import library
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const Auth = require("../middleware/Auth.js");
const verifyRoles = require("../middleware/verifyRoles");
//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import model
const models = require("../models/index");
const sambung = models.sambung;
const detail_sambung = models.detail_sambung;
const siswa = models.siswa;

//endpoint ditulis disini

//endpoint get data sambung
app.get(
  "/",
  Auth,
  verifyRoles(
    "admin",
    "super admin",
    "admin ranting",
    "pengurus cabang",
    "pengurus ranting",
    "penguji"
  ),
  (req, res) => {
    sambung
      .findAll({
        include: [
            {
                model: detail_sambung,
                as: "detail_sambung",
                attributes: ['posisi','id_siswa','nilai'],
                include: [
                    {
                        model: siswa,
                        as: "sambung_siswa",
                        attributes: ['name']
                    }
                ]
            }
        ]
      })
      .then((sambung) => {
        res.json({
          count: sambung.length,
          data: sambung,
        });
      })
      .catch((error) => {
        res.json({
          message: error.message,
        });
      });
  }
);

//endpoint untuk menyimpan data sambung, METHOD POST, function create
app.post(
  "/",
  Auth,
  verifyRoles(
    "admin",
    "super admin",
    "admin ranting",
    "pengurus cabang",
    "pengurus ranting",
    "penguji"
  ),
  (req, res) => {
    let data = {
      id_penguji: req.body.id_penguji,
    };
    sambung
      .create(data)
      .then(async (result) => {
        console.log(result.dataValues.id_sambung);
        let id_sambung = result.dataValues.id_sambung;
        let data = [
          {
            id_sambung: id_sambung,
            posisi: 1,
            id_siswa: req.body.id_siswa1,
            nilai: req.body.nilai1,
          },
          {
            id_sambung: id_sambung,
            posisi: 2,
            id_siswa: req.body.id_siswa2,
            nilai: req.body.nilai2,
          },
        ];
        for (let i = 0; i < 2; i++) {
          if (data[i]) {
            let dataDetail = detail_sambung.build(data[i]);
            await dataDetail.save();
          } else {
            console.log(`data ${i} tidak ditemukan`);
          }
        }
        const response = {
          message: "data has been inserted",
          data: {
            id_siswa1: req.body.id_siswa1,
            id_siswa2: req.body.id_siswa2,
          },
        };
        res.json(response);
      })
      .catch((error) => {
        res.json({
          message: error.message,
        });
      });
  }
);

//endpoint untuk mengupdate data sambung, METHOD: PUT, fuction: UPDATE
app.put(
  "/:id",
  Auth,
  verifyRoles(
    "admin",
    "super admin",
    "admin ranting",
    "pengurus cabang",
    "pengurus ranting",
    "penguji"
  ),
  (req, res) => {
    let param = {
      id_sambung: req.params.id,
    };
    let data = {
      name: req.body.name,
    };
    sambung
      .update(data, { where: param })
      .then((result) => {
        res.json({
          message: "data has been updated",
        });
      })
      .catch((error) => {
        res.json({
          message: error.message,
        });
      });
  }
);

//endpoint untuk menghapus data sambung,METHOD: DELETE, function: destroy
app.delete(
  "/:id",
  Auth,
  verifyRoles(
    "admin",
    "super admin",
    "admin ranting",
    "pengurus cabang",
    "pengurus ranting",
    "penguji"
  ),
  (req, res) => {
    let param = {
      id_sambung: req.params.id,
    };
    sambung
      .destroy({ where: param })
      .then((result) => {
        res.json({
          massege: "data has been deleted",
        });
      })
      .catch((error) => {
        res.json({
          message: error.message,
        });
      });
  }
);

module.exports = app;
