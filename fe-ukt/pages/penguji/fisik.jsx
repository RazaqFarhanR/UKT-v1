import React from 'react'
import Header from './components/header'

const fisik = () => {
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
                            <h1 className='text-xl font-semibold tracking-wider'>MFT</h1>

                            {/* fisik list */}
                            <div className="grid grid-cols-3 gap-x-3 items-center">

                                {/* button minus */}
                                <button className='bg-red rounded-md text-center text-2xl font-bold'>
                                    -
                                </button>

                                {/* score indicator */}
                                <div className="outline outline-purple rounded-md h-full flex items-center justify-center">
                                    <h1 className='text-xl font-semibold'>8,1</h1>
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
        </>
    )
}

export default fisik