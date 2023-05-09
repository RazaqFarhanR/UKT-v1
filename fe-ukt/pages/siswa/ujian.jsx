import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ujian = () => {

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

    return (
        <>
            <div className="font-lato">

                {/* awal wrapper konten utama */}
                <div className="w-full h-screen">

                    {/* header */}
                    <div className="sticky top-0 z-10 header border-b bg-navy shadow shadow-black w-full px-2 py-3 font-lato">
                        <div className="relative ">

                            <div className="absolute">
                                <img className='w-10' src="/images/psht-icon.png" alt="" />
                            </div>

                            <div className="flex justify-center items-center">

                                {/* Title */}
                                <h1 className='text-white font-semibold text-lg'>PSHT Cabang Trenggalek</h1>
                            </div>
                        </div>
                    </div>
                    {/* akhir header */}

                    {/* konten utama */}
                    <div className="min-h-full bg-darkBlue px-10 py-8">
                        {sedangUjian
                            ?
                            <>
                                {soals.map((soal) => {
                                    return (
                                        <div key={soal.id_soal} className="p-5 w-3/4">
                                            {/* --- card soal -- */}
                                            <div className="bg-navy shadow drop-shadow-lg rounded-md p-5 text-white">
                                                <div className="w-5 h-5 flex flex-wrap justify-center items-center">
                                                    <div className="px-3 rounded-md bg-cyan-500">
                                                        <p key={soal.id_soal} className="text-white">
                                                            {nomer[0]++}
                                                        </p>
                                                    </div>
                                                </div>
                                                <h2 className="text-lg font-medium mb-4 mt-4">
                                                    {soal.pertanyaan}
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
                                <button
                                    className="p-10 rounded bg-blue-500"
                                    onClick={postSelectedOptions}
                                >
                                    FINISH
                                </button>
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