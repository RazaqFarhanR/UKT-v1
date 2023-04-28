import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Header from './components/header'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const jurus = () => {

    // state
    const [dataSiswa, setDataSiswa] = useState ([])
    const [dataJurus, setDataJurus] = useState ([])
    const [selectedButton, setSelectedButton] = useState ([])

    // function get data siswa
    const getDataSiswa = () => {
        const dataSiswa = JSON.parse (localStorage.getItem ('dataSiswa'))
        setDataSiswa (dataSiswa)
    }

    // function get data jurus
    const getDataJurus = () => {
        const token = localStorage.getItem ('tokenPenguji')
        const dataSiswa = JSON.parse (localStorage.getItem ('dataSiswa'))

        axios.get (BASE_URL + `jurus/ukt/${dataSiswa.tipe_ukt}`, { headers: { Authorization: `Bearer ${token}`}})
        .then (res => {
            setDataJurus (res.data.data)
        })
        .catch (err => {
            console.log(err.message);
        })
    }

    // function set selected button
    const handleButtonClick = (id_jurus, selectedOption) => {
        const updatedOptions= [... selectedButton]
        const index = updatedOptions.findIndex (
            (option) => option.id_jurus === id_jurus
        );
        if (index === -1) {
            updatedOptions.push ({ id_jurus, selectedOption })
        } else {
            updatedOptions [index].selectedOption = selectedOption
        }
        setSelectedButton (updatedOptions)
    }

    // function handle save nilai jurus
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

        axios.post(BASE_URL + `jurus_detail`, dataDetail, { headers: { Authorization: `Bearer ${token}`}})
        .then(async res => {
                const data = selectedButton.map ((option) => {
                    return {
                        id_jurus : option.id_jurus,
                        predikat : option.selectedOption,
                    }
                })

                const id_jurus_detail = res.data.data.id_jurus_detail

                let nilai = [];

                for (let i = 0; i < data.length; i++) {
                    if(data[i].predikat === 'true'){
                        nilai.push('1')
                    }
                    axios.post (BASE_URL + `jurus_siswa`, {
                        id_jurus_detail : id_jurus_detail,
                        id_jurus : data[i].id_jurus,
                        predikat: data[i].predikat,
                    }, { headers: { Authorization: `Bearer ${token}`}})
                    .then (res => {
                        console.log(res.data.message);
                    })
                    .catch (err => {
                        console.log(err.message);
                    })
                }

                const nilaiUkt = ((nilai.length / data.length) * 100).toFixed(2)
                console.log("nilai" + nilai)
                await axios.put(BASE_URL + `ukt_siswa/${uktSiswa.id_ukt_siswa}`, {
                    jurus: nilaiUkt
                }, { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            })
        const token = localStorage.getItem ('tokenPenguji')
        const id_jurus_detail = localStorage.getItem ('id_jurus_detail')

        const data = selectedButton.map ((option) => {
            return {
                id_jurus : option.id_jurus,
                predikat : option.selectedOption,
            }
        })
        for (let i = 0; i < data.length; i++) {
            axios.post (BASE_URL + `jurus_siswa`, {
                id_jurus_detail : id_jurus_detail,
                id_jurus : data[i].id_jurus,
                predikat: data[i].predikat,
            }, { headers: { Authorization: `Bearer ${token}`}})
            .then (res => {
                console.log(res.data.message);
            })
            .catch (err => {
                console.log(err.message);
            })
        }
    }

    useEffect (() => {
        getDataSiswa ()
        getDataJurus ()
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
                        <div className="grid grid-cols-2 items-center">
                            <div className="space-y-3 mb-10">
                                {dataJurus.map ((item, index) => (
                                    <div key={index + 1}>
                                        <h1 className='text-white text-xl font-semibold'>{item.name}</h1>
                                        <div className="flex gap-x-2">
                                            <button className={selectedButton.find (
                                                (option) => 
                                                    option.id_jurus === item.id_jurus &&
                                                    option.selectedOption === 'true'
                                            ) ? "font-semibold bg-purple rounded-md text-white py-1.5 w-full" : "font-semibold bg-white border-2 border-purple rounded-md text-purple py-1.5 w-full"} onClick={() => handleButtonClick(item.id_jurus, 'true')}>Benar</button>

                                            <button className={selectedButton.find (
                                                (option) => 
                                                    option.id_jurus === item.id_jurus &&
                                                    option.selectedOption === 'false'
                                            ) ? "font-semibold bg-purple rounded-md text-white py-1.5 w-full" : "font-semibold bg-white border-2 border-purple rounded-md text-purple py-1.5 w-full"} onClick={() => handleButtonClick(item.id_jurus, 'false')}>Salah</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='bg-yellow hover:bg-white rounded-md p-3 text-center text-xl text-white hover:text-yellow font-semibold shadow shadow-slate-700 duration-300' onClick={() => handleSave()}>Selesai</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default jurus