import React, { useEffect, useState } from 'react'
import Header from './components/header'

const senam = () => {

    // state
    const [dataSiswa, setDataSiswa] = useState ([])
    const [dataArray, setDataArray] = useState ([])
    const [jumlahSenam, setJumlahSenam] = useState (1)
    const [limitSenam, setLimitSenam] = useState (1)

    const randomSenam = () => {
        if (dataSiswa.tipe_ukt === 'UKT Jambon') {
            setJumlahSenam (30)
            setLimitSenam (15)
        } else if (dataSiswa.tipe_ukt === 'UKT Hijau') {
            setJumlahSenam (60)
            setLimitSenam (30)
        } else if (dataSiswa.tipe_ukt === 'UKT Putih') {
            setJumlahSenam (70)
            setLimitSenam (35)
        } else if (dataSiswa.tipe_ukt === 'UKCW') {
            setJumlahSenam (90)
            setLimitSenam (45)
        } else {
            console.log('gagal set data senam');
        }

        console.log(jumlahSenam);
        console.log(limitSenam);
    
        for (let s = 1; s <= 5; s++) {
            let randomSenam = Math.floor (Math.random() * 10);
            if (!dataArray.includes(randomSenam) && (randomSenam != 0)) {
                dataArray.push(randomSenam)
            }
        }
        console.log(dataArray);
    }


    const getDataSiswa = () => {
        const dataSiswa = JSON.parse (localStorage.getItem ('dataSiswa'))
        setDataSiswa (dataSiswa)
    }

    // const dataSenamLoop = (dataSenam) => {
    //     if (dataSenam <= dataSenam) {
    //         return (

    //         )
    //     }
    // }

    // console.log(dataSiswa.tipe_ukt);
    // console.log(dataSenam);

    // if (dataSenam <= senam) {
    //     setDataArray ([... dataArray, {senam : senam}])
    //     if (dataSenam <= senam) {
    //         setDataSenam (dataSenam + 1)
    //     } else {
    //         console.log('else');
    //     }
    // }

    useEffect (() => {
        getDataSiswa ()
        randomSenam ()
    }, [])

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
                            <h1 className='text-green tracking-wide text-lg'>{dataSiswa.nis}</h1>
                            <h1 className='text-xl font-semibold'>{dataSiswa.name}</h1>
                            <h1 className='tracking-wide'>{dataSiswa.rayon}</h1>
                        </div>

                        {/* senam list */}
                        <div className="space-y-3">
                            {dataArray.map((item, index) => (
                                <div key={index + 1} className="grid grid-cols-2 items-center">
                                    <h1 className='text-white text-xl font-semibold'>Senam</h1>
                                    <div className="flex gap-x-2">
                                        <button className='bg-white text-purple py-1.5 rounded-md w-full'>Benar</button>
                                        <button className='bg-white text-purple py-1.5 rounded-md w-full'>Salah</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default senam