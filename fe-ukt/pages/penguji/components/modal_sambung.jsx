import { globalState } from '@/context/context'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Modal_Sambung = (props) => {

    //  state Modal  // 

    const { showModalSambung, setShowModalSambung } = useContext(globalState);
    const { action, setAction } = useContext(globalState)
    const [dataSiswa, setDataSiswa] = useState([])
    const [dataPenguji, setDataPenguji] = useState([])
    const [searchName, setSearchName] = useState([])
    const [dataEvent, setDataEvent] = useState([])


    // function get data siswa
    const getDataSiswa = () => {
        const dataEvent = JSON.parse(localStorage.getItem('event'))
        const dataPenguji = JSON.parse(localStorage.getItem('penguji'))
        const token = localStorage.getItem('tokenPenguji')
        setDataPenguji(dataPenguji)
        setDataEvent(dataEvent)
        let IdEvent = (dataEvent.id_event)
        console.log("id_event  :" + IdEvent)
        axios.get(BASE_URL + `siswa/event/sambung/${IdEvent}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setDataSiswa(res.data.data)
                console.log(res.data.data);
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    // function go to page sambung
    const goToNilai = (item) => {
        const token = localStorage.getItem('tokenPenguji')
        const data = {
            tipe_ukt: item.tipe_ukt,
            id_siswa: item.id_siswa,
            id_event: item.id_event,
            rayon: item.rayon
        }
        axios.get(BASE_URL + `ukt_siswa/siswa/${item.id_siswa}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
            if (res.data.data != null) {
                localStorage.setItem(`${action}`, JSON.stringify(res.data.data.id_ukt_siswa))
            } else {
                axios.post(BASE_URL + `ukt_siswa`, data, { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => {
                        localStorage.setItem(`${action}`, JSON.stringify(res.data.data.id_ukt_siswa))
                    })
            }
        })
        if (action === 'posisi1') {
            const data = {
                posisi: 1,
                nomor_urut: item.nomor_urut,
                id_siswa: item.id_siswa,
                name: item.name,
                rayon: item.siswa_ranting.name
            }
            props.onData(data)
            setShowModalSambung(false)
        } else if (action === 'posisi2') {
            const data = {
                posisi: 2,
                nomor_urut: item.nomor_urut,
                id_siswa: item.id_siswa,
                name: item.name,
                rayon: item.siswa_ranting.name
            }
            props.onData(data)
            setShowModalSambung(false)
        }
    }

    const searchSiswa =() => {
        const token = localStorage.getItem('tokenPenguji')
        axios.post(BASE_URL + `siswa/search`, {
            name: searchName
        },{ headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                console.log(res);
                setDataSiswa(res.data.data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    useEffect(() => {
        getDataSiswa()
    }, [])

    return (
        <>
            {showModalSambung ? (
                <>
                    {/* Main modal */}
                    <div className="fixed flex justify-center top-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0">
                        <div className="relative w-full h-full max-w-2xl md:h-auto">

                            {/* Modal content */}
                            <div className="relative bg-navy text-white rounded-lg shadow">

                                {/* Modal header */}
                                <div className="flex justify-center p-4">
                                    <div className="bg-navy rounded-md p-3 text-white mb-3 shadow shadow-slate-700 hover:shadow-purple hover:scale-105 transition ease-in-out duration-300">
                                        <h1 className='text-xl font-semibold'>
                                            {action === 'posisi1' ? 'siswa 1' : 'siswa 2'}
                                        </h1>
                                    </div>
                                </div>

                                {/* Modal body */}
                                <div className="px-6 py-2 space-y-3">
                                    {/* search */}
                                    <div className="bg-white py-1.5 px-4 rounded-md gap-x-2 flex items-center mb-5 ">
                                        <button onClick={() => searchSiswa()}>
                                            <svg width="25" height="25" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.625 16.625C13.491 16.625 16.625 13.491 16.625 9.625C16.625 5.75901 13.491 2.625 9.625 2.625C5.75901 2.625 2.625 5.75901 2.625 9.625C2.625 13.491 5.75901 16.625 9.625 16.625Z" stroke="#6464F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M18.3746 18.3751L14.5684 14.5688" stroke="#6464F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>

                                        {/* input search */}
                                        <input className='w-full text-black p-1.5 focus:outline-none' placeholder='Search' type="text" onChange={(e) => setSearchName(e.target.value)}/>

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
                                                    {dataSiswa?.filter(a => a.id_event === dataEvent.id_event).map((item, index) => (
                                                        <button className='w-full' onClick={() => goToNilai(item)} key={index + 1}>
                                                            <div className="bg-navy rounded-md p-3 text-white mb-3 shadow shadow-slate-700 hover:shadow-purple hover:scale-105 transition ease-in-out duration-300">
                                                                <h1 className='text-green tracking-wide text-lg'>{item.nomor_urut}</h1>
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
                                                                <h1 className='text-green tracking-wide text-lg'>{item.nomor_urut}</h1>
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

                                {/* Modal footer */}
                                <div className="flex items-center justify-end p-6 space-x-2">
                                    <button onClick={() => setShowModalSambung(false)} className="text-red hover:text-white bg-white hover:bg-red duration-300 font-medium rounded-lg px-5 py-2.5 text-center">Cancel</button>
                                    {(() => {
                                        if (action === 'insert') {
                                            return (
                                                <button type='submit' className="text-green hover:text-white bg-white hover:bg-green duration-300 rounded-lg font-medium px-5 py-2.5 focus:z-10">Tambah</button>
                                            )
                                        } else if (action === 'update') {
                                            return (
                                                <button type='submit' className="text-green hover:text-white bg-white hover:bg-green duration-300 rounded-lg font-medium px-5 py-2.5 focus:z-10">Edit</button>
                                            )
                                        }
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black opacity-70 fixed inset-0 z-40"></div>
                </>

            ) : null}
        </>
    )
}

export default Modal_Sambung