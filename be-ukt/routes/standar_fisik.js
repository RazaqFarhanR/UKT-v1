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
const standar_fisik = models.standar_fisik;

//endpoint ditulis disini

//endpoint get data standar_fisik
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
    standar_fisik
      .findAll({
        order: [["peserta", "ASC"]],
      })
      .then((standar_fisik) => {
        res.json({
          count: standar_fisik.length,
          data: standar_fisik,
        });
      })
      .catch((error) => {
        res.json({
          message: error.message,
        });
      });
  }
);
app.get("/jenis_latihan/:id", Auth,
  verifyRoles(
    "admin",
    "super admin",
    "admin ranting",
    "pengurus cabang",
    "pengurus ranting",
    "penguji cabang",
    "penguji ranting"
  ),
  (req, res) => {
    standar_fisik
      .findAll({
        where: {
          tipe_ukt: req.params.id,
        },
      })
      .then((standar_fisik) => {
        const data = [];
        const mft = [];
        const push_up = [];
        const spir_perut_atas = [];
        const spir_perut_bawah = [];
        const spir_dada = [];
        const plank = [];

        let mftPeserta = [
          {
            tipe_peserta: "mft_remaja_laki_laki",
          },
          {
            tipe_peserta: "mft_remaja_perempuan",
          },
          {
            tipe_peserta: "mft_privat_laki_laki",
          },
          {
            tipe_peserta: "mft_privat_perempuan",
          },
        ]
        let pushUpPeserta = [
          {
            tipe_peserta: "pushup_remaja_laki_laki",
          },
          {
            tipe_peserta: "pushup_remaja_perempuan",
          },
          {
            tipe_peserta: "pushup_privat_laki_laki",
          },
          {
            tipe_peserta: "pushup_privat_perempuan",
          },
        ]
        let spirPerutAtasPeserta = [
          {
            tipe_peserta: "spirperutatas_remaja_laki_laki",
          },
          {
            tipe_peserta: "spirperutatas_remaja_perempuan",
          },
          {
            tipe_peserta: "spirperutatas_privat_laki_laki",
          },
          {
            tipe_peserta: "spirperutatas_privat_perempuan",
          },
        ]
        let spirPerutBawahPeserta = [
          {
            tipe_peserta: "spirperutbawah_remaja_laki_laki",
          },
          {
            tipe_peserta: "spirperutbawah_remaja_perempuan",
          },
          {
            tipe_peserta: "spirperutbawah_privat_laki_laki",
          },
          {
            tipe_peserta: "spirperutbawah_privat_perempuan",
          },
        ]
        let spirDadaPeserta = [
          {
            tipe_peserta: "spirdada_remaja_laki_laki",
          },
          {
            tipe_peserta: "spirdada_remaja_perempuan",
          },
          {
            tipe_peserta: "spirdada_privat_laki_laki",
          },
          {
            tipe_peserta: "spirdada_privat_perempuan",
          },
        ]
        let plankPeserta = [
          {
            tipe_peserta: "plank_remaja_laki_laki",
          },
          {
            tipe_peserta: "plank_remaja_perempuan",
          },
          {
            tipe_peserta: "plank_privat_laki_laki",
          },
          {
            tipe_peserta: "plank_privat_perempuan",
          },
        ]
        for (let i = 0; i < 4; i++) {
          console.log(standar_fisik[i].mft);
          const mft_peserta = mftPeserta[i].tipe_peserta;
          const push_up_peserta = pushUpPeserta[i].tipe_peserta;
          const spir_perut_atas_peserta = spirPerutAtasPeserta[i].tipe_peserta;
          const spir_perut_bawah_peserta = spirPerutBawahPeserta[i].tipe_peserta;
          const spir_dada_peserta = spirDadaPeserta[i].tipe_peserta;
          const plank_peserta = plankPeserta[i].tipe_peserta;

          const newMft = {};
          const newPushUp = {};
          const newSpirPerutAtas = {};
          const newSpirPerutBawah = {};
          const newSpirDada = {};
          const newPlank = {};

          newMft[mft_peserta] = standar_fisik[i].mft;
          newPushUp[push_up_peserta] = standar_fisik[i].push_up;
          newSpirPerutAtas[spir_perut_atas_peserta] = standar_fisik[i].spir_perut_atas;
          newSpirPerutBawah[spir_perut_bawah_peserta] = standar_fisik[i].spir_perut_bawah;
          newSpirDada[spir_dada_peserta] = standar_fisik[i].spir_dada;
          newPlank[plank_peserta] = standar_fisik[i].plank;
          
          data.push(newMft);
          data.push(newPushUp);
          data.push(newSpirPerutAtas);
          data.push(newSpirPerutBawah);
          data.push(newSpirDada);
          data.push(newPlank);
        }
        const response = {
            mft: mft,
            push_up: push_up,
            spir_perut_atas: spir_perut_atas,
            spir_perut_bawah: spir_perut_bawah,
            spir_dada: spir_dada,
            plank: plank,
        }
        const order = [
            'mft',
            'pushup',
            'spirperutatas',
            'spirperutbawah',
            'spirdada',
            'plank'
          ];
          
          // define a custom sort function
          const customSort = (a, b) => {
            const aKey = Object.keys(a)[0];
            const bKey = Object.keys(b)[0];
            return order.indexOf(aKey.split('_')[0]) - order.indexOf(bKey.split('_')[0]);
          };
          
          // sort the data array using the custom sort function
          
        res.json({
          count: standar_fisik.length,
          data: data.sort(customSort)
        });
      })
      .catch((error) => {
        res.json({
          message: error.message,
        });
        });
    }
);

