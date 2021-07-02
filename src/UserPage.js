import React from 'react'
import { useEffect, useState } from 'react'
import axios from './axios'
import { useParams, useLocation, Router, useHistory } from 'react-router-dom'
import CommentCard from './CommentCard'
import CommentCard2 from './CommentCard2'



function UserPage(props) {


    const { id } = useParams()
    const [user, setUser] = useState()
    const [posts, setPosts] = useState([])
    const [showPosts, setShowPosts] = useState(false)
    const [showAnswers, setShowAnswers] = useState(false)
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('/api/users/' + id)
                const votes = await axios.get('/api/users/votes/' + id)
                let newUser = res.data
                newUser.votes = votes.data
                console.log(newUser)
                setUser(newUser)
            } catch (err) {
                console.log(err)
            }
        }
        setPosts([])
        setAnswers([])
        fetchUser()
    }, [])

    const fetchPosts = async () => {
        try {
            console.log(user)
            setPosts([])
            setAnswers([])
            for (let post of user.posts) {
                console.log('fetchin')
                const res = await axios.get('/api/posts/' + post)
                let newPosts = posts
                newPosts.push(res.data)
                console.log(res)
                setPosts(newPosts)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handlePosts = async () => {
        try {
            setShowAnswers(false)
            await fetchPosts()
            // console.log(posts)
            setShowPosts(true)
        } catch (err) {
            console.log(err)
        }
    }

    const handleAnswers = async () => {
        try {
            setShowPosts(false)
            await fetchComments()
            setShowAnswers(true)
        } catch (err) {
            console.log(err)
        }
    }
    
    const fetchComments = async () => {
        try {
            setAnswers([])
            setPosts([])
            for(let comment of user.comments) {
                // console.log(comment.postId)
                const pst = await axios.get('/api/posts/'+comment.postId)
                let newAnswers = answers
                let tempComment=pst.data.comments[comment.arrayIn]
                tempComment.postId=comment.postId
                newAnswers.push(tempComment)
                setAnswers(newAnswers)
            } 
        } catch (err) {
            console.log(err)
        }
    }

    return (

        <div>

                {/* </section> */}


            <div className="flex justify-center my-4">
                {/* <section className="m-2  leading-normal flex"> */}
                {/* card container */}
                <div className="max-w-lg shadow-lg rounded overflow-hidden m-4 sm:flex ">
                    {/* card-content */}
                    {user && <div className="px-6 py-4 flex-col align-middle">
                        <h2 className=" font-semibold text-3xl text-center">{user.firstName} {user.lastName}</h2>
                        <h2 className="mb-8 font-semibold text-center text-sm text-gray-600">{user.email}</h2>

                        <p className="mb-1  text-center">
                            {'Doubts Asked: ' + user.posts.length}
                        </p>
                        <p className="mb-1  text-center">
                            {'Doubts Answered: ' + user.comments.length}
                        </p>
                        <p className="mb-4  text-center">
                            {'Total Votes: ' + user.votes}
                        </p>
                        <div className="flex justify-between">
                            {/* button */}
                            <button onClick={handlePosts} className="mx-3 py-3 px-6 bg-blue-900  text-white  rounded-md mt-1 mb-2 hover:bg-blue-800">
                                All Doubts
                            </button>
                            <button onClick={handleAnswers} className="mx-3 py-3 px-6 bg-blue-900  text-white  rounded-md mt-1 mb-2 hover:bg-blue-800">
                                All Answers
                            </button>
                        </div>

                    </div>}
                </div>

            </div>

            {showPosts && posts.length != 0 && posts.map((post) => (
                <CommentCard msg='View discussion' post={post} />
                // <h1>{post._id}</h1>
            ))}
            {showAnswers && answers.length != 0 && answers.map((answer) => (
                <CommentCard2 msg='' post={answer} postId={answer.postId} loggedIn={localStorage.getItem('token')?true:false} />
                // <h1>{post._id}</h1>
            ))}
            

        </div>
    )
}

export default UserPage
