import React from 'react'
import axios from './axios'
import './formCSS.css'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const FormData = require('form-data');


export default function Form(props) {

  const history = useHistory()
  const [field, setField] = useState('')
  const [title, setTitle] = useState('')
  const [file, setFile] = useState()
  const [posted, setPosted] = useState(true)
  const [tags, setTags] = useState('')


  useEffect(() => {
    setPosted(true)
  }, [])

  let formData = {}
  let imgurFormData = new FormData()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(posted) {

      setPosted(false)
      if (file) {
        imgurFormData.append('image', file)
        try {
          const res = await axios({
            method: 'post',
            url: 'https://api.imgur.com/3/image',
            headers: {
              Authorization: 'Client-ID '+process.env.REACT_APP_IMGUR_CLIENT_ID
            },
            data: imgurFormData
          })
          formData.img = res.data.data.link
        } catch (err) {
          console.log(err)
        }
      }
  
      formData.token = localStorage.getItem('token')
      formData.desc = field
      formData.title = title
      formData.tags = tags
  
      if ((!title || !title.trim()) && props.msg != 'Solution') {
        alert('Title cannot be empty')
      }
      else if ((!field || !field.trim()) && props.msg === 'Solution') {
        alert('Description cannot be empty')
      }
      else {
        if (props.msg != 'Solution') {
          try {
            const res = await axios.post('/api/posts', formData)
            if (res.status === 502) {
              localStorage.removeItem('token')
              props.setLoggedIn(false)
              history.push('/login')
            }
            if (!res) {
              alert('No response')
            } else {
              setPosted(true)
              props.setSubmitted(!props.submitted)
              setField('')
              setTitle('')
              setTags('')
              history.push('/')
            }
  
          } catch (err) {
            console.log(err)
          }
        } else {
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
              props.setSubmitted(!props.submitted)
              setField('')
              setTitle('')
              history.push('/thread/' + props.id)
            }
  
          } catch (err) {
            console.log(err)
          }
        }
      }
    }
  }

  const handleUpload = (e) => {

    setFile(e.target.files[0])
  }

  return (
    <section className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 my-3">
      <div className="mt-6 ">

        <div className="w-full mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">{'Your ' + props.msg + ':'}</label>
          {props.msg != 'Solution' && <textarea placeholder="Title of your question" className="block w-full mb-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" defaultValue={""} onChange={e => setTitle(e.target.value)} value={title} />}

          {<textarea placeholder={"Describe your " + props.msg} className="block mb-2 w-full h-40 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" defaultValue={""} onChange={e => setField(e.target.value)} value={field} />}
          
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">{'Tags (Eg: maths,geometry,triangles):'}</label>
          {<textarea placeholder={'Add tags seperated by commas. Eg- maths,algebra'} className="block w-full  px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" defaultValue={""} onChange={e => setTags(e.target.value)} value={tags} />}

        </div>
        {posted && <div className="flex justify-center mt-4">
          <input id="fileButton" type="file" hidden onChange={handleUpload} />
          <label for="fileButton" className={posted?"px-4 py-2 mx-2 text-white transition-colors duration-200 transform bg-blue-800 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700 cursor-pointer":"invisible"}>
            Upload Image
          </label>
          <button className={posted?"px-4 py-2 mx-2 text-white transition-colors duration-200 transform bg-blue-800 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 cursor-pointer":"invisible"} type="submit" onClick={handleSubmit}>Post</button>
        </div>}
        {!posted && <div className="flex justify-center mt-4">
          <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-8 w-8 "></div>
        </div>}
      </div>
    </section>
  )
}