//endpoint untuk menyimpan data standar_fisik, METHOD POST, function create
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
      tipe_ukt: req.body.tipe_ukt,
      peserta: req.body.peserta,
      mft: req.body.mft,
      push_up: req.body.push_up,
      spir_perut_atas: req.body.spir_perut_atas,
      spir_perut_bawah: req.body.spir_perut_bawah,
      spir_dada: req.body.spir_dada,
      plank: req.body.plank,
    };
    standar_fisik
      .create(data)
      .then((result) => {
        res.json({
          message: "data has been inserted",
        });
      })
      .catch((error) => {
        res.json({
          message: error.message,
        });
      });
  }
);

//endpoint untuk mengedit data berdasarkan mft
app.put(
  "/mft/:id",
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
        mft: req.body.mft_privat_perempuan,
      },
    ];
    standar_fisik
      .findAll({
        where: {
          tipe_ukt: req.params.id,
        },
        order: [["peserta", "ASC"]],
      })
      .then((result) => {
        for (let i = 0; i < 4; i++) {
          console.log(result[i].id_standar_fisik);
          console.log(result[i].peserta);
          const idStandarFisik = result[i].id_standar_fisik;
          standar_fisik.update(data[i], {
            where: { id_standar_fisik: idStandarFisik },
          });
        }
        res.json({
          msg: "data has been updated",
        });
      })
      .catch((e) => {
        res.json({
          msg: e.message,
        });
      });
  }
);

//endpoint untuk mengedit data berdasarkan push up
app.put(
  "/push_up/:id",
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
        push_up: req.body.push_up_privat_perempuan,
      },
    ];
    standar_fisik
      .findAll({
        where: {
          tipe_ukt: req.params.id,
        },
        order: [["peserta", "ASC"]],
      })
      .then((result) => {
        for (let i = 0; i < 4; i++) {
          console.log(result[i].id_standar_fisik);
          console.log(result[i].peserta);
          const idStandarFisik = result[i].id_standar_fisik;
          standar_fisik.update(data[i], {
            where: { id_standar_fisik: idStandarFisik },
          });
        }
        res.json({
          msg: "data has been updated",
        });
      })
      .catch((e) => {
        res.json({
          msg: e.message,
        });
      });
  }
);

