//import library
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import model
const models = require("../models/index");
const { Op } = require("sequelize");
const penguji = models.penguji;

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan";

//konfigurasi proses upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // set file storage
    cb(
      null,
      "C:/Users/RAFI DUTA/Documents/KODING/REACT JS/UKT/be-ukt/image"
    );
  },
  filename: (req, file, cb) => {
    // generate file name
    cb(null, "foto-" + Date.now() + path.extname(file.originalname));
  },
});

let upload2 = multer({ storage: storage });

//endpoint ditulis disini
//endpoint get data penguji
app.get("/", (req, res) => {
  const imagePath = "http://localhost:8080/image/"

  penguji
    .findAll()
    .then((penguji) => {
      // Map over the tipe_kamar array and add the image URL to each object
      const penguji_with_image_url = penguji.map((tk) => ({
        ...tk.toJSON(),
        image: `${imagePath}${tk.foto}`,
      }));
      res.json({
        count: penguji_with_image_url.length,
        data: penguji_with_image_url,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});
//endpoint get data penguji cabang berdasarkan nama dan cabang
app.post("/name_dan_ranting", (req, res) => {
  const name = req.body.name;
  const id_ranting = req.body.id_ranting;
  penguji
    .findAll({
      where: {
        name: {
          [Op.like]: "%" + name + "%",
        },
        id_ranting: {
          [Op.like]: "%" + id_ranting + "%",
        },
      },
    })
    .then((penguji) => {
      res.json({
        count: penguji.length,
        data: penguji,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

app.post("/", upload2.single("foto"), async (req, res) => {
  const Ranting = models.ranting;
  try {
    if (req.body.id_ranting) {
      const ranting = await Ranting.findOne({
        where: { id_ranting: req.body.id_ranting },
      });
      if (ranting) {
        const data = {
          NIW: req.body.niw,
          name: req.body.name,
          id_role: req.body.id_role,
          id_ranting: req.body.id_ranting,
          id_cabang: ranting.id_cabang, // set id_cabang based on the corresponding value in the ranting table
          username: req.body.username,
          foto: req.file.filename,
          password: req.body.password,
          no_wa: req.body.no_wa,
        };
        const result = await penguji.create(data);
        res.json({
          message: "data has been inserted",
        });
      } else {
        res.json({
            message: "ranting not found"
        })
      }
    } else if (!req.body.id_ranting) {
        const data = {
            NIW: req.body.niw,
            name: req.body.name,
            id_role: req.body.id_role,
            id_ranting: req.body.id_ranting,
            foto: req.file.filename, // set id_cabang based on the corresponding value in the ranting table
            username: req.body.username,
            password: req.body.password,
            no_wa: req.body.no_wa,
          };
          const result = await penguji.create(data);
          res.json({
            message: "data has been inserted",
          });
    } else {
        req.json({
            message: "error"
        })
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

//endpoint untuk mengupdate data penguji, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req, res) => {
  let param = {
    id_penguji: req.params.id,
  };
  let data = {
    name: req.body.name,
    id_role: req.body.id_role,
    id_ranting: req.body.id_ranting,
    username: req.body.username,
    password: req.body.password,
    no_wa: req.body.no_wa,
  };
  penguji
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
});

//endpoint untuk menghapus data penguji,METHOD: DELETE, function: destroy
app.delete("/:id", (req, res) => {
  let param = {
    id_penguji: req.params.id,
  };
  penguji
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
});

//endpoint login penguji (authorization), METHOD: POST, function: findOne
app.post("/auth", async (req,res) => {
  let data = {
      username: req.body.username,
      password: req.body.password
  }

  //cari data penguji yang username dan password sama dengan input
  let result = await penguji.findOne({where: data})
  if(result){
      //ditemukan
      //set payload from data
      let payload = JSON.stringify({
          id_user: result.id_user,
          username: result.username
      })

      // generate token based on payload and secret_key
      let token = jwt.sign(payload, SECRET_KEY)

      //set output
      res.json({
          logged: true,
          data: result,
          token: token
      })
  }
  else{
      //tidak ditemukan
      res.json({
          logged: false,
          message: "Invalid username or password"
      })
  }
})


module.exports = app;
