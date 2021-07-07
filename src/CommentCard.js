import React from 'react'
import { Link } from 'react-router-dom'

export default function CommentCard(props) {


    if (props.isThread) {

        const postId = props.postId
        const comment = props.post


    }

    const date = props.post.createdAt.split('T')[0].split('-')

    return (
        <div className="max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 my-3">
            <div className="flex items-center justify-between">
            </div>
            <div className="flex justify-between">

                <div className="mt-2 ">

                    {!props.isThread && <p className="text-2xl font-bold text-gray-700 dark:text-white ">{props.post.title}</p>}
                    <div className="flex">
                        {props.post.tags.map((tag, index) => (

                            <Link to={'/tags/' + tag} className="mt-2 mr-2 px-1 text-white rounded-md dark:text-gray-300 bg-red-600 text-sm cursor-pointer hover:bg-red-700">{tag}</Link>
                        ))}
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{props.post.desc}</p>
                </div>
                <h1 className=" text-sm ">{date[2] + '-' + date[1] + '-' + date[0]}</h1>
            </div>
            <div className="flex items-center justify-between mt-4">
                <Link to={'/thread/' + props.post._id} className="text-blue-600 dark:text-blue-400 hover:underline">{props.msg}</Link>
                <div className="flex items-center">
                    <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">{'By- ' + props.post.firstName + ' ' + props.post.lastName}</a>
                </div>
            </div>
        </div>
    )
}
