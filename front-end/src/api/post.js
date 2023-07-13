import axios from 'axios';
import env from 'react-dotenv'

export const createPost = async (data, token) => {
   return await axios({
      method: 'post',
      url: `${env.API_URL}/post/create`,
      data: data,
      headers: {
        'Authorization': `Bearer ${token}`
      }
   })
   .then((res) => {
      return res.data.post
   })
   .catch((e) => {
      console.log(e);
   })
}

export const getPosts = async () => {
    return await axios({
       method: 'get',
       url: `${env.API_URL}/post/get-all`
    })
    .then((res) => {
       return res.data.posts
    })
    .catch((e) => {
       console.log(e);
    })
}

export const deletePost = async (postId) => {
   return await axios({
      method: 'delete',
      url: `${env.API_URL}/post/${postId}`
   })
   .then((res) => {
      console.log(res);
   })
   .catch((e) => {
      console.log(e);
   })
}

export const updatePost = async (data, postId) => {
   return await axios({
      method: 'put',
      url: `${env.API_URL}/post/${postId}`,
      data: data
   })
   .then((res) => {
      return res.data.post;
   })
   .catch((e) => {
      console.log(e);
   })
}