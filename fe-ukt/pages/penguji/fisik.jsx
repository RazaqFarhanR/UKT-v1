import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/header'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const fisik = () => {

    // state
    const [dataSiswa, setDataSiswa] = useState ([])
    const [dataStandartFisik, setDataStandartFisik] = useState([])
    const [mft, setMft] = useState(0);
    const [pushUp, setPushUp] = useState(0);
    const [spirPA, setSpirPA] = useState(0);
    const [spirPB, setSpirPB] = useState(0);
    const [spirDada, setSpirDada] = useState(0);
    const [plank, setPlank] = useState(0)

    // function get data siswa from local storage
    const getDataSiswa = () => {
        const dataSiswa = JSON.parse (localStorage.getItem ('dataSiswa'))
        setDataSiswa (dataSiswa)
    }

    // function get data standart fisik
    const getDataStandartFisik = () => {
        const token = localStorage.getItem ('tokenPenguji')
        const dataSiswa1 = JSON.parse (localStorage.getItem('dataSiswa'));
        const tipe_ukt = dataSiswa1.tipe_ukt;
        console.log(dataSiswa1);
        const peserta = dataSiswa1.peserta;
        axios.post (BASE_URL + `standar_fisik/peserta`, {
            tipe_ukt: tipe_ukt,
            peserta: peserta
        },{ headers: { Authorization: `Bearer ${token}`}})
        .then (res => {
            setDataStandartFisik (res.data);
            setMft (res.data.mft);
            setPushUp (res.data.push_up);
            setSpirPA (res.data.spir_perut_atas);
            setSpirPB (res.data.spir_perut_bawah);
            setSpirDada (res.data.spir_dada);
            setPlank (res.data.plank);
        })
        .catch (err => {
            console.log(err.message);
        })
    }
    const postDataFisik = () => {
        const token = localStorage.getItem('tokenPenguji')
        console.log(token);
        console.log(dataStandartFisik);
        const mftNew = ((mft / dataStandartFisik.mft) * 100)
        const pushUpNew = (pushUp / dataStandartFisik.push_up) * 100
        const spirPANew = (spirPA / dataStandartFisik.spir_perut_atas) * 100
        const spirPBNew = (spirPB / dataStandartFisik.spir_perut_bawah) * 100
        const spirDadaNew = ((spirDada / dataStandartFisik.spir_dada) * 100)
        const plankNew = ((plank / dataStandartFisik.plank) * 100)
        const data = {
            id_event: dataSiswa.id_event,
            id_siswa: dataSiswa.id_siswa,
            mft: mftNew,
            push_up: pushUpNew,
            spir_perut_atas: spirPANew,
            spir_perut_bawah: spirPBNew,
            spir_dada: spirDadaNew,
            plank: plankNew
        }
          axios.post(BASE_URL + `fisik`, data, { headers: { Authorization: `Bearer ${token}` } },)
          .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error.message);
            });
    }
    useEffect (() => {
        getDataSiswa ()
        getDataStandartFisik ()
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

                        {/* wrapper mft */}
                        <div className="bg-navy rounded-md p-2 text-center text-white space-y-3 mb-3">
                            <h1 className='text-xl font-semibold tracking-wider'>MFT</h1>

                            {/* fisik list */}
                            <div className="grid grid-cols-3 gap-x-3 items-center">

                                {/* button minus */}
                                <button className='bg-red rounded-md text-center text-2xl font-bold'
                                    onClick={() => setMft(mft - 1)}>
                                </button>
                                {/* score indicator */}
                                <div className="outline outline-purple rounded-md h-full flex items-center justify-center">
                                    <h1 className='text-xl font-semibold'>{mft}</h1>
                                </div>

                                {/* button plus */}
                                <button className='bg-purple rounded-md text-center text-2xl font-bold'
                                onClick={() => setMft(mft + 1)}>
                                    +
                                </button>
                            </div>
                        </div>
                        
                        {/* wrapper push_up */}
                        <div className="bg-navy rounded-md p-2 text-center text-white space-y-3 mb-3">
                            <h1 className='text-xl font-semibold tracking-wider'>Push Up</h1>

                            {/* fisik list */}
                            <div className="grid grid-cols-3 gap-x-3 items-center">

                                {/* button minus */}
                                <button className='bg-red rounded-md text-center text-2xl font-bold'
                                    onClick={() => setPushUp(pushUp - 1)}>
                                    -
                                </button>

                                {/* score indicator */}
                                <div className="outline outline-purple rounded-md h-full flex items-center justify-center">
                                    <h1 className='text-xl font-semibold'>{pushUp}</h1>
                                </div>

                                {/* button plus */}
                                <button className='bg-purple rounded-md text-center text-2xl font-bold'
                                onClick={() => setPushUp(pushUp + 1)}>

                                    +
                                </button>
                            </div>
                        </div>
                        
                        {/* wrapper spir_perut_atas */}
                        <div className="bg-navy rounded-md p-2 text-center text-white space-y-3 mb-3">
                            <h1 className='text-xl font-semibold tracking-wider'>Spir Perut Atas</h1>

                            {/* fisik list */}
                            <div className="grid grid-cols-3 gap-x-3 items-center">

                                {/* button minus */}
                                <button className='bg-red rounded-md text-center text-2xl font-bold'
                                    onClick={() => setSpirPA(spirPA - 1)}
                                >
                                    -
                                </button>

                                {/* score indicator */}
                                <div className="outline outline-purple rounded-md h-full flex items-center justify-center">
                                    <h1 className='text-xl font-semibold'>{spirPA}</h1>
                                </div>

                                {/* button plus */}
                                <button className='bg-purple rounded-md text-center text-2xl font-bold'
                                onClick={() => setSpirPA(spirPA + 1)}>
                                    +
                                </button>
                            </div>
                        </div>
                        
                        {/* wrapper spir_perut_bawah */}
                        <div className="bg-navy rounded-md p-2 text-center text-white space-y-3 mb-3">
                            <h1 className='text-xl font-semibold tracking-wider'>Spir Perut Bawah</h1>

                            {/* fisik list */}
                            <div className="grid grid-cols-3 gap-x-3 items-center">

                                {/* button minus */}
                                <button className='bg-red rounded-md text-center text-2xl font-bold'
                                    onClick={() => setSpirPB(spirPB - 1)}
                                >
                                    -
                                </button>

                                {/* score indicator */}
                                <div className="outline outline-purple rounded-md h-full flex items-center justify-center">
                                    <h1 className='text-xl font-semibold'>{spirPB}</h1>
                                </div>

                                {/* button plus */}
                                <button className='bg-purple rounded-md text-center text-2xl font-bold'
                                onClick={() => setSpirPB(spirPB + 1)}>
                                    +
                                </button>
                            </div>
                        </div>
                        
                        {/* wrapper spir_dada */}
                        <div className="bg-navy rounded-md p-2 text-center text-white space-y-3 mb-3">
                            <h1 className='text-xl font-semibold tracking-wider'>Spir Dada</h1>

                            {/* fisik list */}
                            <div className="grid grid-cols-3 gap-x-3 items-center">

                                {/* button minus */}
                                <button className='bg-red rounded-md text-center text-2xl font-bold'
                                    onClick={() => setSpirDada(spirDada - 1)}
                                >
                                    -
                                </button>

                                {/* score indicator */}
                                <div className="outline outline-purple rounded-md h-full flex items-center justify-center">
                                    <h1 className='text-xl font-semibold'>{spirDada}</h1>
                                </div>

                                {/* button plus */}
                                <button className='bg-purple rounded-md text-center text-2xl font-bold'
                                onClick={() => setSpirDada(spirDada + 1)}>
                                    +
                                </button>
                            </div>
                        </div>
                        
                        {/* wrapper plank */}
                        <div className="bg-navy rounded-md p-2 text-center text-white space-y-3 mb-3">
                            <h1 className='text-xl font-semibold tracking-wider'>Plank</h1>

                            {/* fisik list */}
                            <div className="grid grid-cols-3 gap-x-3 items-center">

                                {/* button minus */}
                                <button className='bg-red rounded-md text-center text-2xl font-bold'
                                    onClick={() => setPlank(plank - 1)}
                                >
                                    -
                                </button>

                                {/* score indicator */}
                                <div className="outline outline-purple rounded-md h-full flex items-center justify-center">
                                    <h1 className='text-xl font-semibold'>{plank}</h1>
                                </div>

                                {/* button plus */}
                                <button className='bg-purple rounded-md text-center text-2xl font-bold'
                                onClick={() => setPlank(plank + 1)}>
                                    +
                                </button>
                            </div>
                        </div>
                        
                        <div className='bg-yellow hover:bg-white rounded-md p-3 text-center text-xl text-white hover:text-yellow font-semibold shadow shadow-slate-700 duration-300' onClick={() => postDataFisik()}>Selesai</div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default fisik