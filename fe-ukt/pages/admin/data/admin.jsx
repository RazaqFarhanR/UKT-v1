import React, { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Footer from '../components/footer'
import Link from 'next/link'

const admin = () => {

    // state
    const [role, setRole] = useState ([])

    const getRole = () => {
        const role = JSON.parse (localStorage.getItem ('admin'))
        setRole (role)
    }

    // state login
    useEffect (() => {
        getRole ()
    }, [])

    return (
        <div className="flex font-lato">

            {/* sidebar */}
            <Sidebar />
            {/* akhir sidebar */}

            {/* awal wrapper konten utama */}
            {/* supaya konten header dapat di scroll dan tidak mempengaruhi sidebar */}
            <div className="w-full overflow-y-auto h-screen">

                {/* overlap untuk device sm */}
                {/* <div className="absolute hidden lg:hidden inset-0 bg-slate-400 opacity-50 z-10">
                </div> */}

                {/* header */}
                <Header />
                {/* akhir header */}

                {/* konten utama */}
                <div className="min-h-full bg-darkBlue p-6">

                    {/* wrapper page name and search */}
                    <div className="flex justify-between items-center text-white mb-7">

                        {/* page name */}
                        <h1 className='text-2xl tracking-wider'>Admin</h1>

                        {/* search */}
                        <div className="bg-purple rounded-md px-5 py-2 flex items-center gap-x-2 w-72">
                            <svg className='z-50' width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.625 16.625C13.491 16.625 16.625 13.491 16.625 9.625C16.625 5.75901 13.491 2.625 9.625 2.625C5.75901 2.625 2.625 5.75901 2.625 9.625C2.625 13.491 5.75901 16.625 9.625 16.625Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18.3746 18.3751L14.5684 14.5688" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <input className='bg-transparent placeholder:text-white placeholder:tracking-wider placeholder:text-sm w-full focus:outline-none' placeholder='Search' type="text" />
                        </div>
                    </div>

                    {/* data count */}
                    <div className="grid grid-cols-2 gap-x-5">

                        {/* card admin cabang */}
                        {(() => {
                            if (role.id_role === 'super admin') {
                                return (
                                    <Link href={'./admin_cabang'} className="bg-navy hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5">

                                        {/* inner bg */}
                                        <div className="bg-navy p-5 rounded-md space-y-5">

                                            {/* data name */}
                                            <div className="flex justify-between items-center">
                                                <h1 className='text-green text-2xl'>Admin Cabang</h1>
                                                <svg width="25" height="25" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_273_111)">
                                                        <path d="M7.33996 7.40502C6.67125 7.40502 6.01756 7.20666 5.46161 6.83504C4.90567 6.46342 4.47245 5.93524 4.21677 5.31733C3.96109 4.69943 3.89445 4.01957 4.02527 3.36377C4.1561 2.70798 4.47851 2.10573 4.95171 1.63323C5.42491 1.16073 6.02764 0.839211 6.68362 0.709358C7.33961 0.579505 8.01937 0.647155 8.6369 0.903746C9.25442 1.16034 9.78196 1.59434 10.1528 2.15083C10.5236 2.70733 10.7209 3.36131 10.72 4.03002C10.7173 4.92518 10.3602 5.78285 9.72676 6.41535C9.09331 7.04786 8.23512 7.4037 7.33996 7.40502ZM7.33996 1.65002C6.86924 1.65002 6.40909 1.78961 6.0177 2.05112C5.62631 2.31264 5.32126 2.68435 5.14113 3.11923C4.96099 3.55412 4.91386 4.03266 5.00569 4.49434C5.09752 4.95601 5.3242 5.38009 5.65704 5.71293C5.98989 6.04578 6.41397 6.27246 6.87564 6.36429C7.33732 6.45612 7.81586 6.40899 8.25075 6.22885C8.68563 6.04872 9.05734 5.74367 9.31886 5.35228C9.58037 4.96089 9.71996 4.50074 9.71996 4.03002C9.71996 3.39881 9.46921 2.79344 9.02287 2.34711C8.57654 1.90077 7.97117 1.65002 7.33996 1.65002Z" fill="#42C6A3"/>
                                                        <path d="M8.21 15.8401C8.10072 15.7308 8.01643 15.5991 7.96291 15.4541C7.9094 15.3091 7.88793 15.1542 7.9 15.0001H2V12.1101C2.70895 11.3537 3.56885 10.7545 4.52405 10.3514C5.47924 9.94829 6.50843 9.75027 7.545 9.77013H7.905C7.88205 9.60249 7.89808 9.43182 7.95185 9.27139C8.00561 9.11095 8.09567 8.96509 8.215 8.84513L8.275 8.79013C8.04 8.79013 7.775 8.76013 7.545 8.76013C6.3252 8.73117 5.11421 8.97363 3.99959 9.46998C2.88496 9.96633 1.89456 10.7042 1.1 11.6301C1.03509 11.7167 1 11.8219 1 11.9301V15.0001C1 15.2653 1.10536 15.5197 1.29289 15.7072C1.48043 15.8948 1.73478 16.0001 2 16.0001H8.35L8.21 15.8401Z" fill="#42C6A3"/>
                                                        <path d="M13.4346 8.14495C13.4593 8.13983 13.4848 8.13983 13.5096 8.14495C13.4848 8.14045 13.4594 8.14045 13.4346 8.14495Z" fill="#42C6A3"/>
                                                        <path d="M16.8401 11.6602L15.8401 11.3552C15.7687 11.1106 15.6714 10.8743 15.5501 10.6502L16.0501 9.72023C16.0664 9.68303 16.0703 9.6416 16.0613 9.60201C16.0523 9.56241 16.0309 9.52675 16.0001 9.50023L15.2751 8.77523C15.2477 8.74555 15.2111 8.72596 15.1712 8.71961C15.1313 8.71326 15.0904 8.72052 15.0551 8.74023L14.1351 9.24023C13.9086 9.11288 13.6688 9.01061 13.4201 8.93523L13.1151 7.93523C13.1022 7.89842 13.0776 7.86682 13.0452 7.84517C13.0127 7.82353 12.9741 7.81302 12.9351 7.81523H11.9101C11.8708 7.81478 11.8323 7.82724 11.8007 7.85072C11.7691 7.87421 11.7461 7.9074 11.7351 7.94523L11.4301 8.94523C11.1797 9.01809 10.9382 9.11872 10.7101 9.24523L9.80013 8.74523C9.76561 8.7259 9.72557 8.71884 9.68652 8.7252C9.64748 8.73156 9.61173 8.75095 9.58513 8.78023L8.84513 9.50023C8.81769 9.52912 8.80003 9.56591 8.79465 9.60539C8.78927 9.64487 8.79643 9.68505 8.81513 9.72023L9.31513 10.6302C9.18288 10.8556 9.07718 11.0955 9.00013 11.3452L8.00013 11.6452C7.9623 11.6562 7.9291 11.6792 7.90562 11.7108C7.88214 11.7424 7.86967 11.7809 7.87013 11.8202V12.8452C7.87308 12.8813 7.88718 12.9157 7.91046 12.9434C7.93375 12.9712 7.96508 12.991 8.00013 13.0002L9.00013 13.3052C9.07403 13.5505 9.17463 13.7869 9.30013 14.0102L8.80013 14.9652C8.78105 14.9994 8.77366 15.039 8.77907 15.0778C8.78449 15.1166 8.80241 15.1525 8.83013 15.1802L9.55513 15.9052C9.58345 15.9335 9.61996 15.9521 9.65946 15.9584C9.69896 15.9646 9.73944 15.9583 9.77513 15.9402L10.7101 15.4402C10.9326 15.5599 11.1673 15.6554 11.4101 15.7252L11.7101 16.7252C11.7224 16.7622 11.7458 16.7946 11.7771 16.8178C11.8084 16.8411 11.8461 16.8541 11.8851 16.8552H12.9101C12.9493 16.8549 12.9874 16.8421 13.0188 16.8187C13.0503 16.7954 13.0735 16.7626 13.0851 16.7252L13.3901 15.7002C13.6297 15.6304 13.8611 15.5348 14.0801 15.4152L15.0251 15.9152C15.0599 15.9337 15.0997 15.9403 15.1385 15.9339C15.1774 15.9276 15.213 15.9088 15.2401 15.8802L16.0001 15.2002C16.0206 15.1709 16.0315 15.136 16.0315 15.1002C16.0315 15.0645 16.0206 15.0296 16.0001 15.0002L15.5001 14.0602C15.6215 13.8397 15.7187 13.6067 15.7901 13.3652L16.7901 13.0602C16.828 13.0493 16.8612 13.0263 16.8846 12.9946C16.9081 12.963 16.9206 12.9246 16.9201 12.8852V11.8352C16.9247 11.8015 16.9196 11.7671 16.9055 11.7361C16.8913 11.7052 16.8687 11.6788 16.8401 11.6602ZM12.4251 14.0002C12.0944 14.0012 11.7708 13.904 11.4955 13.7209C11.2201 13.5377 11.0052 13.277 10.8782 12.9716C10.7512 12.6663 10.7177 12.3301 10.782 12.0057C10.8463 11.6812 11.0054 11.3832 11.2393 11.1494C11.4731 10.9155 11.7711 10.7564 12.0956 10.6921C12.42 10.6278 12.7562 10.6613 13.0615 10.7883C13.3669 10.9153 13.6276 11.1302 13.8108 11.4056C13.9939 11.6809 14.0911 12.0045 14.0901 12.3352C14.0888 12.7764 13.913 13.1991 13.601 13.5111C13.289 13.8231 12.8663 13.9989 12.4251 14.0002Z" fill="#42C6A3"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_273_111">
                                                            <rect width="18" height="18" fill="white"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                            </div>

                                            {/* data count and button add data */}
                                            <h1 className='text-white text-4xl font-semibold tracking-wider'>1180</h1>
                                        </div>
                                    </Link>
                                )
                            } else if (role.id_role === 'admin ranting') {
                                return (
                                    <Link href={'./admin_cabang'} className="hidden bg-navy hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5">

                                        {/* inner bg */}
                                        <div className="bg-navy p-5 rounded-md space-y-5">

                                            {/* data name */}
                                            <div className="flex justify-between items-center">
                                                <h1 className='text-green text-2xl'>Admin Cabang</h1>
                                                <svg width="25" height="25" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_273_111)">
                                                        <path d="M7.33996 7.40502C6.67125 7.40502 6.01756 7.20666 5.46161 6.83504C4.90567 6.46342 4.47245 5.93524 4.21677 5.31733C3.96109 4.69943 3.89445 4.01957 4.02527 3.36377C4.1561 2.70798 4.47851 2.10573 4.95171 1.63323C5.42491 1.16073 6.02764 0.839211 6.68362 0.709358C7.33961 0.579505 8.01937 0.647155 8.6369 0.903746C9.25442 1.16034 9.78196 1.59434 10.1528 2.15083C10.5236 2.70733 10.7209 3.36131 10.72 4.03002C10.7173 4.92518 10.3602 5.78285 9.72676 6.41535C9.09331 7.04786 8.23512 7.4037 7.33996 7.40502ZM7.33996 1.65002C6.86924 1.65002 6.40909 1.78961 6.0177 2.05112C5.62631 2.31264 5.32126 2.68435 5.14113 3.11923C4.96099 3.55412 4.91386 4.03266 5.00569 4.49434C5.09752 4.95601 5.3242 5.38009 5.65704 5.71293C5.98989 6.04578 6.41397 6.27246 6.87564 6.36429C7.33732 6.45612 7.81586 6.40899 8.25075 6.22885C8.68563 6.04872 9.05734 5.74367 9.31886 5.35228C9.58037 4.96089 9.71996 4.50074 9.71996 4.03002C9.71996 3.39881 9.46921 2.79344 9.02287 2.34711C8.57654 1.90077 7.97117 1.65002 7.33996 1.65002Z" fill="#42C6A3"/>
                                                        <path d="M8.21 15.8401C8.10072 15.7308 8.01643 15.5991 7.96291 15.4541C7.9094 15.3091 7.88793 15.1542 7.9 15.0001H2V12.1101C2.70895 11.3537 3.56885 10.7545 4.52405 10.3514C5.47924 9.94829 6.50843 9.75027 7.545 9.77013H7.905C7.88205 9.60249 7.89808 9.43182 7.95185 9.27139C8.00561 9.11095 8.09567 8.96509 8.215 8.84513L8.275 8.79013C8.04 8.79013 7.775 8.76013 7.545 8.76013C6.3252 8.73117 5.11421 8.97363 3.99959 9.46998C2.88496 9.96633 1.89456 10.7042 1.1 11.6301C1.03509 11.7167 1 11.8219 1 11.9301V15.0001C1 15.2653 1.10536 15.5197 1.29289 15.7072C1.48043 15.8948 1.73478 16.0001 2 16.0001H8.35L8.21 15.8401Z" fill="#42C6A3"/>
                                                        <path d="M13.4346 8.14495C13.4593 8.13983 13.4848 8.13983 13.5096 8.14495C13.4848 8.14045 13.4594 8.14045 13.4346 8.14495Z" fill="#42C6A3"/>
                                                        <path d="M16.8401 11.6602L15.8401 11.3552C15.7687 11.1106 15.6714 10.8743 15.5501 10.6502L16.0501 9.72023C16.0664 9.68303 16.0703 9.6416 16.0613 9.60201C16.0523 9.56241 16.0309 9.52675 16.0001 9.50023L15.2751 8.77523C15.2477 8.74555 15.2111 8.72596 15.1712 8.71961C15.1313 8.71326 15.0904 8.72052 15.0551 8.74023L14.1351 9.24023C13.9086 9.11288 13.6688 9.01061 13.4201 8.93523L13.1151 7.93523C13.1022 7.89842 13.0776 7.86682 13.0452 7.84517C13.0127 7.82353 12.9741 7.81302 12.9351 7.81523H11.9101C11.8708 7.81478 11.8323 7.82724 11.8007 7.85072C11.7691 7.87421 11.7461 7.9074 11.7351 7.94523L11.4301 8.94523C11.1797 9.01809 10.9382 9.11872 10.7101 9.24523L9.80013 8.74523C9.76561 8.7259 9.72557 8.71884 9.68652 8.7252C9.64748 8.73156 9.61173 8.75095 9.58513 8.78023L8.84513 9.50023C8.81769 9.52912 8.80003 9.56591 8.79465 9.60539C8.78927 9.64487 8.79643 9.68505 8.81513 9.72023L9.31513 10.6302C9.18288 10.8556 9.07718 11.0955 9.00013 11.3452L8.00013 11.6452C7.9623 11.6562 7.9291 11.6792 7.90562 11.7108C7.88214 11.7424 7.86967 11.7809 7.87013 11.8202V12.8452C7.87308 12.8813 7.88718 12.9157 7.91046 12.9434C7.93375 12.9712 7.96508 12.991 8.00013 13.0002L9.00013 13.3052C9.07403 13.5505 9.17463 13.7869 9.30013 14.0102L8.80013 14.9652C8.78105 14.9994 8.77366 15.039 8.77907 15.0778C8.78449 15.1166 8.80241 15.1525 8.83013 15.1802L9.55513 15.9052C9.58345 15.9335 9.61996 15.9521 9.65946 15.9584C9.69896 15.9646 9.73944 15.9583 9.77513 15.9402L10.7101 15.4402C10.9326 15.5599 11.1673 15.6554 11.4101 15.7252L11.7101 16.7252C11.7224 16.7622 11.7458 16.7946 11.7771 16.8178C11.8084 16.8411 11.8461 16.8541 11.8851 16.8552H12.9101C12.9493 16.8549 12.9874 16.8421 13.0188 16.8187C13.0503 16.7954 13.0735 16.7626 13.0851 16.7252L13.3901 15.7002C13.6297 15.6304 13.8611 15.5348 14.0801 15.4152L15.0251 15.9152C15.0599 15.9337 15.0997 15.9403 15.1385 15.9339C15.1774 15.9276 15.213 15.9088 15.2401 15.8802L16.0001 15.2002C16.0206 15.1709 16.0315 15.136 16.0315 15.1002C16.0315 15.0645 16.0206 15.0296 16.0001 15.0002L15.5001 14.0602C15.6215 13.8397 15.7187 13.6067 15.7901 13.3652L16.7901 13.0602C16.828 13.0493 16.8612 13.0263 16.8846 12.9946C16.9081 12.963 16.9206 12.9246 16.9201 12.8852V11.8352C16.9247 11.8015 16.9196 11.7671 16.9055 11.7361C16.8913 11.7052 16.8687 11.6788 16.8401 11.6602ZM12.4251 14.0002C12.0944 14.0012 11.7708 13.904 11.4955 13.7209C11.2201 13.5377 11.0052 13.277 10.8782 12.9716C10.7512 12.6663 10.7177 12.3301 10.782 12.0057C10.8463 11.6812 11.0054 11.3832 11.2393 11.1494C11.4731 10.9155 11.7711 10.7564 12.0956 10.6921C12.42 10.6278 12.7562 10.6613 13.0615 10.7883C13.3669 10.9153 13.6276 11.1302 13.8108 11.4056C13.9939 11.6809 14.0911 12.0045 14.0901 12.3352C14.0888 12.7764 13.913 13.1991 13.601 13.5111C13.289 13.8231 12.8663 13.9989 12.4251 14.0002Z" fill="#42C6A3"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_273_111">
                                                            <rect width="18" height="18" fill="white"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                            </div>

                                            {/* data count and button add data */}
                                            <h1 className='text-white text-4xl font-semibold tracking-wider'>1180</h1>
                                        </div>
                                    </Link>
                                )
                            }
                        })()}

                        {/* card admin ranting */}
                        <Link href={'./admin_ranting'} className="bg-navy hover:bg-gradient-to-r from-[#16D4FC] to-[#9A4BE9] rounded-md p-0.5">

                            {/* inner bg */}
                            <div className="bg-navy p-5 rounded-md space-y-5">

                                {/* data name */}
                                <div className="flex justify-between items-center">
                                    <h1 className='text-green text-2xl'>Admin Ranting</h1>
                                    <svg width="25" height="25" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_273_111)">
                                            <path d="M7.33996 7.40502C6.67125 7.40502 6.01756 7.20666 5.46161 6.83504C4.90567 6.46342 4.47245 5.93524 4.21677 5.31733C3.96109 4.69943 3.89445 4.01957 4.02527 3.36377C4.1561 2.70798 4.47851 2.10573 4.95171 1.63323C5.42491 1.16073 6.02764 0.839211 6.68362 0.709358C7.33961 0.579505 8.01937 0.647155 8.6369 0.903746C9.25442 1.16034 9.78196 1.59434 10.1528 2.15083C10.5236 2.70733 10.7209 3.36131 10.72 4.03002C10.7173 4.92518 10.3602 5.78285 9.72676 6.41535C9.09331 7.04786 8.23512 7.4037 7.33996 7.40502ZM7.33996 1.65002C6.86924 1.65002 6.40909 1.78961 6.0177 2.05112C5.62631 2.31264 5.32126 2.68435 5.14113 3.11923C4.96099 3.55412 4.91386 4.03266 5.00569 4.49434C5.09752 4.95601 5.3242 5.38009 5.65704 5.71293C5.98989 6.04578 6.41397 6.27246 6.87564 6.36429C7.33732 6.45612 7.81586 6.40899 8.25075 6.22885C8.68563 6.04872 9.05734 5.74367 9.31886 5.35228C9.58037 4.96089 9.71996 4.50074 9.71996 4.03002C9.71996 3.39881 9.46921 2.79344 9.02287 2.34711C8.57654 1.90077 7.97117 1.65002 7.33996 1.65002Z" fill="#42C6A3"/>
                                            <path d="M8.21 15.8401C8.10072 15.7308 8.01643 15.5991 7.96291 15.4541C7.9094 15.3091 7.88793 15.1542 7.9 15.0001H2V12.1101C2.70895 11.3537 3.56885 10.7545 4.52405 10.3514C5.47924 9.94829 6.50843 9.75027 7.545 9.77013H7.905C7.88205 9.60249 7.89808 9.43182 7.95185 9.27139C8.00561 9.11095 8.09567 8.96509 8.215 8.84513L8.275 8.79013C8.04 8.79013 7.775 8.76013 7.545 8.76013C6.3252 8.73117 5.11421 8.97363 3.99959 9.46998C2.88496 9.96633 1.89456 10.7042 1.1 11.6301C1.03509 11.7167 1 11.8219 1 11.9301V15.0001C1 15.2653 1.10536 15.5197 1.29289 15.7072C1.48043 15.8948 1.73478 16.0001 2 16.0001H8.35L8.21 15.8401Z" fill="#42C6A3"/>
                                            <path d="M13.4346 8.14495C13.4593 8.13983 13.4848 8.13983 13.5096 8.14495C13.4848 8.14045 13.4594 8.14045 13.4346 8.14495Z" fill="#42C6A3"/>
                                            <path d="M16.8401 11.6602L15.8401 11.3552C15.7687 11.1106 15.6714 10.8743 15.5501 10.6502L16.0501 9.72023C16.0664 9.68303 16.0703 9.6416 16.0613 9.60201C16.0523 9.56241 16.0309 9.52675 16.0001 9.50023L15.2751 8.77523C15.2477 8.74555 15.2111 8.72596 15.1712 8.71961C15.1313 8.71326 15.0904 8.72052 15.0551 8.74023L14.1351 9.24023C13.9086 9.11288 13.6688 9.01061 13.4201 8.93523L13.1151 7.93523C13.1022 7.89842 13.0776 7.86682 13.0452 7.84517C13.0127 7.82353 12.9741 7.81302 12.9351 7.81523H11.9101C11.8708 7.81478 11.8323 7.82724 11.8007 7.85072C11.7691 7.87421 11.7461 7.9074 11.7351 7.94523L11.4301 8.94523C11.1797 9.01809 10.9382 9.11872 10.7101 9.24523L9.80013 8.74523C9.76561 8.7259 9.72557 8.71884 9.68652 8.7252C9.64748 8.73156 9.61173 8.75095 9.58513 8.78023L8.84513 9.50023C8.81769 9.52912 8.80003 9.56591 8.79465 9.60539C8.78927 9.64487 8.79643 9.68505 8.81513 9.72023L9.31513 10.6302C9.18288 10.8556 9.07718 11.0955 9.00013 11.3452L8.00013 11.6452C7.9623 11.6562 7.9291 11.6792 7.90562 11.7108C7.88214 11.7424 7.86967 11.7809 7.87013 11.8202V12.8452C7.87308 12.8813 7.88718 12.9157 7.91046 12.9434C7.93375 12.9712 7.96508 12.991 8.00013 13.0002L9.00013 13.3052C9.07403 13.5505 9.17463 13.7869 9.30013 14.0102L8.80013 14.9652C8.78105 14.9994 8.77366 15.039 8.77907 15.0778C8.78449 15.1166 8.80241 15.1525 8.83013 15.1802L9.55513 15.9052C9.58345 15.9335 9.61996 15.9521 9.65946 15.9584C9.69896 15.9646 9.73944 15.9583 9.77513 15.9402L10.7101 15.4402C10.9326 15.5599 11.1673 15.6554 11.4101 15.7252L11.7101 16.7252C11.7224 16.7622 11.7458 16.7946 11.7771 16.8178C11.8084 16.8411 11.8461 16.8541 11.8851 16.8552H12.9101C12.9493 16.8549 12.9874 16.8421 13.0188 16.8187C13.0503 16.7954 13.0735 16.7626 13.0851 16.7252L13.3901 15.7002C13.6297 15.6304 13.8611 15.5348 14.0801 15.4152L15.0251 15.9152C15.0599 15.9337 15.0997 15.9403 15.1385 15.9339C15.1774 15.9276 15.213 15.9088 15.2401 15.8802L16.0001 15.2002C16.0206 15.1709 16.0315 15.136 16.0315 15.1002C16.0315 15.0645 16.0206 15.0296 16.0001 15.0002L15.5001 14.0602C15.6215 13.8397 15.7187 13.6067 15.7901 13.3652L16.7901 13.0602C16.828 13.0493 16.8612 13.0263 16.8846 12.9946C16.9081 12.963 16.9206 12.9246 16.9201 12.8852V11.8352C16.9247 11.8015 16.9196 11.7671 16.9055 11.7361C16.8913 11.7052 16.8687 11.6788 16.8401 11.6602ZM12.4251 14.0002C12.0944 14.0012 11.7708 13.904 11.4955 13.7209C11.2201 13.5377 11.0052 13.277 10.8782 12.9716C10.7512 12.6663 10.7177 12.3301 10.782 12.0057C10.8463 11.6812 11.0054 11.3832 11.2393 11.1494C11.4731 10.9155 11.7711 10.7564 12.0956 10.6921C12.42 10.6278 12.7562 10.6613 13.0615 10.7883C13.3669 10.9153 13.6276 11.1302 13.8108 11.4056C13.9939 11.6809 14.0911 12.0045 14.0901 12.3352C14.0888 12.7764 13.913 13.1991 13.601 13.5111C13.289 13.8231 12.8663 13.9989 12.4251 14.0002Z" fill="#42C6A3"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_273_111">
                                                <rect width="18" height="18" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>

                                </div>

                                {/* data count and button add data */}
                                <h1 className='text-white text-4xl font-semibold tracking-wider'>1180</h1>
                            </div>
                        </Link>
                    </div>
                </div>
                {/* akhir konten utama */}

                {/* footer */}
                <Footer />
                {/* akhir footer */}

            </div>
            {/* akhir wrapper konten utama */}
        </div>

    )
}

export default admin