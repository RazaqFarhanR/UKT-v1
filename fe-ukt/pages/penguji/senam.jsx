import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/header'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const senam = () => {

    // state
    const [dataSiswa, setDataSiswa] = useState([])
    const [dataSenam, setDataSenam] = useState([])
    const [selectedButton, setSelectedButton] = useState([])

    // const randomSenam = () => {
    //     if (dataSiswa.tipe_ukt === 'UKT Jambon') {
    //         setJumlahSenam (30)
    //         setLimitSenam (15)
    //     } else if (dataSiswa.tipe_ukt === 'UKT Hijau') {
    //         setJumlahSenam (60)
    //         setLimitSenam (30)
    //     } else if (dataSiswa.tipe_ukt === 'UKT Putih') {
    //         setJumlahSenam (70)
    //         setLimitSenam (35)
    //     } else if (dataSiswa.tipe_ukt === 'UKCW') {
    //         setJumlahSenam (90)
    //         setLimitSenam (45)
    //     } else {
    //         console.log('gagal set data senam');
    //     }

    //     console.log(jumlahSenam);
    //     console.log(limitSenam);

    //     for (let s = 1; s <= 5; s++) {
    //         let randomSenam = Math.floor (Math.random() * 10);
    //         if (!dataArray.includes(randomSenam) && (randomSenam != 0)) {
    //             dataArray.push(randomSenam)
    //         }
    //     }
    //     console.log(dataArray);
    // }

    const getDataSiswa = () => {
        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa'))
        setDataSiswa(dataSiswa)
    }

    const getDataSenam = () => {
        const token = localStorage.getItem('tokenPenguji')
        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa'))

        axios.get(BASE_URL + `senam/ukt/${dataSiswa.tipe_ukt}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setDataSenam(res.data.data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    // function set selected button
    function handleButtonClick(id_senam, selectedOption) {
        const updatedOptions = [...selectedButton];
        const index = updatedOptions.findIndex(
            (option) => option.id_senam === id_senam
        );
        if (index === -1) {
            updatedOptions.push({ id_senam, selectedOption })
        } else {
            updatedOptions[index].selectedOption = selectedOption
        }
        setSelectedButton(updatedOptions)
    }

    // function handle save nilai senam
    const handleSave = () => {

        // -- data detail -- //
        const uktSiswa = JSON.parse(localStorage.getItem('dataUktSiswa'))
        const token = localStorage.getItem('tokenPenguji')
        const dataPenguji = JSON.parse(localStorage.getItem('penguji'))
        const dataDetail = {
            id_penguji: dataPenguji.id_penguji,
            id_siswa: dataSiswa.id_siswa,
            id_event: dataSiswa.id_event,
            tipe_ukt: dataSiswa.tipe_ukt
        }

        axios.post(BASE_URL + `senam_detail`, dataDetail, { headers: { Authorization: `Bearer ${token}` } })
            .then(async res => {
                console.log(res.data.data)
                const data = selectedButton.map((option) => {
                    return {
                        id_senam: option.id_senam,
                        predikat: option.selectedOption,
                    }
                })

                const id_senam_detail = res.data.data.id_senam_detail
                
                let nilai = [];
                // -- senam siswa -- //
                for (let i = 0; i < data.length; i++) {
                    if(data[i].predikat == 'true'){
                        nilai.push('1')
                    }
                    axios.post(BASE_URL + `senam_siswa`, {
                        id_senam_detail: id_senam_detail,
                        id_senam: data[i].id_senam,
                        predikat: data[i].predikat,
                    }, { headers: { Authorization: `Bearer ${token}` } })
                        .then(res => {
                            console.log(res.data.message);

                        })
                        .catch(err => {
                            console.log(err.message);
                        })
                }

                // -- ukt siswa  -- //
                const nilaiUkt = ((nilai.length / data.length) * 100).toFixed(2)
                console.log("nilai" + nilai)
                await axios.put(BASE_URL + `ukt_siswa/${uktSiswa.id_ukt_siswa}`, {
                    senam: nilaiUkt
                }, { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            })
    }

    useEffect(() => {
        getDataSiswa()
        getDataSenam()
    }, [])

    return (
        <>
            <div className="font-lato">

                {/* awal wrapper konten utama */}
                <div className="w-full h-screen">

                    {/* header */}
                    <Header />
                    {/* akhir header */}

                    {/* konten utama */}
                    <div className="min-h-full bg-darkBlue px-10 py-8">

                        {/* card siswa information */}
                        <div className="bg-navy rounded-md p-3 text-white mb-8 shadow shadow-slate-700 hover:shadow-purple transition ease-in-out duration-300">
                            <h1 className='text-green tracking-wide text-lg'>{dataSiswa.nis}</h1>
                            <h1 className='text-xl font-semibold'>{dataSiswa.name}</h1>
                            <h1 className='tracking-wide'>{dataSiswa.rayon}</h1>
                        </div>

                        {/* senam list */}
                        <div className="space-y-3 mb-10">
                            {dataSenam.map((item, index) => (
                                <div key={index + 1} className="grid grid-cols-2 items-center">
                                    <h1 className='text-white text-xl font-semibold'>{item.name}</h1>
                                    <div className="flex gap-x-2">
                                        <button className={selectedButton.find(
                                            (option) =>
                                                option.id_senam === item.id_senam &&
                                                option.selectedOption === 'true'
                                        ) ? "font-semibold bg-purple rounded-md text-white py-1.5 w-full" : "font-semibold bg-white border-2 border-purple rounded-md text-purple py-1.5 w-full"}
                                            onClick={() => handleButtonClick(item.id_senam, 'true')}>Benar</button>

                                        <button className={selectedButton.find(
                                            (option) =>
                                                option.id_senam === item.id_senam &&
                                                option.selectedOption === 'false'
                                        ) ? "font-semibold bg-purple rounded-md text-white py-1.5 w-full" : "font-semibold bg-white border-2 border-purple rounded-md text-purple py-1.5 w-full"} onClick={() => handleButtonClick(item.id_senam, 'false')}>Salah</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='bg-yellow hover:bg-white rounded-md p-3 text-center text-xl text-white hover:text-yellow font-semibold shadow shadow-slate-700 duration-300' onClick={() => handleSave()}>Selesai</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default senam