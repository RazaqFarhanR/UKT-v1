import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import Header from './components/header'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const detail_event = () => {

    // deklarasi router
    const router = useRouter()
    const { name } = router.query

    // state set jenis
    const [active, setActive] = useState('senam')

    // state
    const [dataSiswa, setDataSiswa] = useState([])
    const [dataPenguji, setDataPenguji] = useState([])

    // function get data siswa
    const getDataSiswa = () => {
        const dataEvent = JSON.parse(localStorage.getItem('event'))
        const dataPenguji = JSON.parse(localStorage.getItem('penguji'))
        const token = localStorage.getItem('tokenPenguji')

        setDataPenguji(dataPenguji)
        let IdEvent = (dataEvent.id_event)
        console.log("id_event  :" + IdEvent)
        axios.get(BASE_URL + `siswa/event/${IdEvent}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setDataSiswa(res.data.data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    // function set jneis
    const onActive = (e) => {
        setActive(e)
    }

    // function go to penilaian page
    const goToNilai = (item) => {
        const token = localStorage.getItem('tokenPenguji')
        const uktSiswa = JSON.parse(localStorage.getItem('dataUktSiswa'))
        const data = {
            tipe_ukt: item.tipe_ukt,
            id_siswa: item.id_siswa,
            id_event: item.id_event,
            rayon: item.rayon
        }
        if (!uktSiswa) {
            "south side"
            axios.post(BASE_URL + `ukt_siswa`, data, { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                    console.log(res.data.data)
                    router.push('./' + active)
                    localStorage.setItem('dataUktSiswa', JSON.stringify(res.data.data))
                })
        } else if (uktSiswa) {
            console.log(item.id_siswa)
            console.log("long beach")
            console.log(uktSiswa.id_siswa)
            if (item.id_siswa == uktSiswa.id_siswa) {
                "west side"
                router.push('./' + active)
                localStorage.setItem('dataSiswa', JSON.stringify(item))
            } else if(item.id_siswa != uktSiswa.id_siswa){
                axios.get(BASE_URL + `ukt_siswa/siswa/${item.id_siswa}`, { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => {
                        console.log("was sup brother")
                        console.log(res.data.data.id_siswa);
                        if (res.data) {
                            console.log("west side")
                            console.log(res)
                            router.push('./' + active)
                            localStorage.setItem('dataUktSiswa', JSON.stringify(res.data.data))
                            localStorage.setItem('dataSiswa', JSON.stringify(item))
                        } else if (!res.data.length) {
                            axios.post(BASE_URL + `ukt_siswa`, data, { headers: { Authorization: `Bearer ${token}` } })
                                .then(res => {
                                    console.log("east side" + res.data.data)
                                    router.push('./' + active)
                                    localStorage.setItem('dataUktSiswa', JSON.stringify(res.data.data))
                                    localStorage.setItem('dataSiswa', JSON.stringify(item))
                                })
                        }
                    })
                    .catch(err => {
                        console.log(err.message);
                    })

            }
        }
    }

    useEffect(() => {
        getDataSiswa()
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

                        {/* wrapper category */}
                        <div className="flex bg-navy gap-x-2 overflow-x-scroll text-purple mb-3 scrollbar-hide">
                            <button onClick={() => onActive('senam')} className={active === 'senam' ? "bg-purple text-white transition ease-in-out duration-300 py-1.5 px-4 rounded-md" : "bg-white hover:bg-purple hover:text-white transition ease-in-out duration-300 py-1.5 px-4 rounded-md"}>Senam</button>
                            <button onClick={() => onActive('jurus')} className={active === 'jurus' ? "bg-purple text-white transition ease-in-out duration-300 py-1.5 px-4 rounded-md" : "bg-white hover:bg-purple hover:text-white transition ease-in-out duration-300 py-1.5 px-4 rounded-md"}>Jurus</button>
                            <button onClick={() => onActive('fisik')} className={active === 'fisik' ? "bg-purple text-white transition ease-in-out duration-300 py-1.5 px-4 rounded-md" : "bg-white hover:bg-purple hover:text-white transition ease-in-out duration-300 py-1.5 px-4 rounded-md"}>Fisik</button>
                            <button onClick={() => onActive('teknik')} className={active === 'teknik' ? "bg-purple text-white transition ease-in-out duration-300 py-1.5 px-4 rounded-md" : "bg-white hover:bg-purple hover:text-white transition ease-in-out duration-300 py-1.5 px-4 rounded-md"}>Teknik</button>
                            <button onClick={() => onActive('sambung')} className={active === 'sambung' ? "bg-purple text-white transition ease-in-out duration-300 py-1.5 px-4 rounded-md" : "bg-white hover:bg-purple hover:text-white transition ease-in-out duration-300 py-1.5 px-4 rounded-md"}>Sambung</button>
                        </div>

                        {/* search */}
                        <div className="bg-white py-1.5 px-4 rounded-md gap-x-2 flex items-center mb-5 ">
                            <svg width="25" height="25" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.625 16.625C13.491 16.625 16.625 13.491 16.625 9.625C16.625 5.75901 13.491 2.625 9.625 2.625C5.75901 2.625 2.625 5.75901 2.625 9.625C2.625 13.491 5.75901 16.625 9.625 16.625Z" stroke="#6464F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18.3746 18.3751L14.5684 14.5688" stroke="#6464F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            {/* input search */}
                            <input className='w-full p-1.5 focus:outline-none' placeholder='Search' type="text" />

                            {/* filter button */}
                            <button>
                                <svg width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M25.6667 3.5H2.33337L11.6667 14.5367V22.1667L16.3334 24.5V14.5367L25.6667 3.5Z" stroke="#6464F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        {/* card siswa information */}
                        {(() => {
                            if (dataPenguji.id_role === 'penguji cabang') {
                                console.log('penguji cabang');
                                return (
                                    <>
                                        {dataSiswa.map((item, index) => (
                                            <button className='w-full' onClick={() => goToNilai(item)} key={index + 1}>
                                                <div className="bg-navy rounded-md p-3 text-white mb-3 shadow shadow-slate-700 hover:shadow-purple hover:scale-105 transition ease-in-out duration-300">
                                                    <h1 className='text-green tracking-wide text-lg'>{item.nis}</h1>
                                                    <h1 className='text-xl font-semibold'>{item.name}</h1>
                                                    <h1 className='tracking-wide'>{item.siswa_ranting.name}</h1>
                                                </div>
                                            </button>
                                        ))}
                                    </>
                                )
                            } else if (dataPenguji.id_role === 'penguji ranting') {
                                console.log('penguji ranting');
                                return (
                                    <>
                                        {dataSiswa.filter(a => a.id_ranting === dataPenguji.id_ranting).map((item, index) => (
                                            <button className='w-full' onClick={() => goToNilai(item)} key={index + 1}>
                                                <div className="bg-navy rounded-md p-3 text-white mb-3 shadow shadow-slate-700 hover:shadow-purple hover:scale-105 transition ease-in-out duration-300">
                                                    <h1 className='text-green tracking-wide text-lg'>{item.nis}</h1>
                                                    <h1 className='text-xl font-semibold'>{item.name}</h1>
                                                    <h1 className='tracking-wide'>{item.siswa_ranting.name}</h1>
                                                </div>
                                            </button>
                                        ))}
                                    </>
                                )
                            } else {
                                return (
                                    <h1 className='text-white'>Penguji ranting</h1>
                                )
                            }
                        })()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default detail_event