import React from 'react'
import axios from './axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './formCSS.css'



function AnalyticsByTags() {

    const history = useHistory()

    const [tags, setTags] = useState()
    const [sortedTags, setSortedTags] = useState()
    const [fetched, setFetched] = useState(false)



    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await axios.get('/api/tags/cnt')
                setTags(res.data)

            } catch (err) {
                console.log(err)
            }
        }

        fetchTags()
    }, [])

    useEffect(() => {
        if (tags) {

            tags.sort((a, b) => {
                if (a.cnt < b.cnt) {
                    return 1

                }
                else {
                    return -1

                }
            });
            setSortedTags(tags)
            setFetched(true)
        }
    }, [tags])

    return (
        <div>

            <p className="text-lg text-center font-bold m-5">All Tags</p>
            <p className="text-sm text-center m-5">(Click on tag for all questions of that topic)</p>

            {!fetched && <div className="flex justify-center mt-4">
                <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-8 w-8 "></div>
            </div>}

            {fetched && <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-blue-900 text-white shadow-lg table-fixed">
                <tbody><tr className="border-b-2 border-red-500 text-center ">
                    <th className="px-4 py-3 font-semibold  text-center hover:bg-blue-800 cursor-pointer">{'Tag'}</th>
                    <th className="px-4 py-3 font-semibold text-center hover:bg-blue-800 cursor-pointer">{'Number of questions'}</th>
                </tr>








                    {sortedTags && sortedTags.map((tag, index) => (


                        <tr className="bg-white border-b border-gray-200">
                            <td onClick={() => history.push('/tags/' + tag.tag)} className="px-4 py-3 text-center text-black font-semibold hover:bg-red-100 cursor-pointer">{tag.tag}</td>
                            <td className="px-4 py-3 text-center text-black">{tag.cnt}</td>
                        </tr>

                    ))}


                </tbody></table>}

            <div className="mb-20" />
        </div>
    )
}

export default AnalyticsByTags
