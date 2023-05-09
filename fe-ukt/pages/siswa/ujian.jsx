import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
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

    const getDataSiswa = () => {
        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa'))
        setDataSiswa(dataSiswa)
    }

    const getSoal = async () => {
        try {
            const token = localStorage.getItem('tokenSiswa')
            const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa'));

            const tipeUkt = dataSiswa.tipe_ukt
            console.log("tipe_ukt" + tipeUkt)

            axios.get(BASE_URL + `lembar_soal/ukt/${tipeUkt}`, { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    setLembarSoal(res.data.data.id_lembar_soal)
                    setSoals(res.data.data.lembar_soal_ujian)
                    setTime(res.data.data.waktu_pengerjaan * 60 * 100)
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
        const token = localStorage.getItem('tokenSiswa')
        const data = selectedOptions.map((option) => {
            return {
                id_soal: option.id_soal,
                jawaban: option.selectedOption,
            };
        });

        let benar = 0;
        let salah = 0;
        for (let i = 0; i < 20; i++) {
            await axios
                .post(BASE_URL + `kunci_soal/score`, {
                    id_soal: data[i].id_soal,
                    opsi: data[i].jawaban,
                }, { headers: { Authorization: `Bearer ${token}` } })
                // eslint-disable-next-line no-loop-func
                .then((res) => {
                    console.log(res.data.jawaban);
                    if (res.data.jawaban === true) {
                        benar += 1;
                    } else if (res.data.jawaban === false) {
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
            .post(BASE_URL + `session`, {
                id_lembar_soal: lembarSoal,
                id_siswa: dataSiswa.id_siswa,
                nilai: benar * 5,
                waktu_pengerjaan: 30
            }, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                console.log(res);
                setNilai(res.data.data.nilai);
                setSedangUjian(false);
                setTime(res.data.data.waktu_pengerjaan)
                axios.put(BASE_URL + `ukt_siswa/${dataUktSiswa.id_ukt_siswa}`, {
                    keshan: res.data.data.nilai
                }, { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => {
                        console.log(res);
                    })
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
    const nomer = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ];
    useEffect(() => {
        getSoal();
        getDataSiswa();
    }, []);


    
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
                    clearInterval(myInterval)
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

    return (
        <>
            <div className="font-lato bg-darkBlue">

                {/* awal wrapper konten utama */}
                <div className="max-w-screen min-h-screen h-auto bg-darkBlue">

                    {/* konten utama */}
                    <div className="min-h-full h-auto w-full bg-darkBlue">

                        {/* header */}

                        <div className='p-5'>
                            <div className="p-5 w-full text-white font-lato text-xl rounded bg-gradient-to-r from-[#9A4BE9] to-[#16D4FC] grid grid-cols-8">
                                <div className="col-span-1 flex justify-center items-center">
                                    <img className='w-16' src="/images/psht-icon.png" alt="" />
                                </div>
                                <div className="col-span-6 text-center text-lg font-bold">
                                    <h1>UJI KELAYAKAN CALON WARGA</h1>
                                    <h1>PERSAUDARAAN SETIA HATI TERNATE</h1>
                                    <h1>CABANG TRENGGALEK</h1>
                                </div>
                            </div>

                            <div className='mt-5 grid grid-cols-6 gap-x-2 w-full'>
                                <div className='border border-white rounded-md col-span-4 text-lg'>
                                    <h1 className='text-center text-white py-2'>1001 - Nadia Azza Desti - Trenggalek</h1>
                                </div>
                                <div className='border border-white rounded-md col-span-2 text-lg'>
                                    <h1 className='text-white text-center py-2'>{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1>
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
                                            <div className="bg-navy shadow drop-shadow-lg rounded-md p-5 text-white">
                                                {/* <div className="w-5 h-5 flex flex-wrap justify-center items-center">
                                                    <div className="px-3 rounded-md bg-cyan-500">
                                                        <p key={soal.id_soal} className="text-white">
                                                            {nomer[0]++}
                                                        </p>
                                                    </div>
                                                </div> */}
                                                <h2 className="text-lg font-medium mb-4 mt-4">
                                                    {nomer[0]++}. {soal.pertanyaan}
                                                </h2>

                                                {/* -- soal -- */}
                                                <div className="space-y-2">
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            name={soal.id_soal}
                                                            value="opsi1"
                                                            className="form-radio mr-2"
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
                                                            className="form-radio mr-2"
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
                                                            className="form-radio mr-2"
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
                                                            className="form-radio mr-2"
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
                                        // onClick={postSelectedOptions}
                                        onClick={() => router.back()}
                                >
                                        SELESAI
                                </button>
                                </div>
                            </>
                            :
                            <>
                                <div className="bg-navy shadow drop-shadow-lg rounded-md p-5 text-white">
                                    <h1> hasil ujian anda</h1>
                                    <h1> Nilai anda adalah : {nilai}</h1>
                                    <h1> sisa Waktu Pengerjaan {time}</h1>
                                </div>
                            </>
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default ujian