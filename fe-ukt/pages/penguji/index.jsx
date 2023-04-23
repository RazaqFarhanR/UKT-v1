import React from 'react'
import Link from 'next/link'
import Header from './components/header'

const index = () => {
    return (
        <div className="font-lato">

            {/* awal wrapper konten utama */}
            <div className="w-full h-screen">

                {/* header */}
                <Header />
                {/* akhir header */}
                
                {/* konten utama */}
                <div className="min-h-full bg-darkBlue px-10 py-8">
                    
                    {/* wrapper user information */}
                    <div className="flex flex-col justify-center items-center mb-7">

                        {/* photo profile */}
                        <div className="bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] p-0.5 rounded-full w-28 mb-3">
                            <img className='rounded-full object-cover' src="/images/profile.jpeg" alt="" />
                        </div>

                        {/* username */}
                        <h1 className='text-2xl font-semibold text-white'>Stevan Dean</h1>

                        {/* name */}
                        <h1 className='text-green'>Stevan Dean Achmad Ngunardi</h1>
                    </div>

                    {/* ukt card */}
                    <div className="border-t-2 border-white px-3">
                        <Link href={'/penguji/event'}>
                            <div className="hover:scale-105 transition ease-in-out duration-500 hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5  mt-4">
                                <div className="bg-navy shadow drop-shadow-lg rounded-md p-5 text-center">
                                    <h1 className='text-xl font-semibold text-green tracking-wide'>UKT Jambon</h1>
                                    <h1 className='text-white tracking-wider'>30 Siswa</h1>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index