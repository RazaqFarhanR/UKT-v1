import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const senam = (props) => {
    const [dataSenam, setDataSenam] = useState([])
    console.log(props.data?.tipe_ukt);
    const getDataSenam = () => {
        const event = JSON.parse(localStorage.getItem('event'))
        const token = localStorage.getItem('token')

        console.log(event);
        axios.get(BASE_URL + `senam_detail/ukt/${props.data?.tipe_ukt}/${event.id_event}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setDataSenam(res.data.data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    function ThComponent({ items }) {
        let limit = items.length + 1
        let banding = 1;
        banding < limit;
        return items.map((item) => (
            <th key={banding}>{banding++}</th>
        ));
    }

    function TdComponent({ items }) {
        return items.map((item, index) => (
            <td key={index + 1} className='px-3 border-b-2 border-gray'>{item.siswa_senam.name}
                {item.predikat === true && (
                    <div className="font-semibold bg-purple rounded-md text-white py-1.5 px-12">
                        benar
                    </div>
                )}
                {item.predikat === false && (
                    <div className="font-semibold bg-red rounded-md text-white py-1.5 px-12">
                        salah
                    </div>
                )}
                {item.predikat === null && (
                    <div className="font-semibold bg-navy border-4 border-purple rounded-md text-white py-1.5 px-12">
                        kosong
                    </div>
                )}
            </td>
        ));
    }
    useEffect(() => {
        getDataSenam()
    }, [])

    return (
        <div className="min-h-full bg-darkBlue p-6">
            <div className="bg-navy rounded-md py-2 px-3">

                {/* table */}
                <div className='overflow-x-scroll'>
                    <table className='w-max'>
                        <thead>
                            <tr className='text-white'>
                                <th className='py-3 w-5 px-5'>No</th>
                                <th className='w-30 px-20'>Nama</th>
                                <th className='w-30 px-20'>Penguji</th>
                                {dataSenam?.slice(0, 1).map((item, index) => (
                                    <ThComponent items={item.siswa_senam_detail} key={index + 1} />
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dataSenam?.map((item, index) => (
                                <tr className='text-green text-center' key={item.id_senam_detail}>
                                    <td className='border-b-2 text-white py-3 border-gray w-1/12'>{index + 1}</td>
                                    <td className='border-b-2 text-white border-gray w-5/12'>{item.senam_siswa.name}</td>
                                    <td className='border-b-2 text-white border-gray w-5/12'>{item.penguji_senam.name}</td>
                                    <TdComponent items={item.siswa_senam_detail} key={index + 1} />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default senam