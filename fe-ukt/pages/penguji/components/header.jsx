import React from 'react'
import Link from 'next/link'

const header = () => {
    return (
        <>
            <div className="sticky top-0 z-10 header border-b bg-navy shadow shadow-black w-full px-2 py-3 font-lato">
                <Link href={'/penguji/edit_profile'} className="absolute px-2 translate-y-1">
                    <svg className='stroke-white hover:stroke-purple duration-300' width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 26.25V23.75C25 22.4239 24.4732 21.1521 23.5355 20.2145C22.5979 19.2768 21.3261 18.75 20 18.75H10C8.67392 18.75 7.40215 19.2768 6.46447 20.2145C5.52678 21.1521 5 22.4239 5 23.75V26.25" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 13.75C17.7614 13.75 20 11.5114 20 8.75C20 5.98858 17.7614 3.75 15 3.75C12.2386 3.75 10 5.98858 10 8.75C10 11.5114 12.2386 13.75 15 13.75Z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Link>
                <div className="flex justify-center items-center px-4">

                    {/* Title */}
                    <h1 className='text-white font-semibold text-lg'>PSHT Cabang Trenggalek</h1>
                </div>
            </div>
        </>
    )
}

export default header