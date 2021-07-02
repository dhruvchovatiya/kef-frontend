import React from 'react'
import CommentCard from './CommentCard'
import CommentCard2 from './CommentCard2'

import Form2 from './Form2'
import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from './axios'

export default function Thread(props) {
    const {id} = useParams()

    const [post,setPost] = useState({})
    const [comments, setComments] = useState([])
    const [submitted, setSubmitted] = useState(false)
    


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(('/api/posts/'+id))
                // console.log(res)
                setPost(res.data)
                setComments(post.comments)
                // console.log(comments)
            } catch(err) {
                console.log(err)
            }
        }

        fetchPost()
    }, [submitted])

    console.log(props.loggedIn)

    return (
        <div>
            <div className="max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 my-3">
                {post.img && <img className="object-contain w-100 h-100" src={post.img} alt="Question Image" />}
                <div className="p-6">
                    <div>
                        {
                            post.tags && post.tags.map((tag) => (
                                <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400 mr-2">{tag}</span>
                            ))
                        }
                        <p href="#" className="block mt-2 text-2xl font-semibold text-gray-800 dark:text-white ">{post.title}</p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{post.desc}</p>
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                {/* <img className="object-cover h-10 rounded-full" src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60" alt="Avatar" /> */}
                                <a href="#" className=" font-semibold text-gray-700 dark:text-gray-200">{post.firstName} {post.lastName}</a>
                            </div>
                            {/* <span className="mx-1 text-s text-gray-600 dark:text-gray-300">21 SEP 2023</span> */}
                            
                            <h1 className="text-sm">21-2-2021</h1>
                        </div>
                    </div>
                </div>
            </div>

            {props.loggedIn && <Form2 msg='Solution' id={id} setSubmitted={setSubmitted} submitted={submitted}/>}
            
            {post.comments && post.comments.slice(0).reverse().map((comment) => (
               
                <CommentCard2 msg='' post={comment} isThread={true} postId={id} loggedIn={props.loggedIn}/>
            ))}

            {!props.loggedIn && <div><br/><h1 className="text-center">Kindly login to add a solution.</h1><br/><br/></div>}
            



        </div>
    )
}
