import React from 'react'
import Header from './components/header'

const teknik = () => {
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
                            <h1 className='text-green tracking-wide text-lg'>0800113784</h1>
                            <h1 className='text-xl font-semibold'>Nadia  Azza Destination Wkwk</h1>
                            <h1 className='tracking-wide'>Trenggalek</h1>
                        </div>

                        {/* wrapper fisik list */}
                        <div className="bg-navy rounded-md p-2 text-center text-white space-y-3 mb-3">
                            <h1 className='text-xl font-semibold tracking-wider'>Teknik 1</h1>

                            {/* fisik list */}
                            <div className="grid grid-cols-3 gap-x-3 items-center">

                                {/* button kurang */}
                                <button className='font-semibold bg-white rounded-md text-purple py-1.5'>Kurang</button>

                                {/* button cukup */}
                                <button className='font-semibold bg-white rounded-md text-purple py-1.5'>Cukup</button>

                                {/* button baik */}
                                <button className='font-semibold bg-white rounded-md text-purple py-1.5'>Baik</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default teknik