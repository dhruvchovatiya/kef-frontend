import React from 'react'
import logo from './resources/Kotak_Mahindra_Bank_logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import axios from './axios'

    
const registerUser = async (credentials) => {

    try{
        let res = await axios.post('/api/auth/register', credentials)
        return res
    } catch(err) {
        console.log(err)
    }
}
    
    
    export default function SignUp() {
        
    
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [confPassword, setConfPassword] = useState('')
        
        const history = useHistory()
        
        const handleSubmit = async e => {
            e.preventDefault();
            if (password !== confPassword) alert("Passwords do not match. Please retry.");
            else{
                try {
                    const token = await registerUser({
                        firstName,
                        lastName,
                        email,
                        password
                    });
                    
                    if(!token) {
                        alert('Email already taken. Try again.')
                    }
                    else{
                        history.push('/login')
                    }


                } catch(err) {
                    alert('Error!')
                }
                
            }
        }
        
        
        
    return (
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-24">
            <div className="px-6 py-4">
                <div className="flex justify-center">
                    <img src={logo} className="rounded-full object-contain w-28" />
                </div>
                <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome</h3>
                <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Create New Account</p>



                <form onSubmit={handleSubmit}>
                    <div className="flex justify-evenly">
                        <div className="w-full mt-4 mr-1">
                            <input required onChange={e => setFirstName(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring capitalize" type="text" placeholder="First Name" aria-label="Email Address" />
                        </div>
                        <div className="w-full mt-4 ml-1">
                            <input required onChange={e => setLastName(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring capitalize" type="text" placeholder="Last Name" aria-label="Email Address" />
                        </div>
                    </div>
                    <div className="w-full mt-4">
                        <input required onChange={e => setEmail(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="email" placeholder="Email Address" aria-label="Email Address" />
                    </div>
                    <div className="w-full mt-4">
                        <input required onChange={e => setPassword(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="password" placeholder="Password" aria-label="Password" />
                    </div>
                    <div className="w-full mt-4">
                        <input required onChange={e => setConfPassword(e.target.value)} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="password" placeholder="Confirm Password" aria-label="Confirm Password" />
                    </div>

                    <div className="text-red-700 flex justify-center mt-3">
                        {password!==confPassword && confPassword.length!=0 && <h1>Passwords do not match</h1>} 
                    </div>


                    <div className="flex items-center justify-center mt-4">
                        <button className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-900 rounded hover:bg-blue-500 focus:outline-none" type="submit">
                            Register
                        </button>
                    </div>
                </form>



            </div>
            <div className="flex items-center justify-center py-4 text-center bg-gray-100 dark:bg-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-200">Already have an account? </span>
                <Link to='/login' className="mx-2 text-sm font-bold text-blue-700 dark:text-blue-400 hover:text-blue-500">Sign In</Link>
            </div>
        </div>

    )
}
