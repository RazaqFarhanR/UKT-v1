//import library
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const Auth = require('../middleware/Auth.js');
const verifyRoles = require("../middleware/verifyRoles");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const csv = require('csv-parser');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//import model
const models = require('../models/index');
const { sequelize, Op } = require("sequelize");
const localStorage = process.env.LOCAL_STORAGE_GENERAL + "csv/"
const siswa = models.siswa;
const ranting = models.ranting
const event = models.event;
const rayon = models.rayon;

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // set file storage
      cb(null, localStorage);
    },
    filename: (req, file, cb) => {
        // generate file name
        cb(null, "csv" + Date.now() + path.extname(file.originalname));
      },
  });

let upload2 = multer({ storage: storage });
//endpoint ditulis disini

//endpoint get data siswa
app.get("/", Auth, verifyRoles("admin", "super admin", "admin ranting", "admin cabang", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
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
app.get("/event/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "admin cabang", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
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
app.get("/event/senam/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "admin cabang", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
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
            {
                model: models.senam_detail,
                as: "senam_siswa",
                required: false,
                attributes: ['id_siswa']
            }
        ],
        where: {
            id_event: req.params.id,
            "$senam_siswa.id_siswa$": {
                [Op.is]: null
            }
        }, 
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
app.get("/event/jurus/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "admin cabang", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
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
            {
                model: models.jurus_detail,
                as: "jurus_siswa",
                required: false,
                attributes: ['id_siswa']
            },
        ],
        where: {
            id_event: req.params.id,
            "$jurus_siswa.id_siswa$": {
                [Op.is]: null
            }
        }, 
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
app.get("/event/fisik/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "admin cabang", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
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
            {
                model: models.fisik,
                as: "siswa_fisik",
                required: false,
                attributes: ['id_siswa']
            },
        ],
        where: {
            id_event: req.params.id,
            "$siswa_fisik.id_siswa$": {
                [Op.is]: null
            }
        }, 
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
app.get("/event/teknik/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "admin cabang", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
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
            {
                model: models.teknik_detail,
                as: "siswa_teknik",
                required: false,
                attributes: ['id_siswa']
            },
        ],
        where: {
            id_event: req.params.id,
            "$siswa_teknik.id_siswa$": {
                [Op.is]: null
            }
        }, 
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
app.get("/event/sambung/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "admin cabang", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
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
            {
                model: models.detail_sambung,
                as: "sambung_siswa",
                required: false,
                attributes: ['id_siswa']
            },
        ],
        where: {
            id_event: req.params.id,
            "$sambung_siswa.id_siswa$": {
                [Op.is]: null
            }
        }, 
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

app.get("/ranting/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "admin cabang", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
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
        data: siswa,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    }); 
})

app.post("/search", (req, res) => {
    siswa.findAll({
        where: {
            name: {
                [Op.like]: '%' + req.body.name + '%'
              }
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
    .then((result) => {
        res.json({
            data: result
        })
    })
    .catch(e => {
        res.json({
            message: e.message
        })
    })
})

//endpoint untuk menyimpan data siswa, METHOD POST, function create
app.post("/", Auth, verifyRoles("admin", "super admin", "admin ranting", "admin cabang", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) =>{    
    let data ={
        id_event: req.body.id_event,
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

app.post('/csv', Auth, verifyRoles('admin', 'super admin', 'admin ranting', 'pengurus cabang', 'pengurus ranting', 'penguji cabang', 'penguji ranting'),upload2.single("csvFile"), (req, res) => {
    const results = []
  
    fs.createReadStream(localStorage + req.file.filename)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        const promises = []
        for (const data of results) {
            let dataKelamin = ''
            if(data.jenisKelamin = "L"){
                dataKelamin = 'Laki laki'
            } else if(data.jeniskelamin = "P"){
                dataKelamin = 'Perempuan'
            }
            const idRole = "siswa"
            const newData = {
                id_event: req.body.id_event,
                nomor_urut: data.nomorUrut,
                name: data.name,
                id_role: idRole,
                jenis_kelamin: dataKelamin,
                jenis_latihan: data.jenisLatihan,
                peserta: data.jenisLatihan + ' - ' + dataKelamin,
                tipe_ukt: req.body.tipe_ukt,
                id_ranting: data.ranting,
                rayon: data.rayon,
                tingkatan: data.tingkatan
            }
            console.log(newData);
          promises.push(siswa.create(newData))
        }
  
        Promise.all(promises)
          .then(() => {
              const csvPath = localStorage + req.file.filename; 
              fs.unlink(csvPath, (err) => {
                  if (err) {
                      console.error(err);
                      return;
                    }
                    console.log('csv deleted successfully');
                })
                res.json({ message: 'Data has been inserted' })
          })
          .catch((error) => {
            res.json({ message: error.message })
          })
      })
  })

//endpoint untuk meng UPDATE data siswa, METHOD: PUT, fuction: UPDATE
app.put("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "admin cabang", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
    let param = {
        id_siswa : req.params.id
    }
    let data ={
        id_event: req.body.id_event,
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
app.delete("/:id", Auth, verifyRoles("admin", "super admin", "admin ranting", "admin cabang", "pengurus cabang", "pengurus ranting", "penguji cabang", "penguji ranting"), (req,res) => {
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

app.post("/auth", (req, res) => {
    siswa.findOne({
        where: {
            nomor_urut: req.body.nomor_urut
        },
    })
    .then(async (result) => {
        if (result) {
            //set payload from data
            console.log(result)
            const data = result
            if (result.id_role === "siswa") {
                const idUser = result.id_user;
                const role = result.id_role;
    
                // generate token based on payload and secret_key
                let localToken = jwt.sign({ idUser, role }, process.env.ACCESS_TOKEN_SECRET);
                res.json({
                  logged: true,
                  data: data,
                  token: localToken,
                });

            } else {
              res.status(404).json({ msg: "Kamu Bukan Penguji" });
            }
          } else {
            //tidak ditemukan
            res.json({
              logged: false,
              message: "Invalid username or password",
            });
          }
    })
    .catch(e => {
        res.json({
            message: e.message
        })
    })
})


module.exports = app;