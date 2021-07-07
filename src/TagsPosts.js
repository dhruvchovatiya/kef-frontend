import React from 'react'
import axios from './axios'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CommentCard from './CommentCard'


function TagsPosts() {

    const location = useLocation()
    let tag = location.pathname.split('/')
    tag = tag[tag.length - 1]

    const [posts, setPosts] = useState()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('/api/posts/tags/' + tag)
                setPosts(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchPosts()
    }, [])

    return (
        <div>
            <div className="flex justify-center my-4">

                <div className="px-6 py-4 flex-col align-middle">
                    <h1 className="mt-2 p-1 text-white rounded-md dark:text-gray-300 bg-red-600 text-2xl cursor-default">{tag}</h1>
                </div>

            </div>

            {posts && posts.length != 0 && posts.map((post, index) => (
                <CommentCard msg='View discussion' post={post} />
            ))}
        </div>
    )
}

export default TagsPosts
