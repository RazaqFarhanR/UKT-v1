import React, { useState } from 'react'
import Link from 'next/link'
import Sidebar from '../components/sidebar'
import Header from '../components/header'
import Footer from '../components/footer'

const rekap_nilai_ukt_jambon = () => {

    // state jenis
    const [active, setActive] = useState ('keshan')

    // function set jenis
    const onActive = (e) => {
        setActive (e)
    }

    return (
        <>
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

                            {/* page name and button back */}
                            <div className="flex justify-center items-center gap-x-3">
                                <Link href={'./ukt_jambon'} className="bg-purple hover:bg-white rounded-md w-9 h-9 flex justify-center items-center group duration-300">
                                    <svg className='-translate-x-0.5 fill-white group-hover:fill-purple' width="13" height="22" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.2258 26.4657L0.354838 14.4974C0.225806 14.3549 0.134623 14.2005 0.08129 14.0343C0.0270964 13.8681 0 13.69 0 13.5C0 13.31 0.0270964 13.1319 0.08129 12.9657C0.134623 12.7995 0.225806 12.6451 0.354838 12.5026L11.2258 0.498681C11.5269 0.166227 11.9032 0 12.3548 0C12.8065 0 13.1935 0.1781 13.5161 0.534301C13.8387 0.890501 14 1.30607 14 1.781C14 2.25594 13.8387 2.6715 13.5161 3.0277L4.03226 13.5L13.5161 23.9723C13.8172 24.3048 13.9677 24.7141 13.9677 25.2005C13.9677 25.6878 13.8065 26.1095 13.4839 26.4657C13.1613 26.8219 12.7849 27 12.3548 27C11.9247 27 11.5484 26.8219 11.2258 26.4657Z"/>
                                    </svg>
                                </Link>
                                <h1 className='text-2xl tracking-wider'>Detail Nilai - UKT Jambon 2023</h1>
                            </div>

                            {/* search */}
                            <div className="bg-purple rounded-md px-5 py-2 flex items-center gap-x-2 w-72">
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.625 16.625C13.491 16.625 16.625 13.491 16.625 9.625C16.625 5.75901 13.491 2.625 9.625 2.625C5.75901 2.625 2.625 5.75901 2.625 9.625C2.625 13.491 5.75901 16.625 9.625 16.625Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M18.3746 18.3751L14.5684 14.5688" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <input className='bg-transparent placeholder:text-white placeholder:tracking-wider placeholder:text-sm w-full focus:outline-none' placeholder='Search' type="text" />
                            </div>
                        </div>

                        {/* wrapper jenis */}
                        <div className="grid grid-cols-6 gap-x-3 mb-7">
                            <button onClick={() => onActive ('keshan')} className={active === 'keshan' ? 'bg-purple py-2 px-4 rounded-md text-white' : 'bg-white hover:bg-purple py-2 px-4 rounded-md text-purple hover:text-white duration-300'}>
                                KESHAN
                            </button>
                            <button onClick={() => onActive ('senam')} className={active === 'senam' ? 'bg-purple py-2 px-4 rounded-md text-white' : 'bg-white hover:bg-purple py-2 px-4 rounded-md text-purple hover:text-white duration-300'}>
                                SENAM
                            </button>
                            <button onClick={() => onActive ('jurus')} className={active === 'jurus' ? 'bg-purple py-2 px-4 rounded-md text-white' : 'bg-white hover:bg-purple py-2 px-4 rounded-md text-purple hover:text-white duration-300'}>
                                JURUS
                            </button>
                            <button onClick={() => onActive ('fisik')} className={active === 'fisik' ? 'bg-purple py-2 px-4 rounded-md text-white' : 'bg-white hover:bg-purple py-2 px-4 rounded-md text-purple hover:text-white duration-300'}>
                                FISIK
                            </button>
                            <button onClick={() => onActive ('teknik')} className={active === 'teknik' ? 'bg-purple py-2 px-4 rounded-md text-white' : 'bg-white hover:bg-purple py-2 px-4 rounded-md text-purple hover:text-white duration-300'}>
                                TEKNIK
                            </button>
                            <button onClick={() => onActive ('sambung')} className={active === 'sambung' ? 'bg-purple py-2 px-4 rounded-md text-white' : 'bg-white hover:bg-purple py-2 px-4 rounded-md text-purple hover:text-white duration-300'}>
                                SAMBUNG
                            </button>
                        </div>

                        {/* wrapper table */}
                        <div className="bg-navy rounded-md py-2 px-3 overflow-x-auto relative">
                            
                            <div className="overflow-x-auto relative">
                                
                                {/* table keshan */}
                                {(() => {
                                    if (active === 'keshan') {
                                        return (
                                            <table className="w-full">
                                                <thead>
                                                    <tr className='text-green'>
                                                        <th scope="col" className="py-3 px-6 min-w-[3rem]">No</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[15rem]">Nama</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">1</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">2</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">3</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">4</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">5</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">6</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">7</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">8</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">9</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">10</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">11</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">12</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">13</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">14</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">15</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">16</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">17</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">18</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">19</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">20</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="text-white text-center">
                                                        <td className='border-b-2 py-3 border-gray'>1</td>
                                                        <td className='border-b-2 py-3 border-gray'>Stevan Dean Achmad</td>
                                                        <td className="py-3 px-6 ">
                                                            <div className="">
                                                                <h1>Soal 2</h1>
                                                                <div className="bg-purple text-white rounded-md px-2 py-1">
                                                                    Ini adalah jawaban semisal jawaban yang dipilih adalah jawaban a
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        )
                                    } else if (active === 'senam') {
                                        return (
                                            <table className="w-full">
                                                <thead>
                                                    <tr className='text-green'>
                                                        <th scope="col" className="py-3 px-6 min-w-[3rem]">No</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[15rem]">Nama</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[15rem]">Penguji</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">1</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">2</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">3</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">4</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">5</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">6</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">7</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">8</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">9</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">10</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">11</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">12</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">13</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">14</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">15</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">16</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">17</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">18</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">19</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">20</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="text-white text-center">
                                                        <td className='border-b-2 py-3 border-gray'>1</td>
                                                        <td className='border-b-2 py-3 border-gray'>Stevan Dean Achmad</td>
                                                        <td className="py-3 px-6 ">
                                                            <div className="">
                                                                <h1>Soal 2</h1>
                                                                <div className="bg-purple text-white rounded-md px-2 py-1">
                                                                    Ini adalah jawaban semisal jawaban yang dipilih adalah jawaban a
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        )
                                    } else if (active === 'jurus') {
                                        return (
                                            <table className="w-full">
                                                <thead>
                                                    <tr className='text-green'>
                                                        <th scope="col" className="py-3 px-6 min-w-[3rem]">No</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[15rem]">Nama</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[15rem]">Penguji</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">1</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">2</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">3</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">4</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">5</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">6</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">7</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">8</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">9</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">10</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">11</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">12</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">13</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">14</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">15</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">16</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">17</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">18</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">19</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">20</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="text-white text-center">
                                                        <td className='border-b-2 py-3 border-gray'>1</td>
                                                        <td className='border-b-2 py-3 border-gray'>Stevan Dean Achmad</td>
                                                        <td className="py-3 px-6 ">
                                                            <div className="bg-purple text-white rounded-md px-2 py-1">
                                                                Ini adalah jawaban semisal jawaban yang dipilih adalah jawaban a
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        )
                                    } else if (active === 'fisik') {
                                        return (
                                            <table className="w-full">
                                                <thead>
                                                    <tr className='text-green'>
                                                        <th scope="col" className="py-3 px-6 min-w-[3rem]">No</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[15rem]">Nama</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[15rem]">Penguji</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">MFT</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">Push Up</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">Spir Perut Atas</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">Spri Perut Bawah</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">Spir Dada</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">Plank</th>
                                                        {/* <th scope="col" className="py-3 px-6 min-w-[6rem]">7</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="text-white text-center">
                                                        <td className='border-b-2 py-3 border-gray'>1</td>
                                                        <td className='border-b-2 py-3 border-gray'>Stevan Dean Achmad</td>
                                                        <td className="py-3 px-6 ">
                                                            <div className="bg-purple text-white rounded-md px-2 py-1">
                                                                9,7
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        )
                                    } else if (active === 'teknik') {
                                        return (
                                            <table className="w-full">
                                                <thead>
                                                    <tr className='text-green'>
                                                        <th scope="col" className="py-3 px-6 min-w-[3rem]">No</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[15rem]">Nama</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[15rem]">Penguji</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">Teknik</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">Teknik</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">Teknik</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">Teknik</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">Teknik</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[6rem]">Teknik</th>
                                                        {/* <th scope="col" className="py-3 px-6 min-w-[6rem]">7</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="text-white text-center">
                                                        <td className='border-b-2 py-3 border-gray'>1</td>
                                                        <td className='border-b-2 py-3 border-gray'>Stevan Dean Achmad</td>
                                                        <td className="py-3 px-6 ">
                                                            <div className="bg-purple text-white rounded-md px-2 py-1">
                                                                9,7
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        )
                                    } else if (active === 'sambung') {
                                        return (
                                            <table className="w-full">
                                                <thead>
                                                    <tr className='text-green'>
                                                        <th scope="col" className="py-3 px-6 min-w-[3rem]">No</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[15rem]">Penguji</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[20rem]">Siswa 1</th>
                                                        <th scope="col" className="py-3 px-6 min-w-[20rem]">Siswa 2</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="text-white text-center">
                                                        <td className='border-b-2 py-3 border-gray'>1</td>
                                                        <td className='border-b-2 py-3 border-gray'>Stevan Dean Achmad</td>
                                                        <td className="py-3 px-6 ">
                                                            <div className="bg-purple p-0.5 rounded-md flex items-center w-full">
                                                                <div className="bg-navy rounded-l-md py-1 px-2 w-full">
                                                                    <h1>Stevan Dean Achmad Ngunardi</h1>
                                                                </div>
                                                                <div className="bg-purple text-white rounded-r-md px-2 py-1">
                                                                    9,7
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        )
                                    }
                                })()}
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

export default rekap_nilai_ukt_jambon