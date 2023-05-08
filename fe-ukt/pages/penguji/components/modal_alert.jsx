import { globalState } from '@/context/context'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Modal_Alert = (props) => {

    //  state Modal  // 

    const { showModalAlert, setShowModalAlert } = useContext(globalState);

    // function go to page sambung
    const goToNilai = (item) => {
        props.onData(item)
    }

    return (
        <>
            {showModalAlert ? (
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
                                            Apakah Anda Yakin Untuk Menyelesaikan Ujian?
                                        </h1>
                                    </div>
                                </div>

                                {/* Modal body */}
                                <div className="px-6 py-2 space-y-3">
                                            <button className='w-1/2 px-4' onClick={() => setShowModalAlert(false)} key='batal'>
                                                <div className="bg-red rounded-md p-3 text-white mb-3 shadow shadow-slate-700 hover:shadow-purple hover:scale-105 transition ease-in-out duration-300">
                                                    <h1 className='text-xl font-semibold'>Batal</h1>
                                                </div>
                                            </button>
                                            <button className='w-1/2 px-4' onClick={() => goToNilai({ data: true})} key='simpan'>
                                                <div className="bg-purple rounded-md p-3 text-white mb-3 shadow shadow-slate-700 hover:shadow-purple hover:scale-105 transition ease-in-out duration-300">
                                                    <h1 className='text-xl font-semibold'>Simpan</h1>
                                                </div>
                                            </button>

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

export default Modal_Alert