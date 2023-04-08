import React, { useState } from 'react'
import axios from 'axios'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const loginPage = () => {

    const [username, setUsername] = useState ('')
    const [password, setPassword] = useState ('')
    
    const login = (e) => {
        e.preventDefault()

        let form = {
            username : username,
            password : password,
        }

        axios.post (BASE_URL + ``)
    }

    return (
        <div className='space-x-2 h-screen flex justify-center items-center text-white'>
            <input className='bg-gray p-2 rounded-md' placeholder='Username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className='bg-gray p-2 rounded-md' placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => login()} className='bg-gray p-2 rounded-md' type="submit">Login</button>
        </div>
    )
}

export default loginPage