import React from 'react'
import logo from './resources/Kotak_Mahindra_Bank_logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import axios from './axios'

const loginUser = async (credentials) => {
    try {
        let res = axios.post('/api/auth/login', credentials)
        return res
    } catch (err) {
        console.log(err)
    }
}


export default function Login({ setLoggedIn }) {

    const history = useHistory()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [wrongCredentials, setWrongCredentials] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        const tokenFinal = token.data.data
        if (token.data.status == 'error') {
            setWrongCredentials(true)
        } else {
            setLoggedIn(true)
            setWrongCredentials(false)
            localStorage.setItem('token', tokenFinal)
            history.push('/')
        }
    }


    return (
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-24">
            <div className="px-6 py-4">
                <div className="flex justify-center">
                    <img src={logo} className="rounded-full object-contain w-28" />
                </div>
                <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome</h3>
                <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login</p>
                {wrongCredentials && <p className="mt-1 text-center text-red-700 dark:text-gray-400">Incorrect Username or Password</p>}



                <form onSubmit={handleSubmit}>
                    <div className="w-full mt-4">
                        <input required className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="email" placeholder="Email Address" aria-label="Email Address" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="w-full mt-4">
                        <input required className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="password" placeholder="Password" aria-label="Password" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forgot Password?</a>
                        <button className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-900 rounded hover:bg-blue-500 focus:outline-none" type="submit">
                            Login
                        </button>
                    </div>
                </form>



            </div>
            <div className="flex items-center justify-center py-4 text-center bg-gray-100 dark:bg-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>
                <Link to='/signup' className="mx-2 text-sm font-bold text-blue-700 dark:text-blue-400 hover:text-blue-500">Register</Link>
            </div>
        </div>

    )
}
