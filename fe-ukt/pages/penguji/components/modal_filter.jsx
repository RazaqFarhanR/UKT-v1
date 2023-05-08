import { globalState } from '@/context/context'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Modal_Filter = (props) => {

    //  state Modal  // 

    const { modalFilter, setModalFilter } = useContext(globalState);
    const [dataRanting, setDataRanting] = useState([])

    // function get data siswa
    const getDataRanting = () => {
        const dataEvent = JSON.parse(localStorage.getItem('event'))
        const token = localStorage.getItem('tokenPenguji')
        let IdEvent = (dataEvent.id_event)
        console.log("id_event  :" + IdEvent)
        axios.get(BASE_URL + `ranting`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                setDataRanting(res.data.data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    // function go to page sambung
    const goToNilai = (item) => {
        props.onData(item)
        setModalFilter(false)
    }

    useEffect(() => {
        getDataRanting()
    }, [])

    return (
        <>
            {modalFilter ? (
                <>
                    {/* Main modal */}
                    <div className="fixed flex justify-center top-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0">
                        <div className="relative w-full h-full max-w-2xl md:h-auto">

                            {/* Modal content */}
                            <div className="relative bg-navy text-white rounded-lg shadow">

                                {/* Modal header */}
                                <div className="flex justify-center p-4">
                                    <div className="bg-navy rounded-md p-3 text-white mb-3 shadow shadow-slate-700 hover:shadow-purple hover:scale-105 transition ease-in-out duration-300">
                                        <h1 className='text-xl font-semibold'>
                                            Filter
                                        </h1>
                                    </div>
                                </div>

                                {/* Modal body */}
                                <div className="px-6 py-2 space-y-3">
                                        {dataRanting.map((item, index) => (
                                            <button className='w-1/2 px-4' onClick={() => goToNilai(item)} key={index + 1}>
                                                <div className="bg-navy rounded-md p-3 text-white mb-3 shadow shadow-slate-700 border-purple border-2 hover:shadow-purple hover:scale-105 transition ease-in-out duration-300">
                                                    <h1 className='text-xl font-semibold'>{item.id_ranting}</h1>
                                                </div>
                                            </button>
                                        ))}

                                </div>

                                {/* Modal footer */}
                                <div className="flex items-center justify-end p-6 space-x-2">
                                    <button onClick={() => setModalFilter(false)} className="text-red hover:text-white bg-white hover:bg-red duration-300 font-medium rounded-lg px-5 py-2.5 text-center">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black opacity-70 fixed inset-0 z-40"></div>
                </>

            ) : null}
        </>
    )
}

export default Modal_Filter