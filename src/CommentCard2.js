import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from './axios'


const getUser = async (token) => {
    try {
        const user = await axios.get('/api/auth/userFromJWT/' + token)
        return user

    } catch (err) {
        console.log(err)
    }
}

export default function CommentCard(props) {

    const postId = props.postId
    const comment = props.post
    const loggedIn = props.loggedIn

    const [votes, setVotes] = useState(comment.votes)
    const [voted, setVoted] = useState(false)
    const [vote, setVote] = useState(0)
    const [showImg, setShowImg] = useState(false)
    const [showString, setShowString] = useState('Show Image')


    let user
    useEffect(() => {

        const handleReload = async () => {

            if (loggedIn) {
                user = await getUser(localStorage.getItem('token'))
                if (user.data.voted.length != 0) {
                    let obj
                    for (obj of user.data.voted) {
                        if (comment._id == obj.commentId) {
                            if (obj.vote != 0) setVoted(true)
                            setVote(obj.vote)
                        }
                    }
                }

            }
        }

        handleReload()

    }, [vote, voted, votes])

    const handleUp = async e => {
        if (voted && vote == 1) {
            console.log('already voted!')
        } else {

            try {
                const res = await axios.post('/api/posts/voteComment/' + postId + '/' + comment._id, { token: localStorage.getItem('token'), up: 'true' })
                setVoted(true)
                if (vote == -1) setVote(0)
                if (vote == 0) setVote(1)
                setVotes(votes + 1)
            } catch (err) {
                console.log(err)
            }
        }
    }
    const handleDown = async e => {
        if (voted && vote == -1) {
            console.log('already voted!')
        } else {

            try {
                const res = await axios.post('/api/posts/voteComment/' + postId + '/' + comment._id, { token: localStorage.getItem('token') })
                setVoted(true)
                if (vote == 0) setVote(-1)
                if (vote == 1) setVote(0)
                setVotes(votes - 1)
            } catch (err) {
                console.log(err)
            }
        }
    }

    const handleShowHide = (e) => {
        setShowImg(!showImg)
        setShowString(showImg ? 'Show Image' : 'Hide Image')
    }



    return (
        <div className="max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 my-3">
            <div className="flex items-center justify-between">

            </div>
            <div className="flex justify-between">
                <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">{'By- ' + props.post.firstName} {props.post.lastName}</a>

                <h1 className="text-sm ">{comment.date}</h1>
            </div>

            <div className="mt-2">
                <p className="mt-2 text-gray-600 dark:text-gray-300">{props.post.desc}</p>
            </div>
            <br />
            {comment.img && <h1 className="text-blue-900 hover:underline cursor-pointer" onClick={handleShowHide}>{showString}</h1>}
            <div className="flex items-center justify-between mt-4">
                <Link to={'/thread/' + props.post._id} className="text-blue-600 dark:text-blue-400 hover:underline">{props.msg}</Link>


                <div className="flex-col">
                    <div className='flex align-middle'>
                        {loggedIn && <svg xmlns="http://www.w3.org/2000/svg" className={voted && vote == 1 ? "cursor-default text-red-600 h-8 w-8" : "cursor-pointer h-8 w-8" + " h-8 w-8"} viewBox="0 0 20 20" fill="currentColor" onClick={handleUp}>
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                        </svg>}

                        {!loggedIn && <h1 className='px-2 inline font-semibold'>{votes.toString() + " Votes"}</h1>}
                        {loggedIn && <h1 className='px-2 inline font-semibold'>{votes}</h1>}


                        {loggedIn && <svg xmlns="http://www.w3.org/2000/svg" className={voted && vote == -1 ? "cursor-default text-red-600 h-8 w-8" : "cursor-pointer h-8 w-8" + " h-8 w-8"} viewBox="0 0 20 20" fill="currentColor" onClick={handleDown}>
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                        </svg>}

                    </div>
                    <br />
                </div>
            </div>

            {showImg && <img className="object-contain w-100 h-100 mt-2 rounded-md" src={comment.img} alt="Question Image" />}
        </div>
    )
}
