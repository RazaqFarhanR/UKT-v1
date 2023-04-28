import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Header from './components/header'

const teknik = () => {

    const [dataSiswa, setDataSiswa] = useState([])
    const [dataTeknik, setDataTeknik] = useState([]);
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const [selectedButton, SetSelectedButton] = useState([]);

    function handleButtonClick(id_teknik, selectedOption) {
        const updatedOptions = [...selectedButton];
        const index = updatedOptions.findIndex(
            (option) => option.id_teknik === id_teknik
        );
        if (index === -1) {
            updatedOptions.push({ id_teknik, selectedOption });
        } else {
            updatedOptions[index].selectedOption = selectedOption;
        }
        SetSelectedButton(updatedOptions);
    }

    const getDataSiswa = () => {
        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa'))
        setDataSiswa(dataSiswa)
    }

    // function get data event
    const getDataEvent = () => {
        const token = localStorage.getItem('tokenPenguji')

        const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa'));
        axios.get(BASE_URL + `teknik/ukt/${dataSiswa.tipe_ukt}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                console.log(res.data.data);
                setDataTeknik(res.data.data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    // function post data teknik
    const postDataTeknik = () => {
        // -- data detail -- //
        const uktSiswa = JSON.parse(localStorage.getItem('dataUktSiswa'))
        const token = localStorage.getItem('tokenPenguji')
        const dataPenguji = JSON.parse(localStorage.getItem('penguji'))
        const dataDetail = {
            id_penguji: dataPenguji.id_penguji,
            id_siswa: dataSiswa.id_siswa,
            id_event: dataSiswa.id_event,
            tipe_ukt: dataSiswa.tipe_ukt
        }
        

        axios.post(BASE_URL + `teknik_detail`, dataDetail, { headers: { Authorization: `Bearer ${token}` } })
            .then(async res => {
                console.log(res.data.data)

                const id_teknik_detail = res.data.data.id_teknik_detail;
                const data = selectedButton.map((option) => {
                    return {
                        id_teknik: option.id_teknik,
                        predikat: option.selectedOption,
                    };
                });

                let baik = []
                let cukup = []
                let kurang = []
                for (let i = 0; i < data.length; i++) {
                    // -- push nilai -- //
                    if (data[i].predikat == 'BAIK') {
                        baik.push('1');
                    } else if (data[i].predikat == 'CUKUP') {
                        cukup.push('1');
                    } else if (data[i].predikat == 'KURANG') {
                        kurang.push('1');
                    }
                    
                    axios.post(BASE_URL + `teknik_siswa`, {
                        id_teknik_detail: id_teknik_detail,
                        id_teknik: data[i].id_teknik,
                        predikat: data[i].predikat
                    }, { headers: { Authorization: `Bearer ${token}` } },)
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }
                // -- redefine nilai -- //
                const newBaik = baik.length * 3;
                const newCukup = cukup.length * 2;
                const newKurang = kurang.length;
                // -- ukt siswa  -- //
                const nilaiUkt = newBaik + newCukup + newKurang;
                await axios.put(BASE_URL + `ukt_siswa/${uktSiswa.id_ukt_siswa}`, {
                    teknik: nilaiUkt
                }, { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            })
    }

    useEffect(() => {
        getDataSiswa();
        getDataEvent();
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
                            <h1 className='text-green tracking-wide text-lg'>0800113784</h1>
                            <h1 className='text-xl font-semibold'>Nadia  Azza Destination Wkwk</h1>
                            <h1 className='tracking-wide'>Trenggalek</h1>
                        </div>

                        {/* wrapper fisik list */}
                        {dataTeknik.map((item, index) => (
                            <div className="bg-navy rounded-md p-2 text-center text-white space-y-3 mb-3" key={item.id_teknik}>
                                <h1 className='text-xl font-semibold tracking-wider'>{item.name}</h1>

                                {/* fisik list */}
                                <div className="grid grid-cols-3 gap-x-3 items-center">

                                    {/* button kurang */}
                                    <button className={selectedButton.find(
                                        (option) =>
                                            option.id_teknik == item.id_teknik &&
                                            option.selectedOption == "KURANG"
                                    ) ? "font-semibold bg-purple rounded-md text-white py-1.5" : "font-semibold bg-navy border-2 border-purple rounded-md text-purple py-1.5"}
                                        onClick={() => handleButtonClick(item.id_teknik, 'KURANG')}>Kurang</button>

                                    {/* button cukup */}
                                    <button className={selectedButton.find(
                                        (option) =>
                                            option.id_teknik == item.id_teknik &&
                                            option.selectedOption == "CUKUP"
                                    ) ? "font-semibold bg-purple rounded-md text-white py-1.5" : "font-semibold bg-navy border-2 border-purple rounded-md text-purple py-1.5"}
                                        onClick={() => handleButtonClick(item.id_teknik, 'CUKUP')}>Cukup</button>

                                    {/* button baik */}
                                    <button className={selectedButton.find(
                                        (option) =>
                                            option.id_teknik == item.id_teknik &&
                                            option.selectedOption == "BAIK"
                                    ) ? "font-semibold bg-purple rounded-md text-white py-1.5" : "font-semibold bg-navy border-2 border-purple rounded-md text-purple py-1.5"}
                                        onClick={() => handleButtonClick(item.id_teknik, 'BAIK')}>Baik</button>
                                </div>
                            </div>
                        ))}


                        <div className='bg-yellow rounded-md p-3 text-white mb-8 shadow shadow-slate-700'
                            onClick={postDataTeknik}>Selesai</div>

                        <div className='bg-yellow hover:bg-white rounded-md p-3 text-center text-xl text-white hover:text-yellow font-semibold shadow shadow-slate-700 duration-300' onClick={() => postDataTeknik()}>Selesai</div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default teknik