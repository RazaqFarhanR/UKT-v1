import React, { useState } from 'react'

const loginPage = () => {

    const [username, setUsername] = useState ('')
    
    const login = () => {
        if (username == 'admincabang') {
            localStorage.setItem ('admin', username)
            console.log('admin cabang');
        } else if (username == 'adminranting') {
            localStorage.setItem ('admin', username)
            console.log('admin ranting');
        }
    }

    return (
        <div className='space-x-2 h-screen flex justify-center items-center text-white'>
            <input className='bg-gray p-2 rounded-md' placeholder='Username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            {/* <input className='bg-gray p-2 rounded-md' placeholder='Username' type="text" value={username} /> */}
            <button onClick={() => login()} className='bg-gray p-2 rounded-md' type="submit">Login</button>
        </div>
    )
}

export default loginPage