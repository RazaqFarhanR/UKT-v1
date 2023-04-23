import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/header'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const fisik = () => {

    // state
    const [dataSiswa, setDataSiswa] = useState ([])
    const [dataStandartFisik, setDataStandartFisik] = useState ([])
    const [ukt, setUkt] = useState ('')

    // function get data siswa from local storage
    const getDataSiswa = () => {
        const dataSiswa = JSON.parse (localStorage.getItem ('dataSiswa'))
        setDataSiswa (dataSiswa)
    }

    // function get data standart fisik
    const getDataStandartFisik = () => {
        const token = localStorage.getItem ('tokenPenguji')

        axios.get (BASE_URL + `standar_fisik`, { headers: { Authorization: `Bearer ${token}`}})
        .then (res => {
            setDataStandartFisik (res.data)
        })
        .catch (err => {
            console.log(err.message);
        })
    }

    useEffect (() => {
        getDataSiswa ()
        getDataStandartFisik ()
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

                        {/* wrapper mft */}
                        {dataStandartFisik.map ((item, index) => (
                            <div key={index + 1} className="bg-navy rounded-md p-2 text-center text-white space-y-3 mb-3">
                                <h1 className='text-xl font-semibold tracking-wider'>{item.jenis}</h1>

                                {/* fisik list */}
                                <div className="grid grid-cols-3 gap-x-3 items-center">

                                    {/* button minus */}
                                    <button className='bg-red rounded-md text-center text-2xl font-bold'>
                                        -
                                    </button>

                                    {/* score indicator */}
                                    <div className="outline outline-purple rounded-md h-full flex items-center justify-center">
                                        <h1 className='text-xl font-semibold'>{item.mft}</h1>
                                    </div>

                                    {/* button plus */}
                                    <button className='bg-purple rounded-md text-center text-2xl font-bold'>
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default fisik