import React from 'react'
import './Analytics.css'
import axios from './axios'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'



export default function Analytics() {

    const history = useHistory()

    const [newUsers, setNewUsers] = useState([])
    const [sortedField, setSortedField] = useState()
    const [direc, setDirec] = useState(false)


    if (sortedField !== null) {
        if (sortedField == 'comments.length') {
            newUsers.sort((a, b) => {
                if (a.comments.length < b.comments.length) {
                    return direc ? 1 : -1

                }
                if (a.comments.length > b.comments.length) {
                    return direc ? -1 : 1

                }
                return 0;
            });
        }
        if (sortedField == 'posts.length') {
            newUsers.sort((a, b) => {
                if (a.posts.length < b.posts.length) {
                    return direc ? 1 : -1

                }
                if (a.posts.length > b.posts.length) {
                    return direc ? -1 : 1

                }
                return 0;
            });
        }
        newUsers.sort((a, b) => {
            if (a[sortedField] < b[sortedField]) {
                return direc ? 1 : -1
            }
            if (a[sortedField] > b[sortedField]) {
                return direc ? -1 : 1
            }
            return 0;
        });
    }

    useEffect(() => {


        const getVotes = async () => {

            try {
                setNewUsers([])
                // await fetchUsers()
                const res = await axios.get('/api/users')

                // setUsers(res.data)
                console.log(res.data)
                let user
                for (user of res.data) {

                    const votes = await axios.get('/api/users/votes/' + user._id)

                    let newElement = user
                    newElement.votes = votes.data
                    setNewUsers((newUsers) => [...newUsers, newElement])
                }

                // const temp = newUsers.sort()

                // setNewUsers([])
                // setNewUsers(temp)

            } catch (err) {
                console.log(err)
            }

        }

        getVotes()
    }, [])



    return (
        <div>
            {/* component */}
            {/* <style dangerouslySetInnerHTML={{ __html: "\n    body{background:white!important;}\n" }} /> */}
            <p className="text-lg text-center font-bold m-5">Analytics</p>
            <p className="text-sm text-center m-5">(Click on column(s) to sort)</p>
            
            <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-blue-900 text-white shadow-lg">
                <tbody><tr className="border-b-2 border-red-500 text-center ">
                    <th onClick={() => { setSortedField('firstName'); setDirec(!direc) }} className="px-4 py-3 font-semibold  text-center hover:bg-blue-800 cursor-pointer">{sortedField == 'firstName' ? (direc ? 'Name ↑' : 'Name ↓') : 'Name'}</th>
                    <th onClick={() => { setSortedField('posts.length'); setDirec(!direc) }} className="px-4 py-3 font-semibold text-center hover:bg-blue-800 cursor-pointer">{sortedField == 'posts.length' ? (direc ? 'Doubts Asked ↑' : 'Doubts Asked ↓') : 'Doubts Asked'}</th>
                    <th onClick={() => { setSortedField('comments.length'); setDirec(!direc) }} className="px-4 py-3 font-semibold text-center hover:bg-blue-800 cursor-pointer">{sortedField == 'comments.length' ? (direc ? 'Doubts Answered ↑' : 'Doubts Answered ↓') : 'Doubts Answered'}</th>
                    <th onClick={() => { setSortedField('votes'); setDirec(!direc) }} className="px-4 py-3 font-semibold text-center hover:bg-blue-800 cursor-pointer">{sortedField == 'votes' ? (direc ? 'Total Votes ↑' : 'Total Votes ↓') : 'Total Votes'}</th>
                </tr>



                    {/* {users.slice(0).reverse().map(async (user) => (
                        
                        // console.log(await getVotes(user._id))
                        
                        
                        
                        // <h1>{post._id}</h1>
                    ))} */}




                    {newUsers.slice(0).reverse().map((user) => (
                        // <td msg='View discussion' post={post} />
                        // <td className="px-4 py-3 text-center text-black">{user.firstName}</td>

                        <tr className="bg-white border-b border-gray-200">
                            <td onClick={()=>history.push('/user/'+user._id)} className="px-4 py-3 text-center text-black  hover:bg-red-100 cursor-pointer">{user.firstName + ' ' + user.lastName}</td>
                            <td className="px-4 py-3 text-center text-black">{user.posts ? user.posts.length : '0'}</td>
                            <td className="px-4 py-3 text-center text-black">{user.comments ? user.comments.length : '0'}</td>
                            <td className="px-4 py-3 text-center text-black">{user.votes ? user.votes : '0'}</td>
                        </tr>

                    ))}


                </tbody></table>
            {/* classic design */}

            <div className="mb-20" />
            {/* fill for tailwind preview bottom overflow */}
        </div>

    )
}
