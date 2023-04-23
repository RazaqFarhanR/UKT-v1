import React, { useEffect, useState } from 'react'
import Header from './components/header'

const sambung = () => {

    // state
    const [dataSiswa, setDataSiswa] = useState ([])

    // function get data siswa from local storage
    const getDataSiswa = () => {
        const dataSiswa = JSON.parse (localStorage.getItem ('dataSiswa'))
        setDataSiswa (dataSiswa)
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
                                    <button className='bg-red rounded-md text-center text-2xl font-bold'>
                                        -
                                    </button>

                                    {/* score indicator */}
                                    <div className="outline outline-purple rounded-md h-full flex items-center justify-center">
                                        <h1 className='text-xl font-semibold'>80</h1>
                                    </div>

                                    {/* button plus */}
                                    <button className='bg-purple rounded-md text-center text-2xl font-bold'>
                                        +
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
                                    <button className='bg-red rounded-md text-center text-2xl font-bold'>
                                        -
                                    </button>

                                    {/* score indicator */}
                                    <div className="outline outline-purple rounded-md h-full flex items-center justify-center">
                                        <h1 className='text-xl font-semibold'>80</h1>
                                    </div>

                                    {/* button plus */}
                                    <button className='bg-purple rounded-md text-center text-2xl font-bold'>
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default sambung