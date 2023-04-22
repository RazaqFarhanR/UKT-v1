import React from 'react'
import Link from 'next/link'

const ujian = () => {
    return (
        <>
            <div className="font-lato">

                {/* awal wrapper konten utama */}
                <div className="w-full h-screen">

                    {/* header */}
                    <div className="sticky top-0 z-10 header border-b bg-navy shadow shadow-black w-full px-2 py-3 font-lato">
                        <div className="relative ">

                            <div className="absolute">
                                <img className='w-10' src="/images/psht-icon.png" alt="" />
                            </div>
                                
                            <div className="flex justify-center items-center">

                                {/* Title */}
                                <h1 className='text-white font-semibold text-lg'>PSHT Cabang Trenggalek</h1>
                            </div>
                        </div>
                    </div>
                    {/* akhir header */}

                    {/* konten utama */}
                    <div className="min-h-full bg-darkBlue px-10 py-8">
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default ujian