//endpoint untuk mengedit data berdasarkan spir_perut_atas
app.put(
  "/spir_perut_atas/:id",
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
        spir_perut_atas: req.body.spir_perut_atas_privat_perempuan,
      },
    ];
    standar_fisik
      .findAll({
        where: {
          tipe_ukt: req.params.id,
        },
        order: [["peserta", "ASC"]],
      })
      .then((result) => {
        for (let i = 0; i < 4; i++) {
          console.log(result[i].id_standar_fisik);
          console.log(result[i].peserta);
          const idStandarFisik = result[i].id_standar_fisik;
          standar_fisik.update(data[i], {
            where: { id_standar_fisik: idStandarFisik },
          });
        }
        res.json({
          msg: "data has been updated",
        });
      })
      .catch((e) => {
        res.json({
          msg: e.message,
        });
      });
  }
);

//endpoint untuk mengedit data berdasarkan spir_perut_bawah
app.put(
  "/spir_perut_bawah/:id",
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
        spir_perut_bawah: req.body.spir_perut_bawah_privat_perempuan,
      },
    ];
    standar_fisik
      .findAll({
        where: {
          tipe_ukt: req.params.id,
        },
        order: [["peserta", "ASC"]],
      })
      .then((result) => {
        for (let i = 0; i < 4; i++) {
          console.log(result[i].id_standar_fisik);
          console.log(result[i].peserta);
          const idStandarFisik = result[i].id_standar_fisik;
          standar_fisik.update(data[i], {
            where: { id_standar_fisik: idStandarFisik },
          });
        }
        res.json({
          msg: "data has been updated",
        });
      })
      .catch((e) => {
        res.json({
          msg: e.message,
        });
      });
  }
);

//endpoint untuk mengedit data berdasarkan spir_dada
app.put(
  "/spir_dada/:id",
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
        spir_dada: req.body.spir_dada_privat_perempuan,
      },
    ];
    standar_fisik
      .findAll({
        where: {
          tipe_ukt: req.params.id,
        },
        order: [["peserta", "ASC"]],
      })
      .then((result) => {
        for (let i = 0; i < 4; i++) {
          console.log(result[i].id_standar_fisik);
          console.log(result[i].peserta);
          const idStandarFisik = result[i].id_standar_fisik;
          standar_fisik.update(data[i], {
            where: { id_standar_fisik: idStandarFisik },
          });
        }
        res.json({
          msg: "data has been updated",
        });
      })
      .catch((e) => {
        res.json({
          msg: e.message,
        });
      });
  }
);

//endpoint untuk mengedit data berdasarkan plank
app.put(
  "/plank/:id",
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
        plank: req.body.plank_privat_perempuan,
      },
    ];
    standar_fisik
      .findAll({
        where: {
          tipe_ukt: req.params.id,
        },
        order: [["peserta", "ASC"]],
      })
      .then((result) => {
        for (let i = 0; i < 4; i++) {
          console.log(result[i].id_standar_fisik);
          console.log(result[i].peserta);
          const idStandarFisik = result[i].id_standar_fisik;
          standar_fisik.update(data[i], {
            where: { id_standar_fisik: idStandarFisik },
          });
        }
        res.json({
          msg: "data has been updated",
        });
      })
      .catch((e) => {
        res.json({
          msg: e.message,
        });
      });
  }
);

//endpoint untuk mengupdate data standar_fisik, METHOD: PUT, fuction: UPDATE
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
      id_standar_fisik: req.params.id,
    };
    let data = {
      tipe_ukt: req.body.tipe_ukt,
      peserta: req.body.peserta,
      mft: req.body.mft,
      push_up: req.body.push_up,
      spir_perut_atas: req.body.spir_perut_atas,
      spir_perut_bawah: req.body.spir_perut_bawah,
      spir_dada: req.body.spir_dada,
      plank: req.body.plank,
    };
    standar_fisik
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

//endpoint untuk menghapus data standar_fisik,METHOD: DELETE, function: destroy
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
      id_standar_fisik: req.params.id,
    };
    standar_fisik
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
