import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import CreatePost from '../components/createPost';
import { getPosts } from '../api/post';
import PostCard from '../components/postCard';

const Home = () => {
  const token = localStorage.getItem('token');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
    .then((posts) => {
      setPosts(posts);
    })
    .catch((e) => {
      console.log(e);
    })
  }, []);

  return token != null ? (
    <div>
      <CreatePost setPosts={setPosts} posts={posts}/>
      <section>
        {posts.length > 0 ?
          posts.map((post) => {
            return (
              <PostCard key={post.id} postData={post} setPosts={setPosts} posts={posts}/>
            )
          }) : null
        }
      </section>
    </div>
  ) : <Navigate to='/login'/>
}

export default Home;