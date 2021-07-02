import React from 'react'
import axios from './axios'
import './formCSS.css'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
const FormData = require('form-data');




export default function Form2(props) {

  const history = useHistory()
  const [field, setField] = useState('')
  const [title, setTitle] = useState('')
  const [file, setFile] = useState()
  const [posted, setPosted] = useState(true)
  // const formData = {
  //   token: localStorage.getItem('token'),
  //   desc: field,
  //   title: title,
  // }

  useEffect(() => {
    setPosted(true)
    setFile()
    setField('')
  }, [])

  let formData = {}
  let imgurFormData = new FormData()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (posted) {

      setPosted(false)
      console.log(file)
      if (file) {
        // console.log('here')
        imgurFormData.append('image', file)
        try {
          const res = await axios({
            method: 'post',
            url: 'https://cors-anywhere.herokuapp.com/https://api.imgur.com/3/upload',
            headers: {
              Authorization: 'Client-ID '+process.env.REACT_APP_IMGUR_CLIENT_ID
            },
            data: imgurFormData
          })
          formData.img = res.data.data.link
          console.log(res)
        } catch (err) {
          console.log(err)
        }
      }

      formData.token = localStorage.getItem('token')
      formData.desc = field

      console.log(formData)
      if ((!field || !field.trim()) && props.msg === 'Solution') {
        alert('Description cannot be empty')
      }
      else {
        
          // console.log('hhh')
          try {
            const res = await axios.post('/api/posts/' + props.id, formData)
            if (res.status === 502) {
              localStorage.removeItem('token')
              props.setLoggedIn(false)
              history.push('/login')
            }
            if (!res) {
              alert('No response')
            } else {
              setPosted(true)
              // title.value=''
              console.log(res)
              props.setSubmitted(!props.submitted)
              setField('')
              setTitle('')
              setFile()
              history.push('/thread/' + props.id)

            }

          } catch (err) {
            console.log(err)
          }
        
      }
    }
    else { console.log('wait!') }
  }

  // console.log(file)
  const handleUpload = (e) => {

    setFile(e.target.files[0])
    // console.log(file)
  }

  return (
    <section className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 my-3">

      <div className="mt-6 ">

        <div className="w-full mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">{'Your ' + props.msg + ':'}</label>
          {props.msg != 'Solution' && <textarea placeholder="Title of your question" className="block w-full mb-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" defaultValue={""} onChange={e => setTitle(e.target.value)} value={title} />}

          {<textarea placeholder={"Describe your " + props.msg} className="block w-full h-40 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" defaultValue={""} onChange={e => setField(e.target.value)} value={field} />}
        </div>
        {/* {isEmpty && <h1 className="text-red-700 flex justify-center mt-4">Title can't be Empty</h1>} */}
        {posted && <div className="flex justify-center mt-4">
          <input id="fileButton" type="file" hidden onChange={handleUpload} />
          <label for="fileButton" className={posted ? "px-4 py-2 mx-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 cursor-pointer" : "invisible"}>
            Upload Image
          </label>
          {/* <button className="px-4 py-2 mx-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" onChange={handleUpload}>Upload Image</button> */}
          <button className={posted ? "px-4 py-2 mx-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 cursor-pointer" : "invisible"} type="submit" onClick={handleSubmit}>Post</button>
        </div>}
        {!posted && <div className="flex justify-center mt-4">
          <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-8 w-8 "></div>
        </div>}
      </div>
    </section>
  )
}
