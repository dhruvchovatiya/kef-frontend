import React from 'react'
import logo from './resources/Kotak_Mahindra_Bank_logo.svg'
import { useState, useEffect } from 'react'
import axios from './axios'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Link, useHistory } from 'react-router-dom'



export default function Nav({ loggedIn, setLoggedIn }) {

  const history = useHistory()


  const [expanded, setExpanded] = useState(false)
  const [user, setUser] = useState()
  const [items, setItems] = useState()
  const [showSearch, setShowSearch] = useState(false)

  const logoutHandler = () => {
    setLoggedIn(false)
    localStorage.removeItem('token')
    setExpanded(false)
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {

        if (!loggedIn) {
          return
        }
        const token = localStorage.getItem('token')
        const res = await axios.get('/api/users/jwt/' + token)
        setUser(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    const fetchTags = async () => {
      try {
        const res = await axios.get('/api/tags')
        let newItems = res.data.tagsArr.map((tag, index) => {
          return {id:index, name:tag}
        })
        setItems(newItems)
      } catch (err) {
        console.log(err)
      }
    }
    fetchUser()
    fetchTags()
    setShowSearch(true)
  }, [])



  const handleOnSelect = (item) => {
    history.push('/tags/'+item.name)
  }


  return (

    <nav className="bg-blue-900 shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto lg:flex lg:justify-between lg:items-center">
        <div className="lg:flex lg:items-center">

          {/* Mobile menu button */}
          <div className="flex justify-between lg:hidden">
            <div className=" border-black border-double">
              <Link to='/' className=""><img src={logo} className="object-contain w-10 h-10 p-0" /></Link>
            </div>
            <button onClick={e => setExpanded(!expanded)} type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              </svg>
            </button>
          </div>

          <div className={'flex justify-center' + (expanded ? ' ' : ' hidden ') + 'lg:flex'}>
            <div className="flex flex-col text-white capitalize dark:text-gray-300 lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
              <div className=" border-black border-double hidden lg:flex">
                <Link to='/' onClick={() => setExpanded(false)} className=""><img src={logo} className="object-contain w-10 h-10 p-0" /></Link>
              </div>

              <Link to="/analytics" onClick={() => setExpanded(false)} className="mt-2 lg:mt-0 lg:mx-4 hover:text-gray-400 dark:hover:text-gray-200 flex justify-center">Analytics</Link>
              <Link to="/analyticsByTags" onClick={() => setExpanded(false)} className="mt-2 lg:mt-0 lg:mx-4 hover:text-gray-400 dark:hover:text-gray-200 flex justify-center">All Tags</Link>
              <Link to="/about" onClick={() => setExpanded(false)} className="mt-2 lg:mt-0 lg:mx-4 hover:text-gray-400 dark:hover:text-gray-200 flex justify-center">About us</Link>


              <div className="relative mt-4 lg:mt-0 lg:mx-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {showSearch && items && <ReactSearchAutocomplete
                  items={items}
                  onSelect={handleOnSelect}
                  autoFocus
                  placeholder="Search by tags"
                />}

                <div className="rounded-md w-full pl-10 pr-4 text-gray-700 placeholder-gray-600 bg-blue-900 border-b border-gray-600 dark:placeholder-gray-300 dark:focus:border-gray-300 lg:w-56 lg:border-transparent dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:border-gray-600" />
              </div>
            </div>
          </div>



        </div>

        <div className={'flex justify-center' + (expanded ? ' ' : ' hidden ') + 'lg:flex'}>
          <div className="flex justify-center mt-6 lg:flex lg:mt-0 lg:-mx-2">

            <div className="flex flex-col text-white capitalize dark:text-gray-300 lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
              {
                !loggedIn &&
                <Link to='/login' onClick={() => setExpanded(false)} className="mt-2 lg:mt-0 lg:mx-4 hover:text-white hover:bg-red-700 dark:hover:text-gray-200 bg-red-600 px-4 py-2 rounded-md flex justify-center">Log In</Link>
              }
              {
                !loggedIn &&
                <Link to='/signup' onClick={() => setExpanded(false)} className="mt-2 lg:mt-0 lg:mx-4 hover:text-white hover:bg-red-700 dark:hover:text-gray-200 bg-red-600 px-4 py-2 rounded-md">Sign Up</Link>
              }
              {
                loggedIn && user &&
                <Link to={'/user/' + user._id} className="mt-2 lg:mt-0 lg:mx-4 hover:text-white  ">{user.firstName} {user.lastName}</Link>
              }
              {
                loggedIn &&
                <Link to='/' onClick={logoutHandler} className="mt-2 lg:mt-0 lg:mx-4 hover:text-white hover:bg-red-700 dark:hover:text-gray-200 bg-red-600 px-4 py-2 rounded-md">Log Out</Link>
              }
            </div>
          </div>
        </div>
      </div>


    </nav>

  )
}