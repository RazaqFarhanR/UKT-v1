import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ModalSelesai from './components/ModalSelesai';
import ModalAlert from './components/ModalAlert';
import SocketIo from 'socket.io-client'
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL
const socket = SocketIo(SOCKET_URL)
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ujian = () => {

    const router = useRouter()

    // -- state -- //
    const [soals, setSoals] = useState([]);
    const [lembarSoal, setLembarSoal] = useState('');
    const [dataSiswa, setDataSiswa] = useState([])
    const [time, setTime] = useState();
    const [nilai, setNilai] = useState([]);
    const [sedangUjian, setSedangUjian] = useState(true);
    const [showModalSelesai, setShowModalSelesai] = useState (false)
    const [showModalAlert, setShowModalAlert] = useState (false)

    const getDataSiswa = () => {
        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa'))
        setDataSiswa(dataSiswa)
    }

    const headerConfig = () =>{
        const token = localStorage.getItem("tokenSiswa")
        let header = {
            headers: {Authorization: `Bearer ${token}`}
        }
        return header
    }

    const getSoal = async () => {
        try {
            const token = localStorage.getItem('tokenSiswa')
            const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa'));

            const tipeUkt = dataSiswa.tipe_ukt
            console.log("tipe_ukt" + tipeUkt)

            let soal
            let id_lembar_soal
            let id_siswa = dataSiswa.id_siswa
            let id_session 
            await axios.post(BASE_URL + `lembar_soal/ukt/${tipeUkt}`,null, headerConfig())
                .then(async res => {
                    setLembarSoal(res.data.data.id_lembar_soal)
                    setSoals(res.data.data.lembar_soal_ujian)
                    setTime(res.data.data.waktu_pengerjaan * 60 * 100)
                    soal = (res.data.data.lembar_soal_ujian);
                    id_lembar_soal = res.data.data.id_lembar_soal



                    createSession()
                    .then(async () =>{
                        let nilai
                        await axios.post(BASE_URL + 'session/getid', {
                            id_lembar_soal: id_lembar_soal,
                            id_siswa: id_siswa
                        } , headerConfig())
                        .then(res =>{
                            console.log(res.data.data);
                            nilai = res.data.data
                            id_session = res.data.data.id_session
                        })
                        .catch(err => {
                            console.log(err.message);
                        })
                        
                        if (nilai.nilai !== 0) {
                            return console.log("ujian telah selesai");
                        }
                        const cekJawaban = await axios.post(BASE_URL + 'lembar_jawaban/ceksoal',{
                            id_lembar_soal: id_lembar_soal,
                            id_siswa: id_siswa,
                            id_session: id_session,
                        }, headerConfig())
    
                        if(!cekJawaban.data.data){
                            for (let i = 0; i < soal.length ; i++) {
        
                                let form = {
                                    id_lembar_soal: id_lembar_soal,
                                    id_siswa: id_siswa,
                                    id_session: id_session,
                                    id_soal: soal[i].id_soal
                                }
                                // console.log(form);
                                await axios.post(BASE_URL + 'lembar_jawaban/', form ,headerConfig())
                                .then(res => {
                                    console.log(res.data.message);
                                })
                                .catch(err => {
                                    console.log(err.message);
                                })
                            }
                        } else {
                            await axios.delete(BASE_URL + `lembar_jawaban/session/${id_session}`, headerConfig())
                            .then(res => {
                                console.log(res.data);
                                setTimeout(async () =>{
                                    for (let i = 0; i < soal.length ; i++) {
            
                                        let form = {
                                            id_lembar_soal: id_lembar_soal,
                                            id_siswa: id_siswa,
                                            id_session: id_session,
                                            id_soal: soal[i].id_soal
                                        }
                                        // console.log(form);
                                        await axios.post(BASE_URL + 'lembar_jawaban/', form ,headerConfig())
                                        .then(res => {
                                            console.log(res.data.message);
                                        })
                                        .catch(err => {
                                            console.log(err.message);
                                        })
                                    }
                                }, 1000)
                            })
                            .catch(err => {
                                console.log(err.message);
                            })
                        }
                    })


                })
                .catch(err => {
                    console.log(err.message);
                })
        } catch (e) {
            console.log(e.message);
        }
    };

    // create a state variable to store the selected options and id_soal values
    const [selectedOptions, setSelectedOptions] = useState([]);

    // function to handle changes in the selected option and update the state
    function handleOptionChange(id_soal, selectedOption) {
        const updatedOptions = [...selectedOptions];
        const index = updatedOptions.findIndex(
            (option) => option.id_soal === id_soal
        );
        if (index === -1) {
            updatedOptions.push({ id_soal, selectedOption });
        } else {
            updatedOptions[index].selectedOption = selectedOption;
        }
        setSelectedOptions(updatedOptions);
    }

    const postSelectedOptions = async () => {
        setShowModalAlert(false)
        const token = localStorage.getItem('tokenSiswa')
        const data = selectedOptions.map((option) => {
            return {
                id_soal: option.id_soal,
                jawaban: option.selectedOption,
            };
        });
        let id_session 

        await axios.post(BASE_URL + 'session/getid', {
            id_lembar_soal: lembarSoal,
            id_siswa: dataSiswa.id_siswa
        } , headerConfig())
        .then(res =>{
            // console.log(res.data.data.id_session);
            id_session = res.data.data.id_session
        })
        .catch(err => {
            console.log(err.message);
        })

        let benar = 0;
        let salah = 0;
        for (let i = 0; i < selectedOptions.length ; i++) {
            await axios
                .post(BASE_URL + `kunci_soal/score`, {
                    id_soal: data[i].id_soal,
                    opsi: data[i].jawaban,
                }, { headers: { Authorization: `Bearer ${token}` } })
                // eslint-disable-next-line no-loop-func
                .then(async (res) => {
                    // console.log(res.data.jawaban);
                    if (res.data.jawaban === true) {
                        await axios.put(BASE_URL + 'lembar_jawaban/', {
                            id_session: id_session,
                            id_siswa: dataSiswa.id_siswa,
                            id_soal: data[i].id_soal,
                            answer: 'benar'
                        }, headerConfig())
                        .then(res => {
                            // console.log("jawaban tersimpan");
                        })
                        .catch((error) => {
                            console.log(error.message);
                        })
                        benar += 1;
                    } else if (res.data.jawaban === false) {
                        await axios.put(BASE_URL + 'lembar_jawaban/', {
                            id_session: id_session,
                            id_siswa: dataSiswa.id_siswa,
                            id_soal: data[i].id_soal,
                            answer: 'salah'
                        }, headerConfig())
                        .then(res => {
                            // console.log("jawaban tersimpan");
                        })
                        .catch((error) => {
                            console.log(error.message);
                        })
                        salah += 1;
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                })
        }
        console.log("benar :" + benar);
        if (data.length === benar + salah) {
            postScore(benar);
        }
    };


    const postScore = (benar) => {
        const token = localStorage.getItem('tokenSiswa')
        const dataUktSiswa = JSON.parse(localStorage.getItem('dataUktSiswa'));
        console.log(dataUktSiswa.id_ukt_siswa)
        axios
            .put(BASE_URL + `session/finish`, {
                id_lembar_soal: lembarSoal,
                id_siswa: dataSiswa.id_siswa,
                nilai: benar * 5,
            }, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                console.log(res);
                // setNilai(res.data.data.nilai);
                // setSedangUjian(false);
                // setTime(res.data.data.waktu_pengerjaan)
                // setShowModalSelesai(true)
                axios.put(BASE_URL + `ukt_siswa/${dataUktSiswa.id_ukt_siswa}`, {
                    keshan: res.data.data.nilai
                }, { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => {
                        console.log(res);
                        socket.emit('pushRekap')
                        Logout()
                    })
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
    const nomer = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ];

    const Logout = () => {
        // console.log('logout');
        router.push("/siswa/login")
        localStorage.clear()
    }

    //timer
    // const {initialMinute = 10,initialSeconds = 0 }
    const [ minutes, setMinutes ] = useState(10);
    const [seconds, setSeconds ] =  useState(0);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    postSelectedOptions()
                    clearInterval(myInterval)
                    setMinutes(0)
                    setSeconds(0)
                } else if (minutes < 1 && seconds < 1) {
                    postSelectedOptions()
                    clearInterval(myInterval)
                    setMinutes(0)
                    setSeconds(0)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    const createSession = async () =>{
        const token = localStorage.getItem('tokenSiswa')
        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa'))
        const tipeUkt = dataSiswa.tipe_ukt

        let lembarSoal
        await axios.post(BASE_URL + `lembar_soal/ukt/${tipeUkt}`,null, headerConfig())
        .then(res => {
            lembarSoal = res.data.data.id_lembar_soal
        })
        .catch(err => {
            console.log(err.message);
        })

        await axios.post(BASE_URL + `session/start`, {
            id_lembar_soal: lembarSoal,
            id_siswa: dataSiswa.id_siswa,
            id_event: dataSiswa.id_event,
            nilai: null,
        }, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
            // console.log(res.data);
            if (res.data.data.nilai === 0) {
                let data = res.data.data
                let waktu = new Date().getTime() - new Date(data.start).getTime()
                let minute = `${("0" + (Math.floor(9-(waktu / 1000 / 60) % 60))).slice(-2)}`
                let second = `${("0" + (Math.floor(59-(waktu / 1000) % 60))).slice(-2)}`
                console.log(minute);
                console.log(second);
                if (minute < 0 ) {
                    setMinutes(0);
                    setSeconds(0);
                } else {
                    setMinutes(minute);
                    setSeconds(second);
                }
            } else {
                setShowModalSelesai(true)
                setMinutes(10);
                setSeconds(0);
            }
            // setWaktu()
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        // createSession()
        getSoal();
        getDataSiswa();
    }, []);

    return (
        <>
            <div className={`font-lato bg-darkBlue`}>

                {/* awal wrapper konten utama */}
                <div className="max-w-screen min-h-screen h-auto bg-darkBlue">

                    {/* konten utama */}
                    <div className="min-h-full h-auto w-full bg-darkBlue">

                        {/* header */}

                        <div className='grid grid-cols-6 gap-x-2 w-full fixed z-20 bg-[#000510] p-5'>
                            <div className="bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5 col-span-4">
                                <div className='rounded-md col-span-4 text-lg bg-[#000510]'>
                                    <h1 className='text-center text-white py-2 font-bold'>{dataSiswa.nomor_urut} - {dataSiswa.name} - {dataSiswa.id_ranting}</h1>
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-[#9A4BE9] to-[#16D4FC] rounded-md p-0.5 col-span-2">
                                <div className='rounded-md col-span-2 text-lg bg-[#000510]'>
                                    <h1 className='text-white text-center py-2 font-bold'>{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1>
                                </div>
                            </div>

                        </div>
                        <div className='p-5'>
                            <div className="mt-20 p-5 w-full text-white font-lato text-xl rounded bg-gradient-to-r from-[#9A4BE9] to-[#16D4FC] grid grid-cols-8">
                                <div className="col-span-1 flex justify-center items-center">
                                    <img className='w-16' src="/images/psht-icon.png" alt="" />
                                </div>
                                <div className="col-span-6 text-center text-lg font-bold">
                                    <h1>UJI KELAYAKAN CALON WARGA</h1>
                                    <h1>PERSAUDARAAN SETIA HATI TERATE</h1>
                                    <h1>CABANG TRENGGALEK TAHUN 2023</h1>
                                </div>
                            </div>


                        </div>
                            
                        {/* akhir header */}

                        {sedangUjian
                            ?
                            <>
                                {soals.map((soal) => {
                                    return (
                                        <div key={soal.id_soal} className="px-5 py-2 w-full">
                                            {/* --- card soal -- */}
                                            <div className="bg-navy shadow drop-shadow-lg rounded-md px-5 py-4 text-white">
                                                {/* <div className="w-5 h-5 flex flex-wrap justify-center items-center">
                                                    <div className="px-3 rounded-md bg-cyan-500">
                                                        <p key={soal.id_soal} className="text-white">
                                                            {nomer[0]++}
                                                        </p>
                                                    </div>
                                                </div> */}
                                                <h2 className="text-lg font-medium mb-2 h-auto">
                                                    {nomer[0]++}. {soal.pertanyaan}
                                                </h2>

                                                {/* -- soal -- */}
                                                <div className="space-y-2">
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            name={soal.id_soal}
                                                            value="opsi1"
                                                            className="form-radio mr-2 h-5 w-5"
                                                            placeholder={soal.opsi1}
                                                            checked={selectedOptions.find(
                                                                (option) =>
                                                                    option.id_soal === soal.id_soal &&
                                                                    option.selectedOption === "opsi1"
                                                            )}
                                                            onChange={() => handleOptionChange(soal.id_soal, "opsi1")}
                                                        ></input>
                                                        <p>{soal.opsi1}</p>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            name={soal.id_soal}
                                                            value="opsi2"
                                                            className="form-radio mr-2 h-5 w-5"
                                                            placeholder={soal.opsi2}
                                                            checked={selectedOptions.find(
                                                                (option) =>
                                                                    option.id_soal === soal.id_soal &&
                                                                    option.selectedOption === "opsi2"
                                                            )}
                                                            onChange={() => handleOptionChange(soal.id_soal, "opsi2")}
                                                        ></input>
                                                        <p>{soal.opsi2}</p>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            name={soal.id_soal}
                                                            value="opsi3"
                                                            className="form-radio mr-2 h-5 w-5"
                                                            placeholder={soal.opsi3}
                                                            checked={selectedOptions.find(
                                                                (option) =>
                                                                    option.id_soal === soal.id_soal &&
                                                                    option.selectedOption === "opsi3"
                                                            )}
                                                            onChange={() => handleOptionChange(soal.id_soal, "opsi3")}
                                                        ></input>
                                                        <p>{soal.opsi3}</p>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            name={soal.id_soal}
                                                            value="opsi4"
                                                            className="form-radio mr-2 h-5 w-5"
                                                            placeholder={soal.opsi4}
                                                            checked={selectedOptions.find(
                                                                (option) =>
                                                                    option.id_soal === soal.id_soal &&
                                                                    option.selectedOption === "opsi4"
                                                            )}
                                                            onChange={() => handleOptionChange(soal.id_soal, "opsi4")}
                                                        ></input>
                                                        <p>{soal.opsi4}</p>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className='mx-5 mt-5 pb-5'>
                                <button
                                        className="p-2 w-full text-white font-lato text-2xl font-bold rounded-md bg-purple"
                                        onClick={() => setShowModalAlert(true)}
                                        // onClick={() => showModalSelesai(true)}
                                >
                                        SELESAI
                                </button>
                                </div>
                            </>
                            :
                            null
                            // <>
                            //     <div className="bg-navy shadow drop-shadow-lg rounded-md p-5 text-white">
                            //         <h1> hasil ujian anda</h1>
                            //         <h1> Nilai anda adalah : {nilai}</h1>
                            //         <h1> sisa Waktu Pengerjaan {time}</h1>
                            //     </div>
                            // </>
                        }
                    </div>

                </div>
            </div>

            <ModalSelesai
            show={showModalSelesai}
            logout={() => postSelectedOptions()}
            />

            <ModalAlert
            show={showModalAlert}
            batal={() => setShowModalAlert(false)}
            simpan={() => postSelectedOptions()}
            />
        </>
    )
}

export default ujian