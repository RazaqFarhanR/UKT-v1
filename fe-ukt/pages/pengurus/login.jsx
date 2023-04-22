import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const loginPage = () => {

    // state router
    const router = useRouter()

    // state
    const [username, setUsername] = useState ('')
    const [password, setPassword] = useState ('')
    
    const login = async (e) => {
        e.preventDefault()

        let form = {
            username : username,
            password : password,
        }
        await axios.post(BASE_URL + `pengurus/auth`, form)
        .then (res => {
            if (res.data.logged) {
              let data = res.data.data
              let token = res.data.token
      
              localStorage.setItem ('pengurus', JSON.stringify (data))
              localStorage.setItem ('token', (token))
              
              console.log(res.data.message);
              router.push ('/pengurus')
            } else {
              window.alert (res.data.message)
            }
        })
        .catch (err => {
            console.log(err.message);
        })

    }

    return (
        <div className='space-x-2 h-screen flex justify-center items-center text-white'>
            <form action="POST" onSubmit={login}>
                <input className='bg-gray p-2 rounded-md' placeholder='Username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className='bg-gray p-2 rounded-md' placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit' className='bg-gray p-2 rounded-md'>Login</button>
            </form>
        </div>
    )
}

export default loginPage