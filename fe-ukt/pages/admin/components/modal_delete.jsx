import { globalState } from '@/context/context'
import React, { useContext } from 'react'

const modal_delete = () => {
    
    // state modal
    const {showModalDelete, setShowModalDelete} = useContext (globalState)

    return (
        <>
        {showModalDelete ? (
            <>
                {/* Main modal */}
                <div className="fixed flex justify-center top-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0">
                    <div className="relative w-full h-full max-w-2xl md:h-auto">
                        
                        {/* Modal content */}
                        <div className="relative bg-navy text-white rounded-lg shadow">
                            
                            {/* Modal header */}
                            <div className="flex justify-center px-4 pt-7 pb-4">
                                {/* <svg className='stroke-red' width="90" height="90" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.1543 5.76929L5.64468 29.6154C5.71547 30.9933 6.71776 32.0001 8.0293 32.0001H21.7408C23.0576 32.0001 24.0412 30.9933 24.1255 29.6154L25.6158 5.76929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M1.76953 5.76929H28.0003H1.76953Z" fill="black"/>
                                    <path d="M1.76953 5.76929H28.0003" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M10.1157 5.76924V2.78847C10.115 2.55341 10.1608 2.32054 10.2504 2.10324C10.3401 1.88594 10.4718 1.68851 10.638 1.5223C10.8042 1.35609 11.0016 1.22438 11.2189 1.13474C11.4362 1.04511 11.6691 0.999319 11.9041 1.00001H17.8657C18.1007 0.999319 18.3336 1.04511 18.5509 1.13474C18.7682 1.22438 18.9656 1.35609 19.1319 1.5223C19.2981 1.68851 19.4298 1.88594 19.5194 2.10324C19.609 2.32054 19.6548 2.55341 19.6541 2.78847V5.76924M14.8849 10.5385V27.2308M9.51953 10.5385L10.1157 27.2308M20.2503 10.5385L19.6541 27.2308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg> */}

                                <h1 className="text-4xl font-bold text-center">
                                    Are you sure?
                                </h1>

                                <button onClick={() => setShowModalDelete(false)} type="button" className="p-1.5 inline-flex items-center absolute right-5">
                                    <svg className="w-7 h-7 fill-white hover:fill-purple duration-300" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd">
                                        </path>
                                    </svg>  
                                </button>
                            </div>

                            {/* Modal body */}
                            <div className="px-6 py-2 space-y-3">
                                <h1 className='text-xl font-medium text-gray text-center'>Are you sure want to delete this data?</h1>
                            </div>

                            {/* Modal footer */}
                            <div className="flex items-center justify-end p-6 space-x-2">
                                <button onClick={() => setShowModalDelete(false)} className="text-white hover:text-red bg-red hover:bg-white duration-300 font-medium rounded-lg px-5 py-2.5 text-center">Cancel</button>
                                <button className="text-white hover:text-green bg-green hover:bg-white duration-300 rounded-lg font-medium px-5 py-2.5 focus:z-10">Yes</button>
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

export default modal_delete