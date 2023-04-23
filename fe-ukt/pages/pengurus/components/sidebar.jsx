import React, { useContext, useEffect, useState } from 'react'
import { globalState } from '@/context/context'
import { useRouter } from 'next/router'
import Link from 'next/link'

const sidebar = () => {

    // state role
    const [role, setRole] = useState ([])

    const getRole = () => {
        const role = JSON.parse(localStorage.getItem ('pengurus'))
        setRole (role)
    }

    // deklarasi router
    const router = useRouter()

    // state router
    const location = useRouter()
    const { pathname } = location
    const splitLoc = pathname.split('/pengurus/')

    // state sidebar
    const {showSideBar, setShowSideBar} = useContext (globalState)

    useEffect (() => {
        getRole ()
    }, [])

    return (
        <aside className="absolute z-20 lg:relative transition-all font-lato">
            
            {/* wrapper */}
            <div className={`${showSideBar ? 'w-60 py-8 px-5' : 'w-20 py-6 px-4 text-center'} h-screen overflow-y-auto shadow-md drop-shadow-md bg-navy transition-all duration-300 scrollbar-hide`}>

                {/* awal content */}
                <div className='flex flex-col items-center'>

                    {/* photo profile */}
                    <div className={`${showSideBar ? 'block' : 'hidden'} h-fit rounded-full bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] p-0.5 mb-3`}>
                        <img className='object-cover rounded-full w-28' src="/images/profile.jpeg" alt="" />
                    </div>

                    {/* username and name */}
                    <div className={`${showSideBar ? 'block' : 'hidden'} text-center mb-5`}>
                        <h1 className='text-white text-xl font-medium tracking-wider'>{splitLoc}</h1>
                        <span className='text-green text-sm'>japir love rapip</span>
                    </div>

                    {/* wrapper navigation button */}
                    <div className="space-y-4 w-full">

                        {/* ---------- DASHBOARD ---------- */}
                        <Link href={'/pengurus/'} className={splitLoc[1] === '' ? 
                        
                        // clicked
                        `${showSideBar ? 'px-5 py-4 gap-x-3' : 'justify-center p-2'} bg-white shadow-md shadow-purple rounded-lg flex items-center text-purple` 
                        : 
                        
                        // not clicked
                        `${showSideBar ? 'px-5 py-4 gap-x-3' : 'justify-center p-2'} flex items-center text-white`}>        
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.125 6.37484L8.5 1.4165L14.875 6.37484V14.1665C14.875 14.5422 14.7257 14.9026 14.4601 15.1682C14.1944 15.4339 13.8341 15.5832 13.4583 15.5832H3.54167C3.16594 15.5832 2.80561 15.4339 2.53993 15.1682C2.27426 14.9026 2.125 14.5422 2.125 14.1665V6.37484Z" stroke="#6464F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M6.375 15.5833V8.5H10.625V15.5833" stroke="#6464F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <h1 className={`${showSideBar ? 'block' : 'hidden'} translate-y-[1px]`}>Dashboard</h1>
                        </Link>

                        {/* navigation button data */}
                        <div className={`${showSideBar ? '' : 'space-y-3'}`}>
                            <h1 className='text-gray mb-2'>Data</h1>
                                                
                            {/* ---------- SISWA ---------- */}
                            <Link href={'/pengurus/data/siswa'} className={splitLoc[1] === 'data/siswa' || splitLoc[1] === 'data/detail_siswa' ?
                            
                            // clicked
                            `${showSideBar ? 'px-5 py-2 gap-x-3' : 'justify-center p-2'} bg-white shadow-md shadow-purple rounded-lg flex items-center text-purple` 
                            : 
                            
                            // not clicked
                            `${showSideBar ? 'px-5 py-2 gap-x-3' : 'justify-center p-2'} flex items-center text-white`}>            
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.5503 2.64594L8.70472 0.0307256C8.57159 -0.0102419 8.42922 -0.0102419 8.29609 0.0307256L0.458636 2.64594H0.442291L0.360566 2.6868H0.352393L0.270668 2.73583C0.270668 2.74401 0.262496 2.74401 0.254323 2.75218L0.188943 2.80939L0.131735 2.87477C0.131735 2.88294 0.123563 2.88294 0.123563 2.89111L0.0745273 2.96466C0.0745273 2.97284 0.0745273 2.97284 0.0663548 2.98101L0.0336647 3.05456L0.00914718 3.14446V3.16898C0.00108611 3.201 -0.00167465 3.23413 0.000974615 3.26705V9.80507C0.000974615 9.97847 0.0698571 10.1448 0.192469 10.2674C0.315081 10.39 0.481378 10.4589 0.654777 10.4589C0.828176 10.4589 0.994473 10.39 1.11708 10.2674C1.2397 10.1448 1.30858 9.97847 1.30858 9.80507V4.1742L4.05455 5.08952C3.53867 5.91527 3.26669 6.87002 3.26999 7.84366C3.27029 8.72916 3.4954 9.60009 3.92422 10.3748C4.35304 11.1496 4.97154 11.8028 5.72175 12.2732C4.16275 12.8629 2.83182 13.9334 1.92152 15.3297C1.82873 15.4764 1.7973 15.6537 1.83399 15.8234C1.87067 15.9931 1.97255 16.1416 2.11766 16.2369C2.18887 16.284 2.26874 16.3166 2.35264 16.3327C2.43653 16.3488 2.52279 16.3481 2.6064 16.3306C2.69002 16.3131 2.76934 16.2792 2.83976 16.2309C2.91017 16.1825 2.9703 16.1206 3.01664 16.0489C3.61007 15.1348 4.42259 14.3835 5.38031 13.8634C6.33803 13.3434 7.41058 13.0709 8.50041 13.0709C9.59023 13.0709 10.6628 13.3434 11.6205 13.8634C12.5782 14.3835 13.3907 15.1348 13.9842 16.0489C14.0439 16.1395 14.1252 16.2139 14.2208 16.2652C14.3163 16.3166 14.4232 16.3433 14.5317 16.3431C14.657 16.3444 14.7796 16.3073 14.8832 16.2369C15.0283 16.1416 15.1301 15.9931 15.1668 15.8234C15.2035 15.6537 15.1721 15.4764 15.0793 15.3297C14.169 13.9334 12.8381 12.8629 11.2791 12.2732C12.0293 11.8028 12.6478 11.1496 13.0766 10.3748C13.5054 9.60009 13.7305 8.72916 13.7308 7.84366C13.7341 6.87002 13.4621 5.91527 12.9463 5.08952L16.5503 3.88816C16.6812 3.84517 16.795 3.76197 16.8758 3.65044C16.9565 3.53891 17 3.40474 17 3.26705C17 3.12936 16.9565 2.99518 16.8758 2.88365C16.795 2.77212 16.6812 2.68893 16.5503 2.64594ZM12.4232 7.84366C12.4232 8.88406 12.0099 9.88184 11.2743 10.6175C10.5386 11.3532 9.5408 11.7665 8.50041 11.7665C7.46001 11.7665 6.46223 11.3532 5.72656 10.6175C4.99089 9.88184 4.57759 8.88406 4.57759 7.84366C4.57917 7.00658 4.84518 6.19139 5.33764 5.51449L8.29609 6.50337C8.4288 6.54703 8.57201 6.54703 8.70472 6.50337L11.6632 5.51449C12.1556 6.19139 12.4216 7.00658 12.4232 7.84366ZM11.6632 4.14151H11.655L8.50041 5.19576L5.34581 4.14151H5.33764L2.72243 3.26705L8.50041 1.33833L14.2784 3.26705L11.6632 4.14151Z" fill={splitLoc[1] === 'data/siswa' || splitLoc[1] === 'data/detail_siswa' ? '#6464F6' : "white"}/>
                                </svg>
                                <h1 className={`${showSideBar ? 'block' : 'hidden'} translate-y-[1px]`}>Siswa</h1>
                            </Link>
                            
                            {/* ---------- PENGUJI ---------- */}
                            <Link href={'/pengurus/data/penguji'} className={splitLoc[1] === 'data/penguji' || splitLoc[1] === 'data/penguji_cabang' || splitLoc[1] === 'data/penguji_ranting' ? 
                            
                            // clicked
                            `${showSideBar ? 'px-5 py-2 gap-x-3' : 'justify-center p-2'} bg-white shadow-md shadow-purple rounded-lg flex items-center text-purple` 
                            : 
                            
                            // not clicked
                            `${showSideBar ? 'px-5 py-2 gap-x-3' : 'justify-center p-2'} flex items-center text-white`}>                      
                                <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.6923 0H1.30769C0.960871 0 0.628254 0.137774 0.383014 0.383014C0.137774 0.628254 0 0.960871 0 1.30769V13.0769C0 13.4237 0.137774 13.7564 0.383014 14.0016C0.628254 14.2468 0.960871 14.3846 1.30769 14.3846H2.40288C2.52669 14.385 2.64799 14.3497 2.75233 14.2831C2.85666 14.2164 2.93963 14.1211 2.99135 14.0087C3.31126 13.3391 3.81414 12.7738 4.44184 12.3781C5.06954 11.9823 5.79642 11.7723 6.53846 11.7723C7.2805 11.7723 8.00738 11.9823 8.63508 12.3781C9.26278 12.7738 9.76566 13.3391 10.0856 14.0087C10.1373 14.1211 10.2203 14.2164 10.3246 14.2831C10.4289 14.3497 10.5502 14.385 10.674 14.3846H15.6923C16.0391 14.3846 16.3717 14.2468 16.617 14.0016C16.8622 13.7564 17 13.4237 17 13.0769V1.30769C17 0.960871 16.8622 0.628254 16.617 0.383014C16.3717 0.137774 16.0391 0 15.6923 0ZM4.57692 8.5C4.57692 8.11204 4.69197 7.7328 4.9075 7.41023C5.12304 7.08765 5.42939 6.83624 5.78781 6.68777C6.14624 6.53931 6.54064 6.50047 6.92114 6.57615C7.30164 6.65184 7.65115 6.83866 7.92548 7.11298C8.19981 7.38731 8.38662 7.73682 8.46231 8.11732C8.538 8.49782 8.49915 8.89222 8.35069 9.25065C8.20222 9.60907 7.95081 9.91542 7.62823 10.131C7.30566 10.3465 6.92642 10.4615 6.53846 10.4615C6.01889 10.4594 5.52122 10.252 5.15382 9.88464C4.78643 9.51725 4.57907 9.01957 4.57692 8.5ZM15.6923 13.0769H11.0663C10.5206 12.1381 9.69866 11.3903 8.7125 10.9356C9.20745 10.4949 9.55677 9.91414 9.71416 9.27037C9.87155 8.62661 9.82957 7.95021 9.59379 7.33085C9.358 6.71149 8.93955 6.17841 8.39391 5.80228C7.84826 5.42616 7.20119 5.22474 6.53846 5.22474C5.87574 5.22474 5.22866 5.42616 4.68302 5.80228C4.13737 6.17841 3.71892 6.71149 3.48314 7.33085C3.24735 7.95021 3.20537 8.62661 3.36276 9.27037C3.52015 9.91414 3.86947 10.4949 4.36442 10.9356C3.37826 11.3903 2.55631 12.1381 2.01058 13.0769H1.30769V1.30769H15.6923V13.0769ZM2.61538 4.57692V3.26923C2.61538 3.09582 2.68427 2.92951 2.80689 2.80689C2.92951 2.68427 3.09582 2.61538 3.26923 2.61538H13.7308C13.9042 2.61538 14.0705 2.68427 14.1931 2.80689C14.3157 2.92951 14.3846 3.09582 14.3846 3.26923V11.1154C14.3846 11.2888 14.3157 11.4551 14.1931 11.5777C14.0705 11.7003 13.9042 11.7692 13.7308 11.7692H12.4231C12.2497 11.7692 12.0834 11.7003 11.9607 11.5777C11.8381 11.4551 11.7692 11.2888 11.7692 11.1154C11.7692 10.942 11.8381 10.7757 11.9607 10.653C12.0834 10.5304 12.2497 10.4615 12.4231 10.4615H13.0769V3.92308H3.92308V4.57692C3.92308 4.75033 3.85419 4.91664 3.73157 5.03926C3.60895 5.16188 3.44264 5.23077 3.26923 5.23077C3.09582 5.23077 2.92951 5.16188 2.80689 5.03926C2.68427 4.91664 2.61538 4.75033 2.61538 4.57692Z" fill={splitLoc[1] === 'data/penguji' || splitLoc[1] === 'data/penguji_cabang' || splitLoc[1] === 'data/penguji_ranting' ? '#6464F6' : "white"}/>
                                </svg>
                                <h1 className={`${showSideBar ? 'block' : 'hidden'} translate-y-[1px]`}>Penguji</h1>
                            </Link>

                        </div>

                        {/* navigation button UKT */}
                        <div className={`${showSideBar ? '' : 'space-y-3'}`}>
                            <h1 className='text-gray mb-2'>UKT</h1>

                            {/* ---------- UKT JAMBON ---------- */}
                            <Link href={'/pengurus/ukt/ukt_jambon'} className={splitLoc[1] === 'ukt_jambon' ? 
                            `${showSideBar ? 'px-5 py-2 gap-x-3' : 'justify-center p-2'} bg-white shadow-md shadow-purple rounded-lg flex items-center text-purple` 
                            :
                            `${showSideBar ? 'px-5 py-2 gap-x-3' : 'justify-center p-2'} flex items-center text-white`}>
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="17" height="17" rx="3" fill="#FF32DE"/>
                                </svg>
                                <h1 className={`${showSideBar ? 'block' : 'hidden'} translate-y-[1px]`}>UKT Jambon</h1>
                            </Link>

                            {/* ---------- UKT HIJAU ---------- */}
                            <Link href={'/pengurus/ukt/ukt_hijau'} className={splitLoc[1] === 'ukt_hijau' ? 
                            `${showSideBar ? 'px-5 py-2 gap-x-3' : 'justify-center p-2'} bg-white shadow-md shadow-purple rounded-lg flex items-center text-purple` 
                            :
                            `${showSideBar ? 'px-5 py-2 gap-x-3' : 'justify-center p-2'} flex items-center text-white`}>
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="17" height="17" rx="3" fill="#0B8800"/>
                                </svg>
                                <h1 className={`${showSideBar ? 'block' : 'hidden'} translate-y-[1px]`}>UKT Hijau</h1>
                            </Link>

                            {/* ---------- UKT PUTIH ---------- */}
                            <Link href={'/pengurus/ukt/ukt_putih'} className={splitLoc[1] === 'ukt_putih' ? 
                            `${showSideBar ? 'px-5 py-2 gap-x-3' : 'justify-center p-2'} bg-white shadow-md shadow-purple rounded-lg flex items-center text-purple` 
                            :
                            `${showSideBar ? 'px-5 py-2 gap-x-3' : 'justify-center p-2'} flex items-center text-white`}>
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="17" height="17" rx="3" fill="#FFFFFF"/>
                                </svg>
                                <h1 className={`${showSideBar ? 'block' : 'hidden'} translate-y-[1px]`}>UKT Putih</h1>
                            </Link>

                            {/* ---------- UKCW ---------- */}
                            <Link href={'/pengurus/ukt/ukcw'} className={splitLoc[1] === 'ukcw' ? 
                            `${showSideBar ? 'px-5 py-2 gap-x-3' : 'justify-center p-2'} bg-white shadow-md shadow-purple rounded-lg flex items-center text-purple` 
                            :
                            `${showSideBar ? 'px-5 py-2 gap-x-3' : 'justify-center p-2'} flex items-center text-white`}>
                                
                                <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.5 0L0 4.63636L3.09091 6.32091V10.9573L8.5 13.9091L13.9091 10.9573V6.32091L15.4545 5.47864V10.8182H17V4.63636L8.5 0ZM13.77 4.63636L8.5 7.51091L3.23 4.63636L8.5 1.76182L13.77 4.63636ZM12.3636 10.0455L8.5 12.1473L4.63636 10.0455V7.16318L8.5 9.27273L12.3636 7.16318V10.0455Z" fill={splitLoc[1] === 'ukcw' ? '#6464F6' : "white"}/>
                                </svg>

                                <h1 className={`${showSideBar ? 'block' : 'hidden'} translate-y-[1px]`}>UKCW</h1>
                            </Link>
                        </div>
                    </div>

                </div>
                {/* akhir content */}

            </div>
        </aside>
    )
}

export default sidebar