import React from 'react'
import Header from './components/header'

const senam = () => {
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

                        {/* senam list */}
                        <div className="grid grid-cols-2 items-center">
                            <h1 className='text-white text-xl font-semibold'>Senam 1</h1>
                            <div className="flex gap-x-2">
                                <button className='bg-white text-purple py-1.5 rounded-md w-full'>Benar</button>
                                <button className='bg-white text-purple py-1.5 rounded-md w-full'>Salah</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default senam