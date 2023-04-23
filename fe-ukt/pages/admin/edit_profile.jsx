import React, { useState } from 'react'
import Link from 'next/link'
import Footer from './components/footer'

const edit_profile = () => {

    // state password
    const [passwordType, setPassworrdType] = useState ('password')
    const [passwordInput, setPasswordInput] = useState ('')

    // function show hide password
    const showPassword = () => {
        if (passwordType === 'password') {
            setPassworrdType ('text')
            console.log('hide password');
            return;
        } else {
            setPassworrdType ('password')
            console.log('show password');
        }
    }

    return (
        <>
            <div className="flex font-lato">

                {/* awal wrapper konten utama */}
                {/* supaya konten header dapat di scroll dan tidak mempengaruhi sidebar */}
                <div className="w-full overflow-y-auto h-screen">

                    {/* overlap untuk device sm */}
                    {/* <div className="absolute hidden lg:hidden inset-0 bg-slate-400 opacity-50 z-10">
                    </div> */}

                    {/* header */}
                    <div className="sticky top-0 z-10 header border-b bg-black w-full px-2 py-3 font-lato">
                        {/* button sidebar */}
                        <Link href={'/admin'} className="text-slate-600 text-2xl w-10 h-10 absolute translate-y-1 px-2 group">
                            <svg className='stroke-white group-hover:stroke-purple duration-300' width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23 10H2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10 18L2 10L10 2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>

                        {/* Title */}
                        <div className="flex justify-center items-center">
                        <   h1 className='text-white font-semibold text-xl'>PSHT Cabang Trenggalek</h1>
                        </div>
                    </div>

                    {/* akhir header */}

                    <img className='group-hover:hidden object-cover rounded-full' src="/images/profile.jpeg" alt="" />        {/* konten utama */}
                    <div className="min-h-full bg-darkBlue p-10">

                        {/* wrapper */}
                        <div className="lg:w-2/5 m-auto space-y-7">
    
                            {/* wrapper foto profile */}
                            <div className="flex justify-center">
                                <button className="bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] w-40 h-40 rounded-full p-1 group">
                                    <img className='group-hover:hidden object-cover rounded-full' src="/images/profile.jpeg" alt="" />
                                    <div className="hidden rounded-full w-full h-full group-hover:flex flex-col justify-center items-center gap-y-2">
                                        <img className='object-cover rounded-full' src="/images/profile.jpeg" alt="" />
                                        <svg className='absolute' width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14 20.9444C15.75 20.9444 17.2377 20.3123 18.4632 19.0479C19.6887 17.7835 20.3009 16.249 20.3 14.4444C20.3 12.6389 19.6873 11.1039 18.4618 9.83955C17.2363 8.57518 15.7491 7.94348 14 7.94444C12.25 7.94444 10.7623 8.57663 9.5368 9.841C8.31133 11.1054 7.69907 12.6399 7.7 14.4444C7.7 16.25 8.31273 17.785 9.5382 19.0493C10.7637 20.3137 12.2509 20.9454 14 20.9444ZM14 19.5L12.46 16.0333L9.1 14.4444L12.46 12.8556L14 9.38889L15.54 12.8556L18.9 14.4444L15.54 16.0333L14 19.5ZM2.8 26C2.03 26 1.3706 25.7169 0.821802 25.1507C0.273002 24.5844 -0.000930956 23.9046 2.37691e-06 23.1111V5.77778C2.37691e-06 4.98333 0.274402 4.303 0.823202 3.73678C1.372 3.17056 2.03094 2.88793 2.8 2.88889H7.21L9.8 0H18.2L20.79 2.88889H25.2C25.97 2.88889 26.6294 3.172 27.1782 3.73822C27.727 4.30444 28.0009 4.9843 28 5.77778V23.1111C28 23.9056 27.7256 24.5859 27.1768 25.1521C26.628 25.7183 25.9691 26.001 25.2 26H2.8Z" fill="white"/>
                                        </svg>
                                        <h1 className='text-white absolute translate-y-7'>Ubah Foto</h1>
                                    </div>
                                </button>
                            </div>

                            {/* wrapper form nama */}
                            <div className="flex flex-col gap-y-2">
                                <label className='text-purple text-lg tracking-wider' htmlFor="">Nama Anda</label>
                                <input placeholder='Jerome J. Colman' className='rounded-md bg-navy p-2 text-white focus:outline-purple w-full' type="text" />
                            </div>

                            {/* wrapper form username */}
                            <div className="flex flex-col gap-y-2">
                                <label className='text-purple text-lg tracking-wider' htmlFor="">Username</label>
                                <input placeholder='jerome' className='rounded-md bg-navy p-2 text-white focus:outline-purple w-full' type="text" />
                            </div>

                            {/* wrapper form password */}
                            <div className="flex flex-col gap-y-2">
                                <div className="flex justify-between">
                                    <label className='text-purple text-lg tracking-wider' htmlFor="">Password</label>
                                    <button onClick={() => showPassword()}>
                                        <svg width="25" height="23" viewBox="0 0 34 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17 6.9C18.2296 6.9 19.4089 7.38464 20.2784 8.24731C21.1479 9.10998 21.6364 10.28 21.6364 11.5C21.6364 12.72 21.1479 13.89 20.2784 14.7527C19.4089 15.6154 18.2296 16.1 17 16.1C15.7704 16.1 14.5911 15.6154 13.7216 14.7527C12.8521 13.89 12.3636 12.72 12.3636 11.5C12.3636 10.28 12.8521 9.10998 13.7216 8.24731C14.5911 7.38464 15.7704 6.9 17 6.9ZM17 0C24.7273 0 31.3264 4.76867 34 11.5C31.3264 18.2313 24.7273 23 17 23C9.27273 23 2.67364 18.2313 0 11.5C2.67364 4.76867 9.27273 0 17 0ZM3.36909 11.5C4.61821 14.0305 6.55784 16.1625 8.96747 17.6537C11.3771 19.1448 14.1601 19.9354 17 19.9354C19.8399 19.9354 22.6229 19.1448 25.0325 17.6537C27.4422 16.1625 29.3818 14.0305 30.6309 11.5C29.3818 8.96953 27.4422 6.83752 25.0325 5.34634C22.6229 3.85517 19.8399 3.06464 17 3.06464C14.1601 3.06464 11.3771 3.85517 8.96747 5.34634C6.55784 6.83752 4.61821 8.96953 3.36909 11.5Z" fill="white"/>
                                        </svg>
                                    </button>
                                </div>
                                <input className='rounded-md bg-navy p-2 text-white focus:outline-purple w-full' type={passwordType} value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    {/* akhir konten utama */}

                    {/* footer */}
                    <Footer />
                    {/* akhir footer */}

                </div>
                {/* akhir wrapper konten utama */}
            </div>  
        </>
    )
}

export default edit_profile