import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const jurus = (props) => {
    const [dataJurus, setDataJurus] = useState([])
    console.log(props.data.tipe_ukt);
    const getDataJurus = () => {
        const token = localStorage.getItem('token')
        const event = JSON.parse(localStorage.getItem('event'))

        axios.get(BASE_URL + `jurus_detail/ukt/${props.data.tipe_ukt}/${event.id_event}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setDataJurus(res.data.data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    function ThComponent({ items }) {
        return items.map((item, index) => (
            <th key={index + 1}>{item.jurus.name}</th>
        ));
    }

    function TdComponent({ items }) {
        return items.map((item, index) => (
            <td key={index + 1} className='px-3 border-b-2 border-gray'>
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
        getDataJurus()
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
                                {dataJurus?.slice(0, 1).map((item, index) => (
                                    <ThComponent items={(item.siswa_jurus_detail)} key={index + 1} />
                                ))}
                            </tr>

                        </thead>
                        <tbody>
                            {dataJurus?.map((item, index) => (
                                <>
                                    <tr className='text-green text-center' key={item.id_jurus_detail}>
                                        <td className='border-b-2 text-white py-3 border-gray'>{index + 1}</td>
                                        <td className='border-b-2 text-white border-gray '>{item.jurus_siswa.name}</td>
                                        <TdComponent items={(item.siswa_jurus_detail)} key={index + 1} />
                                    </tr>
                                </>
                            ))}

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default jurus