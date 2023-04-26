import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/header'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const sambung = () => {

    // state
    const [dataSiswa, setDataSiswa] = useState ([])
    const [nilai1, setNilai1] = useState(60);
    const [nilai2, setNilai2] = useState(60);

    // function get data siswa from local storage
    const getDataSiswa = () => {
        const dataSiswa = JSON.parse (localStorage.getItem ('dataSiswa'))
        setDataSiswa (dataSiswa)
    }

    const postDataSambung = () => {
        const token = localStorage.getItem('tokenPenguji')
        const penguji = JSON.parse (localStorage.getItem('penguji'));
        console.log(penguji);
        const id_penguji = penguji.id_penguji
        const data = {
            id_event: dataSiswa.id_event,
            id_penguji: id_penguji,
            id_siswa1: dataSiswa.id_siswa,
            id_siswa2: 4,
            nilai1: nilai1,
            nilai2: nilai2
        }
          axios.post(BASE_URL + `sambung`, data, { headers: { Authorization: `Bearer ${token}` } },)
          .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error.message);
            });
    }

    useEffect (() => {
        getDataSiswa ()
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
                    <div className="min-h-full bg-darkBlue px-10 py-8 space-y-10">
                        
                        {/* wrapper siswa 1 */}
                        <div>

                            <div className="bg-purple rounded-md py-1.5 mb-7 text-center shadow-sm shadow-slate-400">
                                <h1 className='text-white text-2xl tracking-wide'>Siswa 1</h1>
                            </div>

                            {/* card siswa information */}
                            <div className="bg-navy rounded-md p-3 text-white mb-4 shadow shadow-slate-700 hover:shadow-purple transition ease-in-out duration-300">
                                <h1 className='text-green tracking-wide text-lg'>{dataSiswa.nis}</h1>
                                <h1 className='text-xl font-semibold'>{dataSiswa.name}</h1>
                                <h1 className='tracking-wide'>{dataSiswa.rayon}</h1>
                            </div>

                            {/* wrapper nilai siswa 1 */}
                            <div className="bg-navy rounded-md p-2 text-center text-white space-y-3 mb-3">
                                <h1 className='text-xl font-semibold tracking-wider'>Nilai</h1>

                                {/* nilai */}
                                <div className="grid grid-cols-3 gap-x-3 items-center">

                                    {/* button minus */}
                                    <button className='bg-red rounded-md text-center text-2xl font-bold'
                                    onClick={() => nilai1 > 60 ? setNilai1( nilai1 - 1) : []}>
                                        -
                                    </button>

                                    {/* score indicator */}
                                    <div className="outline outline-purple rounded-md h-full flex items-center justify-center">
                                        <h1 className='text-xl font-semibold'>{ nilai1 }</h1>
                                    </div>

                                    {/* button plus */}
                                    <button className='bg-purple rounded-md text-center text-2xl font-bold'
                                    onClick={() => nilai1 > 99 ? '' : setNilai1( nilai1 + 1)}>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* wrapper siswa 2 */}
                        <div>

                            <div className="bg-purple rounded-md py-1.5 mb-7 text-center shadow-sm shadow-slate-400">
                                <h1 className='text-white text-2xl tracking-wide'>Siswa 2</h1>
                            </div>

                            {/* card siswa information */}
                            <div className="bg-navy rounded-md p-3 text-white mb-4 shadow shadow-slate-700 hover:shadow-purple transition ease-in-out duration-300">
                                <h1 className='text-green tracking-wide text-lg'>{dataSiswa.nis}</h1>
                                <h1 className='text-xl font-semibold'>{dataSiswa.name}</h1>
                                <h1 className='tracking-wide'>{dataSiswa.rayon}</h1>
                            </div>

                            {/* wrapper nilai siswa 1 */}
                            <div className="bg-navy rounded-md p-2 text-center text-white space-y-3 mb-3">
                                <h1 className='text-xl font-semibold tracking-wider'>Nilai</h1>

                                {/* nilai */}
                                <div className="grid grid-cols-3 gap-x-3 items-center">

                                    {/* button minus */}
                                    <button className='bg-red rounded-md text-center text-2xl font-bold'
                                    onClick={() => nilai2 > 60 ? setNilai2( nilai2 - 1) : []}>
                                        -
                                    </button>

                                    {/* score indicator */}
                                    <div className="outline outline-purple rounded-md h-full flex items-center justify-center">
                                        <h1 className='text-xl font-semibold'>{ nilai2 }</h1>
                                    </div>

                                    {/* button plus */}
                                    <button className='bg-purple rounded-md text-center text-2xl font-bold'
                                    onClick={() => nilai2 > 99 ? '' : setNilai2( nilai2 + 1)}>
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='bg-yellow hover:bg-white rounded-md p-3 text-center text-xl text-white hover:text-yellow font-semibold shadow shadow-slate-700 duration-300' onClick={() => postDataSambung()}>Selesai</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default sambung