import React from 'react'
import CommentCard from './CommentCard'
import Form from './Form'
import { useEffect, useState } from 'react'
import axios from './axios'


//1. Fetch all posts
//2. display in comment cards



export default function Home(props) {

  const [posts, setPosts] = useState([])
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const fetchData = async () => {

      try {
        
        const result = await axios.get('/api/posts');
        console.log(result)
        setPosts(result.data);
        // console.log(posts)

      } catch(err) {
        console.log(err)
      }

    };

    fetchData();
  }, [submitted]);

  // console.log(posts)


  return (
    <div>
      {console.log(props)}
      {/* {props.loggedIn &&  <Form msg='Question' setLoggedIn={props.setLoggedIn} />}  */}
      {props.loggedIn && <Form msg='Question' setLoggedIn={props.setLoggedIn} setSubmitted={setSubmitted} submitted={submitted}/>} 

      {posts && posts.slice(0).reverse().map((post) => (
        <CommentCard msg='View discussion' post={post}/>
        // <h1>{post._id}</h1>
      ))}

    </div>
  )
}
