import React, { useContext } from 'react'
import { globalState } from '@/context/context'

const modal_ukt_fisik = () => {

    // state modal
    const {showModalUktFisik, setShowModalUktFisik} = useContext (globalState)

    return (
        <>
        {showModalUktFisik ? (
            <>
                {/* Main modal */}
                <div className="fixed flex justify-center top-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0">
                    <div className="relative w-full h-full max-w-2xl md:h-auto">
                        
                        {/* Modal content */}
                        <div className="relative bg-navy text-white rounded-lg shadow">
                            
                            {/* Modal header */}
                            <div className="flex justify-center p-4">
                                <h1 className="text-2xl font-semibold text-gray-900 text-center">
                                    Edit Data Fisik
                                </h1>
                                <button onClick={() => setShowModalUktFisik(false)} type="button" className="p-1.5 inline-flex items-center absolute right-5">
                                    <svg className="w-7 h-7 fill-white hover:fill-purple duration-300" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd">
                                        </path>
                                    </svg>  
                                </button>
                            </div>

                            {/* Modal body */}
                            <div className="px-6 py-2 space-y-3">

                                {/* input remaja laki laki */}
                                <div className="flex flex-row space-x-3 w-full">
                                    <div className="w-2/6 flex justify-between">
                                        <span>Remaja - Laki Laki</span>
                                        <span>:</span>
                                    </div>
                                    <div className="w-4/6">
                                        <input className='w-full bg-darkBlue rounded-md focus:outline-none px-2'
                                        type="number"
                                        // value={nama}
                                        // onChange={(e) => setNama(e.target.value)}
                                        required
                                        >        
                                        </input>
                                    </div>
                                </div>

                                {/* input remaja perempuan */}
                                <div className="flex flex-row space-x-3 w-full">
                                    <div className="w-2/6 flex justify-between">
                                        <span>Remaja - Perempuan</span>
                                        <span>:</span>
                                    </div>
                                    <div className="w-4/6">
                                        <input className='w-full bg-darkBlue rounded-md focus:outline-none px-2'
                                        type="number"
                                        // value={nama}
                                        // onChange={(e) => setNama(e.target.value)}
                                        required
                                        >        
                                        </input>
                                    </div>
                                </div>

                                {/* input private laki laki */}
                                <div className="flex flex-row space-x-3 w-full">
                                    <div className="w-2/6 flex justify-between">
                                        <span>Private - Laki Laki</span>
                                        <span>:</span>
                                    </div>
                                    <div className="w-4/6">
                                        <input className='w-full bg-darkBlue rounded-md focus:outline-none px-2'
                                        type="number"
                                        // value={nama}
                                        // onChange={(e) => setNama(e.target.value)}
                                        required
                                        >        
                                        </input>
                                    </div>
                                </div>

                                {/* input private perempuan */}
                                <div className="flex flex-row space-x-3 w-full">
                                    <div className="w-2/6 flex justify-between">
                                        <span>Private - Perempuan</span>
                                        <span>:</span>
                                    </div>
                                    <div className="w-4/6">
                                        <input className='w-full bg-darkBlue rounded-md focus:outline-none px-2'
                                        type="number"
                                        // value={nama}
                                        // onChange={(e) => setNama(e.target.value)}
                                        required
                                        >        
                                        </input>
                                    </div>
                                </div>

                            </div>

                            {/* Modal footer */}
                            <div className="flex items-center justify-end p-6 space-x-2">
                                <button onClick={() => setShowModalUktFisik(false)} className="text-red hover:text-white bg-white hover:bg-red duration-300 font-medium rounded-lg px-5 py-2.5 text-center">Cancel</button>
                                <button className="text-green hover:text-white bg-white hover:bg-green duration-300 rounded-lg font-medium px-5 py-2.5 focus:z-10">Selesai</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-black opacity-70 fixed inset-0 z-40"></div>
            </>

        ): null}
        </>
    )
}

export default modal_ukt_fisik