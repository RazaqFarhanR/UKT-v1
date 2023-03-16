const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.static(__dirname))

//import end-point diletakkan disini

// endpoint role
const role = require('./routes/role');
app.use("/ukt/role", role)

// endpoint cabang
const cabang = require('./routes/cabang');
app.use("/ukt/cabang", cabang)

// endpoint cabang
const ranting = require('./routes/ranting');
app.use("/ukt/ranting", ranting)

// endpoint siswa
const siswa = require('./routes/siswa');
app.use("/ukt/siswa", siswa)

// endpoint user
const user = require('./routes/user');
app.use("/ukt/user", user)

// endpoint pengurus
const pengurus = require('./routes/pengurus');
app.use("/ukt/pengurus", pengurus)

// endpoint penguji
const penguji = require('./routes/penguji');
app.use("/ukt/penguji", penguji)

const senam = require('./routes/senam');
app.use("/ukt/senam", senam)

const rayon = require('./routes/rayon');
app.use("/ukt/rayon", rayon)

const jurus = require('./routes/jurus');
app.use("/ukt/jurus", jurus)

//endpoint teknik
const teknik = require('./routes/teknik');
app.use("/ukt/teknik", teknik)

//endpoint fisik
const fisik = require('./routes/fisik');
app.use("/ukt/fisik", fisik)

//endpoint UKCW
const ukcw = require('./routes/ukcw');
app.use("/ukt/ukcw", ukcw)

//endpoint UKT_JAMBON
const ukt_jambon = require('./routes/ukt_jambon');
app.use("/ukt/ukt_jambon", ukt_jambon)

//endpoint UKT_HIJAU
const ukt_hijau = require('./routes/ukt_hijau');
app.use("/ukt/ukt_hijau", ukt_hijau)

//endpoint UKT_PUTIH
const ukt_putih = require('./routes/ukt_putih');
app.use("/ukt/ukt_putih", ukt_putih)

//run server
app.listen(8080, () => {
    console.log('server run on port 8080')
})